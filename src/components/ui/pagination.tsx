import {
  ButtonGroup,
  IconButton,
  Pagination,
} from "@chakra-ui/react"
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"

const Pager = () => {
  return (
    <Pagination.Root count={10} pageSize={5} page={1}>
        <ButtonGroup variant="ghost" size="sm" wrap="wrap">
            <Pagination.PrevTrigger asChild>
            <IconButton>
                <LuChevronLeft />
            </IconButton>
            </Pagination.PrevTrigger>

            <Pagination.Items
            render={(page) => (
                <IconButton variant={{ base: "ghost", _selected: "outline" }}>
                {page.value}
                </IconButton>
            )}
            />

            <Pagination.NextTrigger asChild>
            <IconButton>
                <LuChevronRight />
            </IconButton>
            </Pagination.NextTrigger>
        </ButtonGroup>
    </Pagination.Root>
  )
}

export default Pager;