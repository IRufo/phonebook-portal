import { Box, Button, Field, Fieldset, Input, Stack, Heading } from "@chakra-ui/react";
import {
  PasswordInput,
  PasswordStrengthMeter,
} from "../../components/ui/password-input"
import { passwordStrength } from 'check-password-strength'
import { useState } from "react";
import { registerUser } from "../../services/authService";
import { useNavigate } from 'react-router-dom';
import { registerFields } from "./config";
import { IErrorRegister, TRegister } from "./types";
import { validateRequiredFields } from "../../utils/requiredFieldsValidation";

const passStrengthMap =  {
  'Too weak': 1,
  'Weak': 2,
  'Medium': 3,
  'Strong': 4
}

const Register = () => {
  const [data, setData] = useState({ email: '', first_name: '', last_name: '', password: '', confirm_password: '' });

  const [error, setError] = useState<IErrorRegister | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);


  const navigate = useNavigate();

  const handleChange = (key: string, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
    setError((prev) => {
      if (prev) {
        const { [key as TRegister]: ommitted, ...rest } = prev;
        return rest;
      }
      return null;
    });
    if(serverError){
      setServerError(null)
    }
  };

  const handleRegister = async () => {
    try {
      const _error = validateRequiredFields(data, ['first_name', 'last_name', 'email', 'password', 'confirm_password'])
      if(Object.entries(_error).length) {
        setError(_error)
        return
      }
      if(data.password !== data.confirm_password) {
        setError({
          confirm_password: `Password didn't match.`
        })
        return
      }  
      const response = await registerUser(data);
      if (response.success) {
        navigate('/account-status');
      } else {
        console.log('sdfsdf', response)
        setServerError(response.message);
      }
    } catch (err) {
      setServerError('Invalid credentials, please try again.');
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
                  <Field.Root required = {required} invalid = {!!error?.[key as TRegister]}>
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
                  <Field.ErrorText>{error?.[key as TRegister]}</Field.ErrorText>
                </Field.Root>
                ))
              }
              <Field.Root required invalid = {!!error?.['password']}>
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
                <Field.ErrorText >{error?.['password']}</Field.ErrorText>
              </Field.Root>

              <Field.Root required invalid = {!!error?.['confirm_password']}>
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
                <Field.ErrorText >{error?.['confirm_password']}</Field.ErrorText>
              </Field.Root>
            </Fieldset.Content>
            <Fieldset.ErrorText>
              {serverError}
            </Fieldset.ErrorText>

            <Button colorScheme="blue" width="100%" onClick={handleRegister}>Register</Button>
          </Fieldset.Root>
        </Box>
    </Box>
  );
};

export default Register;
