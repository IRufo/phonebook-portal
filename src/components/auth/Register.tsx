import { useState } from "react";
import {
  Box,
  Button,
  // FormControl,
  // FormLabel,
  Input,
  Stack,
  // useToast,
  Heading,
} from "@chakra-ui/react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  // const toast = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      // toast({
      //   title: "Passwords do not match.",
      //   status: "error",
      //   duration: 3000,
      // });
      return;
    }

    setIsLoading(true);

    // Simulate an API call
    setTimeout(() => {
      // toast({
      //   title: "Registration successful.",
      //   status: "success",
      //   duration: 3000,
      // });
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Box
      width="100%"
      maxWidth="400px"
      mx="auto"
      mt="100px"
      p={6}
      borderRadius="md"
      boxShadow="lg"
    >
      <Heading as="h2" size="lg" textAlign="center" mb={6}>
        Register
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack >
          {/* <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </FormControl>

          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </FormControl>

          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </FormControl>

          <FormControl id="confirmPassword" isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
            />
          </FormControl> */}

          <Button
            colorScheme="blue"
            width="100%"
            type="submit"
          >
            Register
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Register;
