import { Box, Button, Input, VStack, Heading } from "@chakra-ui/react";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Logging in with:", { email, password });
  };

  return <>hello</>

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Box p={6} boxShadow="lg" borderRadius="md" width="400px">
        <Heading mb={4} textAlign="center">Login</Heading>
        <VStack>
          {/* <FormControl>
            <FormLabel>Email</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>

          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl> */}

          <Button colorScheme="blue" width="100%" onClick={handleLogin}>Login</Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default Login;
