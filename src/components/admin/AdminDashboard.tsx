import { Box, Heading, Grid, GridItem, Text, useBreakpointValue } from "@chakra-ui/react";
import { useAuth } from "../../contexts/authContext";

const AdminDashboard = () => {
  const { user } = useAuth();

  // Use responsive breakpoints for layout
  const gridTemplateColumns = useBreakpointValue({ base: "1fr", md: "1fr 1fr" });

  return (
    <Box maxW="1200px" mx="auto" mt={4} px={4}>
      <Heading as="h2" size="lg" mb={4}>
        Admin Panel - {user?.name}
      </Heading>
      <Grid templateColumns={gridTemplateColumns} gap={4}>
        <GridItem>
          <Box p={4} borderWidth={1} borderRadius="md" boxShadow="sm">
            <Heading as="h4" size="md" mb={2}>
              User Management
            </Heading>
            <Text>Approve, deactivate, or delete users.</Text>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
