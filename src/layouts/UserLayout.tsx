import { Box, Flex, Heading, Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <>
      <Box as="header" bg="teal.500" color="white" px={4}>
        <Flex as="nav" align="center" justify="space-between" py={4}>
          <Heading as="h1" size="lg">
            User Dashboard
          </Heading>
        </Flex>
      </Box>
      <Container maxW="container.xl" mt={4}>
        <Outlet />
      </Container>
    </>
  );
};

export default UserLayout;
