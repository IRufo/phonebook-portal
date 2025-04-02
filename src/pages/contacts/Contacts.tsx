import Menu from "../../components/ui/menu";
import Popup from "../../components/ui/popup";
import {
  ActionBar,
  Button,
  Checkbox,
  Portal,
  Table,
  Flex,
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
import { useState, useEffect, useMemo } from "react";
import {
  SlTrash,
  SlShare,
  SlUser,
  SlUserUnfollow,
} from "react-icons/sl";
import { useParams, useNavigate } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import { IContact } from "./types";
import TableRow from "./Contacts/TableRow";
import { getContacts } from "../../services/contactService";

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

const columnHeaders = ['Name', 'Phone Number', 'Email', 'Actions']


const items: IContact[] = [
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

const Contacts = () => {
  const [selection, setSelection] = useState<string[]>([]);
  const [selectedContact, setSelectedContact] = useState<IContact | null>();

  const [showBulkDeletePopup, setShowBulkDeletePopup] =
    useState<boolean>(false);
  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
  const [showEditPopup, setShowEditPopup] = useState<boolean>(false);
  const [showRestorePopup, setShowRestorePopup] = useState<boolean>(false);
  const [showSharePopup, setShowSharePopup] = useState<boolean>(false);
  const [contacts, setContacts] = useState<IContact[]>(items);

  console.log('sdfdsfsd', contacts)

  const navigate = useNavigate();
  let { status } = useParams();
  const [activeTab, setActiveTab] = useState<string>("");

  const hasSelection = useMemo(() => selection.length > 0, [selection.length] );
  const indeterminate = useMemo(() => hasSelection && selection.length < contacts.length, [hasSelection, selection.length, contacts.length] ) ;

  useEffect(() => {

    const _getContacts = async() => {
      const response = await getContacts()
      if(response.success){
        setContacts(response.data)
      }
      
      setActiveTab(status || "all");
    }

    _getContacts()

  }, []);

  useEffect(() => {

    console.log(activeTab, 'deactiveTab',contacts )
    if (activeTab !== "all") {
      setContacts((prev) => prev.filter((i) => i.status === activeTab));
    } else {
      setContacts((prev) => prev.filter((i) => i.status !== "deleted"));
    }
  }, [activeTab]);

  console.log('cc', contacts)

  useEffect(() => {
    if (!showDeletePopup && !showEditPopup) {
      setSelectedContact(null);
    }
  }, [showDeletePopup, showEditPopup]);

  function bulkDelete() {
    setContacts(contacts.filter((contact) => !selection.includes(contact.id)));
    setSelection([]);
  }

  function deleteContact() {
    setContacts(contacts.filter((contact) => contact.id != (selectedContact || {}).id));
    setShowDeletePopup(false);
  }

  function editContact() {
    setShowEditPopup(false);
  }

  function changeTab(newTab: string) {
    navigate(`/contacts/${newTab}`);
    setSelection([]);
    setActiveTab(newTab);
  }


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
                      changes.checked ? contacts.map((item) => item.id) : []
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
            {
              columnHeaders.map((item) => <Table.ColumnHeader>{item}</Table.ColumnHeader>)
            }
          </Table.Row>
        </Table.Header>
        <Table.Body>{
           contacts.map((item) =>(
            <TableRow item={item} selection={selection} activeTab={activeTab} 
            setSelection={setSelection} setSelectedContact={setSelectedContact} setShowEditPopup={setShowEditPopup} setShowDeletePopup={setShowDeletePopup} setShowRestorePopup={setShowRestorePopup} setShowSharePopup={setShowSharePopup}/>
          ))
          }</Table.Body>
      </Table.Root>
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
        title={"Delete contacts"}
        content={
          <Text>Are you sure want to delete all the selected contact(s)?</Text>
        }
        confirm={<Button onClick={() => bulkDelete()}>Delete</Button>}
        open={showBulkDeletePopup}
        setOpen={setShowBulkDeletePopup}
      ></Popup>

      <Popup
        title={"Delete contact"}
        content={<Text>Are you sure want to delete this contact?</Text>}
        confirm={<Button onClick={() => deleteContact()}>Delete</Button>}
        open={showDeletePopup}
        setOpen={setShowDeletePopup}
      ></Popup>

      <Popup
        title={"Restore contact"}
        content={<Text>Are you sure want to restore this contact?</Text>}
        confirm={<Button onClick={() => deleteContact()}>Restore</Button>}
        open={showRestorePopup}
        setOpen={setShowRestorePopup}
      ></Popup>

      <Popup
        title={"Edit contact"}
        content={
          <Fieldset.Root>
            <Fieldset.Content>
              <Field.Root required>
                <Field.Label>
                  First name
                  <Field.RequiredIndicator />
                </Field.Label>
                <Input placeholder="John" value={selectedContact?.first_name} />
                <Field.ErrorText>First name is required</Field.ErrorText>
              </Field.Root>

              <Field.Root required>
                <Field.Label>
                  Last name
                  <Field.RequiredIndicator />
                </Field.Label>
                <Input placeholder="Due" value={selectedContact?.last_name} />
                <Field.ErrorText>Last name is required</Field.ErrorText>
              </Field.Root>
            </Fieldset.Content>
          </Fieldset.Root>
        }
        confirm={<Button onClick={() => editContact()}>Edit</Button>}
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
                  search and select the contact to whom you want to share the
                  contact(s)
                </p>
                <br/>
                <Field.Root>
                  <Input placeholder="Email" />
                  <Field.HelperText />
                </Field.Root>

                <VStack width="100%">
                  {[...Array(5).keys()].map(() => (
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

export default Contacts;
