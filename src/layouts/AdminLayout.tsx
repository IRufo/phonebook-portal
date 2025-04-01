import { Box, Button, Container, Flex, Heading, Spacer } from "@chakra-ui/react";
import { useAuth } from "../contexts/authContext";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { logout } = useAuth();

  return (
    <Box>
      <Box as="header" bg="gray.800" color="white" px={4} py={3}>
        <Flex align="center">
          <Heading as="h1" size="lg">
            Admin Panel
          </Heading>
          <Spacer />
          <Button colorScheme="teal" onClick={logout}>
            Logout
          </Button>
        </Flex>
      </Box>
      <Container maxW="container.xl" mt={4}>
        {children}
      </Container>
    </Box>
  );
};

export default AdminLayout;
