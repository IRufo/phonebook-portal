import {
    Button,
    ButtonGroup,
    CloseButton,
    Drawer,
    Portal,
    Box,
    Heading
  } from "@chakra-ui/react"

const TopNavbar = () => {
  return (
    <Box background="#27272a" width="100vw" height="60px" padding="4" color="white">
        <Heading>Admin</Heading>
    </Box>
    // <Drawer.Root size="xs" placement="start" open={true}>
    //   <Drawer.Trigger asChild>
    //     <Button variant="outline" size="sm">
    //       Open Drawer
    //     </Button>
    //   </Drawer.Trigger>
    //   <Portal>
    //     <Drawer.Positioner>
    //       <Drawer.Content>
    //         <Drawer.Header>
    //           <Drawer.CloseTrigger asChild pos="initial">
    //             <CloseButton />
    //           </Drawer.CloseTrigger>
    //           <Drawer.Title flex="1">Drawer Title</Drawer.Title>
    //           <ButtonGroup>
    //             <Button variant="outline">Cancel</Button>
    //             <Button>Save</Button>
    //           </ButtonGroup>
    //         </Drawer.Header>
    //         <Drawer.Body>
    //           <p>
    //             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
    //             eiusmod tempor incididunt ut labore et dolore magna aliqua.
    //           </p>
    //         </Drawer.Body>
    //       </Drawer.Content>
    //     </Drawer.Positioner>
    //   </Portal>
    // </Drawer.Root>
  );
};

export default TopNavbar;
