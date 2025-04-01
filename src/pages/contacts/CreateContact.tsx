import { Box, Button, Field , Input, VStack, Heading, Fieldset } from "@chakra-ui/react";
import { useState } from "react";
import { contactFields } from "./config";
import { IErrorContact, TContact } from "./types";
import { validateRequiredFields } from "../../utils/requiredFieldsValidation";
import withAuthRedirect from "../../HOC/withAuthRedirect";
import { useNavigate } from 'react-router-dom';
import { createContact } from "../../services/contactService";

const CreateContact = () => {
  const [data, setData] = useState({ first_name: '', last_name: '', email: '', phone_number: ''});
  const [error, setError] = useState<IErrorContact | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleChange = (key: string, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
  
    setError((prev) => {
      if (prev) {
        const { [key as TContact]: ommitted, ...rest } = prev;
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
      const _error = validateRequiredFields(data, ['first_name', 'last_name', 'phone_number', 'email'])
      if(Object.entries(_error).length) {
        setError(_error)
        return
      }
      const response = await createContact(data);
      if (response.success) {
        navigate('/dashboard');
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
          <Heading mb={4} textAlign="center">New Contact</Heading>
          <Fieldset.Root invalid>
          <Fieldset.Content>
            {
              contactFields.map(({key, label, required, type}) => (
                <Field.Root required = {required} invalid = {!!error?.[key as TContact]}>
                <Field.Label>
                  {label}
                  <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  onChange={(e) => {
                    handleChange(key, e.target.value) 
                  }}
                  value={data[key as TContact]}
                  type={type}
                />
                <Field.HelperText />
                <Field.ErrorText>{error?.[key as TContact]}</Field.ErrorText>
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

export default withAuthRedirect(CreateContact);
