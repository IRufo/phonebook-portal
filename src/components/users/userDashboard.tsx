import { Box, Heading, Grid, GridItem, Text, useBreakpointValue } from "@chakra-ui/react";
import { useAuth } from "../../contexts/authContext";

const UserDashboard = () => {
  const { user } = useAuth();

  // Use responsive breakpoints for layout
  const gridTemplateColumns = useBreakpointValue({ base: "1fr", md: "1fr 1fr" });

  return (
    <Box maxW="1200px" mx="auto" mt={4} px={4}>
      <Heading as="h2" size="lg" mb={4}>
        Welcome, {user?.name}!
      </Heading>
      <Grid templateColumns={gridTemplateColumns} gap={4}>
        <GridItem>
          <Box p={4} borderWidth={1} borderRadius="md" boxShadow="sm">
            <Heading as="h4" size="md" mb={2}>
              Your Contacts
            </Heading>
            <Text>Manage your contacts and share with others.</Text>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default UserDashboard;
