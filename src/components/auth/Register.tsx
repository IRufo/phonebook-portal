import { Box, Button, Field, Fieldset, Input, Stack, VStack, Heading } from "@chakra-ui/react";
import {
  PasswordInput,
  PasswordStrengthMeter,
} from "../ui/password-input"
import { passwordStrength } from 'check-password-strength'
import { useState } from "react";
import { registerUser } from "../../services/authService";
import { useNavigate } from 'react-router-dom';
import { registerFields } from "./config";
import { TRegister } from "./types";


const passStrengthMap =  {
  'Too weak': 1,
  'Weak': 2,
  'Medium': 3,
  'Strong': 4
}

const Register = () => {
  const [data, setData] = useState({ email: '', first_name: '', last_name: '', password: '', confirm_password: '' });

  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleChange = (key: string, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const handleRegister = async () => {
    try {
      const response = await registerUser(data);
      console.log('Login successful:', response);
      if (response.success) {
        navigate('/account-status');
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
          <Heading mb={4} textAlign="center">Sign up</Heading>
          <Fieldset.Root invalid>
            <Fieldset.Content>
              {
                registerFields.map(({key, label, required, type}) => (
                  <Field.Root required>
                  <Field.Label>
                    {label}
                    <Field.RequiredIndicator />
                  </Field.Label>
                  <Input
                    onChange={(e) => {
                      handleChange(key, e.target.value) 
                    }}
                    value={data[key as TRegister ]}
                    type={type}
                  />
                  <Field.HelperText />
                  <Field.ErrorText></Field.ErrorText>
                </Field.Root>
                ))
              }

              <Field.Root required>
                <Field.Label>
                  Password
                  <Field.RequiredIndicator />
                </Field.Label>
                <Stack width="100%">
                  <PasswordInput 
                    onChange={(e) => {
                      handleChange('password', e.target.value) 
                    }}
                    value={data['password']}
                  />
                  <PasswordStrengthMeter value={ (passStrengthMap as any)[passwordStrength(data['password']).value] } />
                </Stack>
                <Field.ErrorText >Incorrect password</Field.ErrorText>
              </Field.Root>

              <Field.Root required>
                <Field.Label>
                  Confirm password
                  <Field.RequiredIndicator />
                </Field.Label>
                <PasswordInput 
                  onChange={(e) => {
                    handleChange('confirm_password', e.target.value) 
                  }}
                  value={data['confirm_password']}
                />
                <Field.ErrorText >Incorrect password</Field.ErrorText>
              </Field.Root>
            </Fieldset.Content>
            <Fieldset.ErrorText>
              Some fields are invalid. Please check them.
            </Fieldset.ErrorText>

            <Button colorScheme="blue" width="100%" onClick={handleRegister}>Register</Button>
          </Fieldset.Root>
        </Box>
    </Box>
  );
};

export default Register;
