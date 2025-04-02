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
import { useState, useEffect } from "react";
import { SlTrash } from "react-icons/sl";
import { useParams, useNavigate } from 'react-router-dom';
import { IUser } from "./types";
import { tabs, items } from "./config";
import TableRow from "./TableRow";

const columnHeaders = ['Name', 'Email', 'Status', 'Action']

const Users = () => {
  const [selection, setSelection] = useState<number[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUser>({id: 0, status: '', first_name: '', last_name: '', email: ''})
  const [showBulkDeletePopup, setShowBulkDeletePopup] = useState<boolean>(false);
  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
  const [showEditPopup, setShowEditPopup] = useState<boolean>(false);
  const [showRestorePopup, setShowRestorePopup] = useState<boolean>(false);

  const [users, setUsers] = useState<IUser[]>([])

  const navigate = useNavigate()
  let { status } = useParams();
  const [activeTab, setActiveTab] = useState<string>('')

  const hasSelection = selection.length > 0;
  const indeterminate = hasSelection && selection.length < users.length;

  useEffect(() => {
    status = status || 'all'
    setActiveTab(status || 'all')
  }, []);

  useEffect(() => {
    if (activeTab !== 'all') {
      setUsers(items.filter(i => i.status === activeTab))
    } else {
      setUsers(items)
    }
  }, [activeTab])

  function bulkDelete () {
    setUsers(users.map(u => {
      if (selection.includes(u.id)) {
        u.status = 'deleted'
      }
      return u
    }))
    setSelection([])
  }

  function deleteUser() {
    setUsers(users.map(u => {
      if (selectedUser?.id == u.id) {
        u.status = 'deleted'
      }
      return u
    }))
    setShowDeletePopup(false)
  }

  function editUser() {
    setUsers(users.map(u => {
      if (selectedUser?.id == u.id) {
        u.first_name = selectedUser.first_name
        u.last_name = selectedUser.last_name
      }
      return u
    }))
    setShowEditPopup(false)
  }

  function changeTab(newTab: string) {
    navigate(`/admin/users/${newTab}`)
    setSelection([])
    setActiveTab(newTab)
  }

  function restoreUser () {
    setUsers(users.map(u => {
      if (selectedUser?.id == u.id) {
        u.status = 'approved'
      }
      return u
    }))
    setShowRestorePopup(false)
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
        <Table.Body>{
           users.map((item) =>(
            <TableRow item={item} selection={selection} activeTab={activeTab} 
            setSelection={setSelection} setSelectedUser={setSelectedUser} setShowEditPopup={setShowEditPopup} setShowDeletePopup={setShowDeletePopup} setShowRestorePopup={setShowRestorePopup}/>
          ))
          }</Table.Body>
      </Table.Root>
      <ActionBar.Root open={hasSelection}>
        <Portal>
          <ActionBar.Positioner>
            <ActionBar.Content>
              <ActionBar.SelectionTrigger>
                {selection.length} selected
              </ActionBar.SelectionTrigger>
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
        title={"Delete users"}
        content={<Text>Are you sure want to delete all the selected user(s)?</Text>}
        confirm={<Button onClick={() => bulkDelete()}>Delete</Button>}
        open={showBulkDeletePopup}
        setOpen={setShowBulkDeletePopup}
      ></Popup>

      <Popup
        title={"Delete user"}
        content={<Text>Are you sure want to delete this user?</Text>}
        confirm={<Button onClick={() => deleteUser()}>Delete</Button>}
        open={showDeletePopup}
        setOpen={setShowDeletePopup}
      ></Popup>

      <Popup
        title={"Restore user"}
        content={<Text>Are you sure want to restore this user?</Text>}
        confirm={<Button onClick={() => restoreUser()}>Delete</Button>}
        open={showRestorePopup}
        setOpen={setShowRestorePopup}
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
                <Input placeholder="John" value={selectedUser?.first_name} onChange={e => setSelectedUser({...selectedUser, first_name: e.target.value})}/>
                <Field.ErrorText>First name is required</Field.ErrorText>
              </Field.Root>

              <Field.Root required>
                <Field.Label>
                  Last name
                  <Field.RequiredIndicator />
                </Field.Label>
                <Input placeholder="Due" value={selectedUser?.last_name} onChange={e => setSelectedUser({...selectedUser, last_name: e.target.value})}/>
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
