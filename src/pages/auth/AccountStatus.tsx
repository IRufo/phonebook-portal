import { Box, VStack, Heading, Text, Icon, Center } from "@chakra-ui/react";
import { SlInfo  } from "react-icons/sl";

const AccountStatus = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Box p={6} boxShadow="lg" borderRadius="md" width="400px">
            <Center mb={2}>
                <Icon size="xl">
                    <SlInfo />
                </Icon>
            </Center>
            <Heading mb={4} textAlign="center">Waiting Approval</Heading>
            <VStack>
                <Text textStyle="sm">Account created successfully! Access will be granted upon admin approval. Please wait. Thank you.<b>See you!</b></Text>
            </VStack>
        </Box>
    </Box>
  );
};

export default AccountStatus;
