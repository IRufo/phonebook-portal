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
  HStack,
  Avatar,
  CloseButton,
  Drawer,
  VStack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import {
  SlPencil,
  SlTrash,
  SlCheck,
  SlPlus,
  SlClose,
  SlShare,
  SlReload,
} from "react-icons/sl";
import { useParams, useNavigate } from "react-router-dom";
import { GoPlus } from "react-icons/go";

import {
  SlUserFollowing,
  SlUser,
  SlUserFollow,
  SlUserUnfollow,
} from "react-icons/sl";

const tabs = [
  {
    key: "all",
    text: "Current Contacts",
    icon: SlUser,
  },
  {
    key: "deleted",
    text: "Deleted Contacts",
    icon: SlUserUnfollow,
  },
];

const tabContent = [
  {
    tab: "all",
    content: (
      <Flex justifyContent="start" pt={3}>
        <Button variant="surface">
          Create New Contact <GoPlus />
        </Button>
      </Flex>
    ),
  },
];

const statusColors = { pending: "orange", approved: "green", deleted: "red" };
const statusIcon = { pending: SlPlus, approved: SlCheck, deleted: SlClose };

type User = {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  status: string;
};

const items: User[] = [
  {
    id: 1,
    status: "approved",
    first_name: "Laptop",
    last_name: "Laptop",
    phone_number: "90898989898",
    email: "Electronics",
  },
  {
    id: 2,
    status: "deleted",
    first_name: "Coffee Maker",
    last_name: "Coffee Maker",
    phone_number: "90898989898",
    email: "Home Appliances",
  },
  {
    id: 3,
    status: "approved",
    first_name: "Desk Chair",
    last_name: "Desk Chair",
    phone_number: "90898989898",
    email: "Furniture",
  },
  {
    id: 4,
    status: "pending",
    first_name: "Smartphone",
    last_name: "Smartphone",
    phone_number: "90898989898",
    email: "Electronics",
  },
  {
    id: 5,
    status: "approved",
    first_name: "Headphones",
    last_name: "Headphones",
    phone_number: "90898989898",
    email: "Accessories",
  },
];

const Users = () => {
  const [selection, setSelection] = useState<number[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>();

  const [showBulkDeletePopup, setShowBulkDeletePopup] =
    useState<boolean>(false);
  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
  const [showEditPopup, setShowEditPopup] = useState<boolean>(false);
  const [showRestorePopup, setShowRestorePopup] = useState<boolean>(false);
  const [showSharePopup, setShowSharePopup] = useState<boolean>(false);

  const [users, setUsers] = useState<User[]>([]);

  const navigate = useNavigate();
  let { status } = useParams();
  const [activeTab, setActiveTab] = useState<string>("");

  const hasSelection = selection.length > 0;
  const indeterminate = hasSelection && selection.length < users.length;

  useEffect(() => {
    status = status || "all";
    setActiveTab(status || "all");
  }, []);

  useEffect(() => {
    if (activeTab !== "all") {
      setUsers(items.filter((i) => i.status === activeTab));
    } else {
      setUsers(items.filter((i) => i.status !== "deleted"));
    }
  }, [activeTab]);

  useEffect(() => {
    if (!showDeletePopup && !showEditPopup) {
      setSelectedUser(null);
    }
  }, [showDeletePopup, showEditPopup]);

  function bulkDelete() {
    setUsers(users.filter((u) => !selection.includes(u.id)));
    setSelection([]);
  }

  function deleteUser() {
    setUsers(users.filter((u) => u.id != (selectedUser || {}).id));
    setShowDeletePopup(false);
  }

  function editUser() {
    setShowEditPopup(false);
  }

  function changeTab(newTab: string) {
    navigate(`/contacts/${newTab}`);
    setSelection([]);
    setActiveTab(newTab);
  }

  const rows = users.map((item) => (
    <Table.Row
      key={item.id}
      data-selected={selection.includes(item.id) ? "" : undefined}
      p={2}
      _hover={{ bg: "gray.50" }}
    >
      <Table.Cell>
        {activeTab !== "deleted" ? (
          <Checkbox.Root
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
          </Checkbox.Root>
        ) : (
          ""
        )}
      </Table.Cell>
      <Table.Cell>
        <HStack gap="3">
          <Avatar.Root size="md">
            <Avatar.Fallback name={`${item.first_name} ${item.last_name}`} />
            {/* <Avatar.Image src="https://bit.ly/sage-adebayo" /> */}
          </Avatar.Root>
          <Link variant="underline" colorPalette="teal">
            {item.first_name} {item.last_name}
          </Link>
        </HStack>
      </Table.Cell>
      <Table.Cell>{item.phone_number}</Table.Cell>
      <Table.Cell>{item.email}</Table.Cell>
      <Table.Cell>
        <Flex gap="2">
          <IconButton
            p="4px"
            size="xs"
            variant="subtle"
            rounded="full"
            onClick={() => {
              setSelectedUser(item);
              setShowEditPopup(true);
            }}
          >
            <SlPencil />
          </IconButton>
          {item.status !== "deleted" ? (
            <>
              <IconButton
                p="4px"
                size="xs"
                variant="subtle"
                rounded="full"
                onClick={() => {
                  setSelectedUser(item);
                  setShowDeletePopup(true);
                }}
              >
                <SlTrash />
              </IconButton>
              <IconButton
                p="4px"
                size="xs"
                variant="subtle"
                rounded="full"
                onClick={() => {
                  setSelection([item.id]);
                  setShowSharePopup(true);
                }}
              >
                <SlShare />
              </IconButton>
            </>
          ) : (
            <IconButton
              p="4px"
              size="xs"
              variant="subtle"
              rounded="full"
              onClick={() => {
                setSelectedUser(item);
                setShowRestorePopup(true);
              }}
            >
              <SlReload />
            </IconButton>
          )}
        </Flex>
      </Table.Cell>
    </Table.Row>
  ));

  return (
    <Box background="#fff" width="100%" height="100%" padding="5px" pr="15px">
      <Menu
        tabs={tabs}
        value={activeTab}
        setValue={changeTab}
        contents={tabContent}
      />
      <Table.Root mt={5}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader w="6">
              {activeTab !== "deleted" ? (
                <Checkbox.Root
                  size="sm"
                  top="0.5"
                  aria-label="Select all rows"
                  checked={
                    indeterminate ? "indeterminate" : selection.length > 0
                  }
                  onCheckedChange={(changes) => {
                    setSelection(
                      changes.checked ? users.map((item) => item.id) : []
                    );
                  }}
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                </Checkbox.Root>
              ) : (
                ""
              )}
            </Table.ColumnHeader>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Phone number</Table.ColumnHeader>
            <Table.ColumnHeader>Email</Table.ColumnHeader>
            <Table.ColumnHeader>Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>{rows}</Table.Body>
      </Table.Root>
      {/* <Center mt={3}>
        <Pager />
      </Center> */}

      <ActionBar.Root open={hasSelection && activeTab !== "deleted"}>
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
              <ActionBar.Separator />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSharePopup(true)}
              >
                Share
                <SlShare />
              </Button>
            </ActionBar.Content>
          </ActionBar.Positioner>
        </Portal>
      </ActionBar.Root>

      <Popup
        title={"Delete users"}
        content={
          <Text>Are you sure want to delete all the selected user(s)?</Text>
        }
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
        title={"Restore contact"}
        content={<Text>Are you sure want to restore this contact?</Text>}
        confirm={<Button onClick={() => deleteUser()}>Restore</Button>}
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
                <Input placeholder="John" value={selectedUser?.first_name} />
                <Field.ErrorText>First name is required</Field.ErrorText>
              </Field.Root>

              <Field.Root required>
                <Field.Label>
                  Last name
                  <Field.RequiredIndicator />
                </Field.Label>
                <Input placeholder="Due" value={selectedUser?.last_name} />
                <Field.ErrorText>Last name is required</Field.ErrorText>
              </Field.Root>
            </Fieldset.Content>
          </Fieldset.Root>
        }
        confirm={<Button onClick={() => editUser()}>Edit</Button>}
        open={showEditPopup}
        setOpen={setShowEditPopup}
      ></Popup>

      <Drawer.Root
        open={showSharePopup}
        onOpenChange={(e) => setShowSharePopup(e.open)}
      >
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.Header>
                <Drawer.Title>Share contact</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body>
                <p>
                  search and select the user to whom you want to share the
                  contact(s)
                </p>
                <br/>
                <Field.Root>
                  <Input placeholder="Email" />
                  <Field.HelperText />
                </Field.Root>

                <VStack width="100%">
                  {[...Array(5).keys()].map((i) => (
                    <Box
                      background="gray.100"
                      p={2}
                      width="100%"
                      borderRadius="5px"
                      cursor="pointer"
                    >
                      <HStack gap="3" width="full">
                        <Avatar.Root size="md">
                          <Avatar.Fallback name="Segun Adebayo" />
                          {/* <Avatar.Image src="https://bit.ly/sage-adebayo" /> */}
                        </Avatar.Root>
                        <Box>
                          <Text textStyle="md">Segun Adebayo</Text>
                        </Box>
                      </HStack>
                    </Box>
                  ))}
                </VStack>
              </Drawer.Body>
             
              <Drawer.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Drawer.CloseTrigger>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </Box>
  );
};

export default Users;
