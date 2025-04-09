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
import { useState, useEffect, useMemo, act } from "react";
import {
  SlTrash,
  SlShare,
  SlUser,
  SlUserUnfollow,
} from "react-icons/sl";
import { useParams, useNavigate } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import { IContact, IErrorContact, TContact } from "./types";
import TableRow from "./Contacts/TableRow";
import { createContact, deleteContact, updateContact, getContacts } from "../../services/contactService";
import { contactFields } from "./config";
import { getUsersByStatus } from "../../services/userService";
import { IUser } from "@/services/authService";
import { getSharedContacts, shareContact, getContactsSharedWithMe, unshareContact } from "../../services/sharedContactService";

const tabs = [
  {
    key: "my-contacts",
    text: "My Contacts",
    icon: SlUser,
  },
  {
    key: "shared-contacts",
    text: "Shared Contacts",
    icon: SlUser,
  },
  {
    key: "shared-with-me",
    text: "Shared with Me",
    icon: SlUser,
  }
];

const columnHeaders = ['Name', 'Phone Number', 'Email', 'Actions']


const Contacts = () => {
  const [selection, setSelection] = useState<string[]>([]);
  const [selectedContact, setSelectedContact] = useState<IContact | null>();

  const [showBulkDeletePopup, setShowBulkDeletePopup] =
    useState<boolean>(false);
  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
  const [showEditPopup, setShowEditPopup] = useState<boolean>(false);
  const [showCreatePopup, setShowCreatePopup] = useState<boolean>(false);
  const [showUnsharePopup, setShowUnsharePopup] = useState<boolean>(false);
  const [showSharePopup, setShowSharePopup] = useState<boolean>(false);
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [error, setError] = useState<IErrorContact | null>(null);
  const [users, setUsers] = useState<IUser[] | []>([])
  const [searchUser, setSearchUser] = useState<string>('')


  const navigate = useNavigate();
  let { status } = useParams();
  const [activeTab, setActiveTab] = useState<string>(status ||"my-contacts");

  const hasSelection = useMemo(() => selection.length > 0, [selection.length] );
  const indeterminate = useMemo(() => hasSelection && selection.length < contacts.length, [hasSelection, selection.length, contacts.length] ) ;

  const _getContacts = async() => {
    const response = await getContacts()
    if(response.success){
      setContacts(response.data )
      return
    }
  }

  const _getContactsSharedWithMe = async() => {
    const response = await getContactsSharedWithMe()
    if(response.success){
      setContacts(response.data)
      return
    }
  }

  const _getSharedContacts = async() => {
    const response = await getSharedContacts()
    if(response.success){
      setContacts(response.data)
      return
    }
  }


  const _getUsers = async () => {
    const response = await getUsersByStatus('Active');
    if(response.success){
      setUsers(response.data)
    }
  }

  useEffect(() => {
    _getUsers()
  }, []);

  useEffect(() => {
    if(!searchUser){
      _getUsers()
      return
    }
    if(!users.length) return
    const searchUsers = (searchString: string) => {
      return users.filter((user: IUser) => 
        user.first_name.toLowerCase().includes(searchString.toLowerCase()) || 
        user.last_name.toLowerCase().includes(searchString.toLowerCase())
      );
    };

    const _users = searchUsers(searchUser)
    setUsers(_users)

  },[searchUser])

  useEffect(() => {
    if (activeTab === "shared-with-me") {
      _getContactsSharedWithMe()
      return
    }else if (activeTab == 'shared-contacts') {
      _getSharedContacts()
      return
    }
    _getContacts()
  }, [activeTab]);

  useEffect(() => {
    if (!showDeletePopup && !showEditPopup) {
      setSelectedContact(null);
    }
  }, [showDeletePopup, showEditPopup]);

  const bulkDelete = () => {
    setContacts(contacts.filter((contact) => !selection.includes(contact.id)));
    setSelection([]);
  }

  const _deleteContact = async() => {
    const {id, owner_id} = selectedContact || {}
    await deleteContact({
      id, owner_id
    } as {id: string, owner_id: string})
    _getContacts()
    setShowDeletePopup(false);
  }

  const _createContact = async() => {
    await createContact(selectedContact as IContact)
    _getContacts()
    setShowCreatePopup(false)
    setSelectedContact(null)
  }

  const editContact = async() => {
    await updateContact(selectedContact as IContact)
    _getContacts()
    setShowEditPopup(false)
    setSelectedContact(null);

  }

  const _common = () => {
    if(activeTab == 'shared-with-me'){
      _getContactsSharedWithMe()
    }else if (activeTab == 'shared-contacts') {
      _getSharedContacts()
    }else{
      _getContacts()
    }
    setSelectedContact(null);
  }

  const _shareContact = async(shared_with_user_id: string) => {
    await shareContact({
      owner_id: selectedContact?.owner_id as string,
      shared_with_user_id,
      contact_id: selectedContact?.id  as string
    })
    _common()
    setShowSharePopup(false)
  }

  const _unShareContact = async() => {
    await unshareContact({contact_id: selectedContact?.id as string, owner_id: selectedContact?.owner_id as string} )
    _common()
    setShowUnsharePopup(false)
  }

  const changeTab = (newTab: string) => {
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
        contents={[
          {
            tab: "my-contacts",
            content: (
              <Flex justifyContent="start" pt={3}>
                <Button variant="surface" onClick={() => setShowCreatePopup(true)}>
                  Create New Contact <GoPlus />
                </Button>
              </Flex>
            ),
          },
        ]}
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
            setSelection={setSelection} setSelectedContact={setSelectedContact} setShowEditPopup={ setShowEditPopup } setShowDeletePopup={setShowDeletePopup} setShowUnsharePopup={setShowUnsharePopup} setShowSharePopup={setShowSharePopup}/>
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

             {activeTab == 'my-contacts'  &&<> <Button
                variant="outline"
                size="sm"
                onClick={() => setShowBulkDeletePopup(true)}
              >
                Delete
                <SlTrash />
              </Button>
              <ActionBar.Separator /></> }
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
        confirm={<Button onClick={() => _deleteContact()}>Delete</Button>}
        open={showDeletePopup}
        setOpen={setShowDeletePopup}
      ></Popup>

      <Popup
        title={"Unshare contact"}
        content={<Text>Are you sure want to unshare this contact?</Text>}
        confirm={<Button onClick={() => _unShareContact()}>Unshare</Button>}
        open={showUnsharePopup}
        setOpen={setShowUnsharePopup}
      ></Popup>

      <Popup
        title={showCreatePopup? 'Create Contact' : 'Edit Contact'}
        content={
          <Fieldset.Root>
            <Fieldset.Content>
            {
              contactFields.map(({key, label, required, type}) => (
                <Field.Root required = {required} invalid = {!!error?.[key as TContact]}>
                <Field.Label>
                  {label}
                  <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  onChange={(e) => {
                    setSelectedContact( (prev) => ({...(prev || {}), [key as TContact]: e.target.value})) 
                  }}
                  value={selectedContact?.[key as TContact]}
                  type={type}
                />
                <Field.HelperText />
                <Field.ErrorText>{error?.[key as TContact]}</Field.ErrorText>
              </Field.Root>
              ))
            }
            </Fieldset.Content>
          </Fieldset.Root>
        }
        confirm={<Button onClick={() =>{
          if(showCreatePopup){
            _createContact()
            return
          }else{
            editContact()
          }
         }}>{showCreatePopup? 'Create': 'Edit'}</Button>}
        open={showEditPopup || showCreatePopup}
        setOpen={showCreatePopup? setShowCreatePopup: setShowEditPopup}
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
                  Search and select the contact to whom you want to share the
                  contact(s)
                </p>
                <br/>
                <Field.Root>
                  <Input placeholder="Email"  onChange={(e) => setSearchUser(e.target.value)}/>
                  <Field.HelperText />
                </Field.Root>

                <VStack width="100%">
                  {users.map((user) => {
                    const {first_name, last_name, id} = user
                    const name = `${first_name} ${last_name}`
                    return (
                    <Box
                      background="gray.100"
                      p={2}
                      width="100%"
                      borderRadius="5px"
                      cursor="pointer"
                    >
                      <HStack gap="3" width="full">
                        <Avatar.Root size="md">
                          <Avatar.Fallback name={name} />
                        </Avatar.Root>
                        <Box>
                          <Text textStyle="md">{name} <Button onClick={() => _shareContact(id)}> Share </Button></Text>
                        </Box>
                      </HStack>
                    </Box>
                  )})}
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
