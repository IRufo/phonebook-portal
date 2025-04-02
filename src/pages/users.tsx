"use client";
import Menu from "../components/ui/menu";
import Pager from "../components/ui/pagination";
import Popup from "../components/ui/popup";
import {
  ActionBar,
  Button,
  Checkbox,
  Portal,
  Table,
  IconButton,
  Flex,
  Center,
  Link,
  Badge,
  Icon,
  Text,
  Box,
  Fieldset,
  Field,
  Input,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { SlPencil, SlTrash, SlCheck, SlPlus, SlClose, SlReload } from "react-icons/sl";
import { useParams, useNavigate } from 'react-router-dom';
import {
  SlUserFollowing,
  SlUser,
  SlUserFollow,
  SlUserUnfollow,
} from "react-icons/sl";

const tabs = [
  {
    key: 'all',
    text: 'All users',
    icon: SlUser,
  }, 
  {
    key: 'approved',
    text: 'Approved',
    icon: SlUserFollowing
  },
  {
    key: 'pending',
    text: 'Pending approval',
    icon: SlUserFollow
  },
  {
    key: 'deleted',
    text: 'Deleted',
    icon: SlUserUnfollow
  }
]

const statusColors = { pending: "orange", approved: "green", deleted: "red" };
const statusIcon = { pending: SlPlus, approved: SlCheck, deleted: SlClose };

type User = {
  id: number,
  first_name: string,
  last_name: string,
  email: string,
  status: string
}

const items: User[] = [
  {
    id: 1,
    status: "approved",
    first_name: "Laptop",
    last_name: "Laptop",
    email: "Electronics",
  },
  {
    id: 2,
    status: "deleted",
    first_name: "Coffee Maker",
    last_name: "Coffee Maker",
    email: "Home Appliances",
  },
  {
    id: 3,
    status: "approved",
    first_name: "Desk Chair",
    last_name: "Desk Chair",
    email: "Furniture",
  },
  {
    id: 4,
    status: "pending",
    first_name: "Smartphone",
    last_name: "Smartphone",
    email: "Electronics",
  },
  {
    id: 5,
    status: "approved",
    first_name: "Headphones",
    last_name: "Headphones",
    email: "Accessories",
  },
];


const Users = () => {
  const [selection, setSelection] = useState<number[]>([]);
  const [selectedUser, setSelectedUser] = useState<User>({id: 0, status: '', first_name: '', last_name: '', email: ''})

  const [showBulkDeletePopup, setShowBulkDeletePopup] = useState<boolean>(false);
  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
  const [showEditPopup, setShowEditPopup] = useState<boolean>(false);
  const [showRestorePopup, setShowRestorePopup] = useState<boolean>(false);

  const [users, setUsers] = useState<User[]>([])

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

  const rows = users.map((item) => (
    <Table.Row
      key={item.id}
      data-selected={selection.includes(item.id) ? "" : undefined}
      p={2}
      _hover={{ bg: "gray.50" }}
    >
      <Table.Cell>
        {![activeTab, item.status].includes('deleted') ? <Checkbox.Root
          size="sm"
          top="0.5"
          aria-label="Select row"
          checked={selection.includes(item.id)}
          onCheckedChange={(changes) => {
            setSelection((prev) =>
              changes.checked
                ? [...prev, item.id]
                : selection.filter((id) => id !== item.id)
            );
          }}
        >
          <Checkbox.HiddenInput />
          <Checkbox.Control />
        </Checkbox.Root>: ''}
      </Table.Cell>
      <Table.Cell>
        <Link variant="underline" colorPalette="teal">
          {item.first_name} {item.last_name}
        </Link>
      </Table.Cell>
      <Table.Cell>{item.email}</Table.Cell>
      <Table.Cell>
        <Badge
          p={1}
          variant="solid"
          width="80px"
          display="flex"
          justifyContent="center"
          colorPalette={(statusColors as any)[item.status]}
        >
          <Icon as={(statusIcon as any)[item.status]} />
          {item.status}
        </Badge>
      </Table.Cell>
      <Table.Cell>
        <Flex gap="2">
          <IconButton
            p="4px"
            size="xs"
            variant="subtle"
            rounded="full"
            onClick={() => {
              setSelectedUser(item)
              setShowEditPopup(true);
            }}
            >
            <SlPencil />
          </IconButton>
          {item.status !== 'deleted' ? 
          <IconButton
            p="4px"
            size="xs"
            variant="subtle"
            rounded="full"
            onClick={() => {
              setSelectedUser(item)
              setShowDeletePopup(true)
            }}
          >
            <SlTrash />
          </IconButton>: 
            <IconButton
              p="4px"
              size="xs"
              variant="subtle"
              rounded="full"
              onClick={() => {
                setSelectedUser(item)
                setShowRestorePopup(true)
              }}
            >
              <SlReload/>
            </IconButton>
          }
        </Flex>
      </Table.Cell>
    </Table.Row>
  ));

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
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Email</Table.ColumnHeader>
            <Table.ColumnHeader>Status</Table.ColumnHeader>
            <Table.ColumnHeader>Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>{rows}</Table.Body>
      </Table.Root>
      {/* <Center mt={3}>
        <Pager />
      </Center> */}

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
