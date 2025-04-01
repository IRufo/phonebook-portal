import { Box, Button, Field, Fieldset, Input, Stack, VStack, Heading } from "@chakra-ui/react";
import {
  PasswordInput,
  PasswordStrengthMeter,
} from "../ui/password-input"
import { passwordStrength } from 'check-password-strength'

const passStrengthMap =  {
  'Too weak': 1,
  'Weak': 2,
  'Medium': 3,
  'Strong': 4
}

const Register = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Box p={6} boxShadow="lg" borderRadius="md" width="400px">
          <Heading mb={4} textAlign="center">Sign up</Heading>
          
          <Fieldset.Root invalid>
            {/* <Fieldset.Legend>Sign up with phonebook hub</Fieldset.Legend> */}
            
            <Fieldset.Content>
              <Field.Root required>     
                <Field.Label>
                  First name
                  <Field.RequiredIndicator />
                </Field.Label>
                <Input placeholder="John"/> 
                <Field.ErrorText>First name is required</Field.ErrorText>
              </Field.Root>

              <Field.Root required>
                <Field.Label>
                  Last name
                  <Field.RequiredIndicator />
                </Field.Label>
                <Input placeholder="Due"/> 
                <Field.ErrorText>Last name is required</Field.ErrorText>
              </Field.Root>

              <Field.Root required invalid>
                <Field.Label>
                  Email
                  <Field.RequiredIndicator />
                </Field.Label>
                <Input placeholder="me@example.com"/> 
                <Field.ErrorText>Email is required</Field.ErrorText>
              </Field.Root>

              <Field.Root required>
                <Field.Label>
                  Password
                  <Field.RequiredIndicator />
                </Field.Label>
                <Stack width="100%">
                  <PasswordInput />
                  <PasswordStrengthMeter value={ (passStrengthMap as any)[passwordStrength('asdfasdf').value] } />
                </Stack>
                <Field.ErrorText >Incorrect password</Field.ErrorText>
              </Field.Root>

              <Field.Root required>
                <Field.Label>
                  Confirm password
                  <Field.RequiredIndicator />
                </Field.Label>
                <PasswordInput />
                <Field.ErrorText >Incorrect password</Field.ErrorText>
              </Field.Root>
            </Fieldset.Content>

            <Fieldset.ErrorText>
              Some fields are invalid. Please check them.
            </Fieldset.ErrorText>

            <Button colorScheme="blue" width="100%">Register</Button>
          </Fieldset.Root>
        </Box>
    </Box>
  );
};

export default Register;
