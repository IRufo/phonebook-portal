import {
  Checkbox,
  Table,
  IconButton,
  Flex,
  Link,
  Badge,
  Icon
} from "@chakra-ui/react";
import { SlPencil, SlTrash, SlCheck, SlPlus, SlClose, SlReload } from "react-icons/sl";
import { ITableRow } from "./types";

const statusColors = { Pending: "orange", Active: "green", Deleted: "red" };
const statusIcon = { Pending: SlPlus, Active: SlCheck, Deleted: SlClose };

const TableRow = (props: ITableRow ) => {
    const { item, selection, activeTab, setSelection, setSelectedUser, setShowEditPopup, setShowDeletePopup, setShowRestorePopup, setShowApprovePopup } = props

    console.log('sdfs',item)

    return (
      <Table.Row
        key={item.id}
        data-selected={selection.includes(item.id) ? "" : undefined}
        p={2}
        _hover={{ bg: "gray.50" }}
      >
        <Table.Cell>
          {![activeTab, item.status].includes('Deleted') ? <Checkbox.Root
            size="sm"
            top="0.5"
            aria-label="Select row"
            checked={selection.includes(item.id)}
            onCheckedChange={(changes) => {
              setSelection((prev: string[]) =>
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
            {
              item.status == 'Pending'? 
                <IconButton
                  p="4px"
                  size="xs"
                  variant="subtle"
                  rounded="full"
                  onClick={() => {
                    setSelectedUser(item)
                    setShowApprovePopup(true)
                  }}
                >
                  <SlPlus/>
                </IconButton> : null
            }
            {item.status !== 'Deleted' ? 
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
    )

};

export default TableRow;
