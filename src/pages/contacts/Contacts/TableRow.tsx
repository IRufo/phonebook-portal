import {
  Checkbox,
  Table,
  IconButton,
  Flex,
  Link,
  HStack,
  Avatar,
} from "@chakra-ui/react";
import {
  SlPencil,
  SlTrash,
  SlShare,
  SlReload,
} from "react-icons/sl";
import { ITableRow } from "../types";


const TableRow = (props: ITableRow) => {
    const { item, selection, activeTab, setSelection, setSelectedContact, setShowEditPopup, setShowDeletePopup, setShowRestorePopup, setShowSharePopup } = props

   return (  <Table.Row
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
            setSelectedContact(item);
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
                setSelectedContact(item);
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
              setSelectedContact(item);
              setShowRestorePopup(true);
            }}
          >
            <SlReload />
          </IconButton>
        )}
      </Flex>
    </Table.Cell>
  </Table.Row>)

};

export default TableRow;
