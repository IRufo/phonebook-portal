import { Box, Button, Field , Input, VStack, Heading } from "@chakra-ui/react";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Logging in with:", { email, password });
  };


  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Box p={6} boxShadow="lg" borderRadius="md" width="400px">
          <Heading mb={4} textAlign="center">Login</Heading>
          <VStack>
            <Field.Root required>
              <Field.Label>
                Email
                <Field.RequiredIndicator />
              </Field.Label>
              
              <Input placeholder="me@example.com"/>
              <Field.HelperText />
              <Field.ErrorText></Field.ErrorText>
            </Field.Root>
            <Field.Root required invalid>
              <Field.Label>
                Password
                <Field.RequiredIndicator />
              </Field.Label>
              <Input />
              <Field.HelperText />
              <Field.ErrorText >Incorrect password</Field.ErrorText>
            </Field.Root>

            <Button colorScheme="blue" width="100%" onClick={handleLogin}>Login</Button>
          </VStack>
        </Box>
    </Box>
  );
};

export default Login;
