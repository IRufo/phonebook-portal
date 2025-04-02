"use client";
import Menu from "../../components/ui/menu";
import Popup from "../../components/ui/popup";
import {
  ActionBar,
  Button,
  Checkbox,
  Portal,
  Table,
  Text,
  Box,
  Fieldset,
  Field,
  Input,
} from "@chakra-ui/react";
import { useState, useEffect, useMemo } from "react";
import { SlBell, SlPlus, SlTrash, SlVolume1 } from "react-icons/sl";
import { useParams, useNavigate } from 'react-router-dom';
import { IUser } from "./types";
import { tabs } from "./config";
import TableRow from "./TableRow";
import { deleteUser, getUsers, getUsersByStatus, updateUser, activateUser } from "../../services/userService";

const columnHeaders = ['Name', 'Email', 'Status', 'Action']

const Users = () => {
  const [selection, setSelection] = useState<string[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUser>({id: '', status: '', first_name: '', last_name: '', email: ''})
  const [showBulkDeletePopup, setShowBulkDeletePopup] = useState<boolean>(false);
  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
  const [showEditPopup, setShowEditPopup] = useState<boolean>(false);
  const [showApprovePopup, setShowApprovePopup] = useState<boolean>(false);
  const [showRestorePopup, setShowRestorePopup] = useState<boolean>(false);
  const [showBulkApprovePopup, setShowBulkApprovePopup] = useState<boolean>(false);
  console.log('selectedUser', selection)

  const [users, setUsers] = useState<IUser[]>([])

  const navigate = useNavigate()
  let { status = 'all' } = useParams();
  const [activeTab, setActiveTab] = useState<string>(status)

  const hasSelection = useMemo(() => selection.length > 0, [selection.length] );
  const indeterminate = useMemo(() => hasSelection && selection.length < users.length, [hasSelection, selection.length, users.length] ) ;


  const fetchUsers = async (_status?: string) => {
    const statusMap: Record<string, string> = {
      approved: 'Active',
      pending: 'Pending',
      deleted: 'Deleted',
    };
    let response;
    if (_status && _status !== 'all') {
      const status = statusMap[_status]
      response = await getUsersByStatus(status);
    } else {
      response = await getUsers();
    }
    console.log('response', response);
    if (response.success) {
      setUsers(response.data);
    }
  };


  useEffect(() => {
    fetchUsers()
  }, []);

  useEffect(() => {
    console.log('activeTab',activeTab)
    if(activeTab === 'all'){
      fetchUsers()
      return
    }
    fetchUsers(activeTab)
  }, [activeTab])

  const bulkDelete = async() => {
    console.log('data',selectedUser)
    await Promise.all(
      selection.map((id) => deleteUser(id))
    )
    setSelection([])
    fetchUsers(activeTab)
    setShowBulkDeletePopup(false)
  }

  const removeUser = async() => {
    await deleteUser(selectedUser.id)
    fetchUsers(activeTab)
    setShowDeletePopup(false)
  }

  const editUser = async() => {
    const {id, first_name, last_name} = selectedUser
    await updateUser({
      id, first_name, last_name
    })
    fetchUsers(activeTab)
    setShowEditPopup(false)
  }

  const approveUser = async() => {
    const {id} = selectedUser
    await activateUser(id)
    fetchUsers(activeTab)
    setShowApprovePopup(false)
  }
  
  const changeTab = (newTab: string) => {
    navigate(`/admin/users/${newTab}`)
    setSelection([])
    setActiveTab(newTab)
  }

  const restoreUser  = async () => {
    const {id} = selectedUser
    await activateUser(id)
    fetchUsers(activeTab)

    setShowRestorePopup(false)
  }

  const bulkApprove = async() => {
    console.log('data',selectedUser)
    await Promise.all(
      selection.map((id) => activateUser(id))
    )
    setSelection([])
    setShowBulkApprovePopup(false)
  }

  return (
    <Box background="#fff" width="100%" height="100%" padding="5px" pr="15px">
      <Menu tabs={tabs} value={activeTab} setValue={changeTab}/>
      <Table.Root mt={5}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader w="6">
              {activeTab !== 'deleted' ? <Checkbox.Root
                size="sm"
                top="0.5"
                aria-label="Select all rows"
                checked={indeterminate ? "indeterminate" : selection.length > 0}
                onCheckedChange={(changes) => {
                  setSelection(
                    changes.checked ? users.filter(i => i.status !== 'deleted').map((item) => item.id) : []
                  );
                }}
              >
                <Checkbox.HiddenInput />
                <Checkbox.Control />
              </Checkbox.Root>: ''}
            </Table.ColumnHeader>
            {
              columnHeaders.map((item) => <Table.ColumnHeader>{item}</Table.ColumnHeader>)
            }
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
           users.map((item) =>(
            <TableRow key={item.id} item={item} selection={selection} activeTab={activeTab} 
            setSelection={setSelection} setSelectedUser={setSelectedUser} setShowEditPopup={setShowEditPopup} setShowDeletePopup={setShowDeletePopup} setShowRestorePopup={setShowRestorePopup} setShowApprovePopup={setShowApprovePopup}/>
          ))
          }
          </Table.Body>
      </Table.Root>
      <ActionBar.Root open={hasSelection}>
        <Portal>
          <ActionBar.Positioner>
            <ActionBar.Content>
              <ActionBar.SelectionTrigger>
                {selection.length} selected
              </ActionBar.SelectionTrigger>
              <ActionBar.Separator />
              {activeTab == 'pending' && <Button
                variant="outline"
                size="sm"
                onClick={() => setShowBulkApprovePopup(true)}
              >
                Approve
                <SlPlus/>
              </Button>}
              <ActionBar.Separator />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowBulkDeletePopup(true)}
              >
                Delete
                <SlTrash />
              </Button>
            </ActionBar.Content>
          </ActionBar.Positioner>
        </Portal>
      </ActionBar.Root>

      <Popup
        title={"Approve users"}
        content={<Text>Are you sure want to approve all the selected user(s)?</Text>}
        confirm={<Button onClick={() => bulkApprove()}>Approve</Button>}
        open={showBulkApprovePopup}
        setOpen={setShowBulkApprovePopup}
      ></Popup>

      <Popup
        title={"Delete users"}
        content={<Text>Are you sure want to delete all the selected user(s)?</Text>}
        confirm={<Button onClick={() => bulkDelete()}>Delete</Button>}
        open={showBulkDeletePopup}
        setOpen={setShowBulkDeletePopup}
      ></Popup>

      <Popup
        title={"Delete user"}
        content={<Text>Are you sure want to delete this user?</Text>}
        confirm={<Button onClick={() => removeUser()}>Delete</Button>}
        open={showDeletePopup}
        setOpen={setShowDeletePopup}
      ></Popup>

      <Popup
        title={"Restore user"}
        content={<Text>Are you sure want to restore this user?</Text>}
        confirm={<Button onClick={() => restoreUser()}>Restore</Button>}
        open={showRestorePopup}
        setOpen={setShowRestorePopup}
      ></Popup>

      <Popup
        title={"Approve user"}
        content={<Text>Are you sure want to approve this user?</Text>}
        confirm={<Button onClick={() => approveUser()}>Approve</Button>}
        open={showApprovePopup}
        setOpen={setShowApprovePopup}
      ></Popup>

      <Popup
        title={"Edit user"}
        content={
          <Fieldset.Root>
            <Fieldset.Content>
              <Field.Root required>
                <Field.Label>
                  First name
                  <Field.RequiredIndicator />
                </Field.Label>
                <Input placeholder="John" value={selectedUser?.first_name} onChange={e => setSelectedUser((prev) => ({...prev, first_name: e.target.value}))}/>
                <Field.ErrorText>First name is required</Field.ErrorText>
              </Field.Root>

              <Field.Root required>
                <Field.Label>
                  Last name
                  <Field.RequiredIndicator />
                </Field.Label>
                <Input placeholder="Due" value={selectedUser?.last_name} onChange={e => setSelectedUser((prev) => ({...prev, last_name: e.target.value}))}/>
                <Field.ErrorText>Last name is required</Field.ErrorText>
              </Field.Root>
            </Fieldset.Content>
          </Fieldset.Root>
        }
        confirm={<Button onClick={() => editUser()}>Edit</Button>}
        open={showEditPopup}
        setOpen={setShowEditPopup}
      ></Popup>
    </Box>
  );
};

export default Users;
