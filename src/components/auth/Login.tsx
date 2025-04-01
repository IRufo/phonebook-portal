import { Box, Button, Field , Input, VStack, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { loginFields } from "./config";
import { TLogin } from "./types";
import { loginUser } from "../../services/authService";
import { setCookie } from "../../utils/cacheCookie";
import withAuthRedirect from "../../HOC/withAuthRedirect";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [data, setData] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleChange = (key: string, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const handleLogin = async () => {
    try {
      const response = await loginUser(data);
      console.log('Login successful:', response);
      if (response.token) {
        setCookie('token', response.token, 1)
        navigate('/dashboard');
      } else {
        alert("Invalid login credentials.");
      }
    } catch (err) {
      setError('Invalid credentials, please try again.');
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Box p={6} boxShadow="lg" borderRadius="md" width="400px">
          <Heading mb={4} textAlign="center">Login</Heading>
          <VStack>
            {
              loginFields.map(({key, label, required, type}) => (
                <Field.Root required>
                <Field.Label>
                  {label}
                  <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  onChange={(e) => {
                    handleChange(key, e.target.value) 
                  }}
                  value={data[key as TLogin]}
                  type={type}
                />
                <Field.HelperText />
                <Field.ErrorText></Field.ErrorText>
              </Field.Root>
              ))
            }
            <Button colorScheme="blue" width="100%" onClick={handleLogin}>Login</Button>
          </VStack>
        </Box>
    </Box>
  );
};

export default withAuthRedirect(Login);
