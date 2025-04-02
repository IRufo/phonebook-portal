import { Box, Button, Field , Input, VStack, Heading, Fieldset } from "@chakra-ui/react";
import { useState } from "react";
import { loginFields } from "./config";
import { IErrorLogin, TLogin } from "./types";
import { loginUser, verifyToken } from "../../services/authService";
import { setCookie } from "../../utils/cacheCookie";
import { validateRequiredFields } from "../../utils/requiredFieldsValidation";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [data, setData] = useState({ email: '', password: '' });
  const [error, setError] = useState<IErrorLogin | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleChange = (key: string, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
  
    setError((prev) => {
      if (prev) {
        const { [key as TLogin]: ommitted, ...rest } = prev;
        return rest;
      }
      return null;
    });
    if(serverError){
      setServerError(null)
    }
  };

  const handleLogin = async () => {
    try {
      const _error = validateRequiredFields(data, ['email', 'password'])
      if(Object.entries(_error).length) {
        setError(_error)
        return
      }
      const response = await loginUser(data);
      console.log('Login successful:', response);

      if (response.success) {
        setCookie('token', response.token, 1)
        setTimeout(async() => {
          const res = await verifyToken()
          if(['Admin', 'Super Admin'].includes(res?.data?.role)){
            navigate('/admin/users/all');
            return
          }
          navigate('/contacts/my-contacts');

        },1000 )
      } else {
        setServerError(response.message)
      }
    } catch (err) {
     console.error(err)
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Box p={6} boxShadow="lg" borderRadius="md" width="400px">
          <Heading mb={4} textAlign="center">Login</Heading>
          <Fieldset.Root invalid>
          <Fieldset.Content>
            {
              loginFields.map(({key, label, required, type}) => (
                <Field.Root required = {required} invalid = {!!error?.[key as TLogin]}>
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
                <Field.ErrorText>{error?.[key as TLogin]}</Field.ErrorText>
              </Field.Root>
              ))
            }
            <Fieldset.ErrorText>
              {serverError}
            </Fieldset.ErrorText>
               </Fieldset.Content>
            <Button colorScheme="blue" width="100%" onClick={handleLogin}>Login</Button>
         </Fieldset.Root>
        </Box>
    </Box>
  );
};

export default Login
