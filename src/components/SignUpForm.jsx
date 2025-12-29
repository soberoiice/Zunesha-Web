import { useState } from "react";
import { signUp } from "../auth";
import { Box, Button, Field, Heading, Input } from "@chakra-ui/react";

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  console.log(formData);

  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    signUp(formData.email, formData.password, formData.username);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box
        height={"400px"}
        w={{ md: "450px", base: "100%" }}
        justifyContent={"space-between"}
        display={"flex"}
        flexDir={"column"}
        color={"white"}
        alignItems={"center"}
        backgroundColor={"rgba(36, 36, 36, 0.51)"}
        py={5}
        borderRadius={"xl"}
        backdropFilter="blur(10px)"
      >
        <Heading color={"#32a88b"} fontWeight={"bold"} fontSize={"2xl"}>
          Sign Up
        </Heading>
        <Field.Root w={"90%"}>
          <Field.Label>Username</Field.Label>
          <Input
            borderRadius={"xl"}
            placeholder="Username"
            name="username"
            onChange={handleChange}
            borderColor={"transparent"}
            backgroundColor={"#000000a8"}
            focusRing={"none"}
          />
        </Field.Root>
        <Field.Root w={"90%"}>
          <Field.Label>Email</Field.Label>
          <Input
            borderRadius={"xl"}
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            borderColor={"transparent"}
            backgroundColor={"#000000a8"}
            focusRing={"none"}
          />
        </Field.Root>
        <Field.Root w={"90%"}>
          <Field.Label>Passward</Field.Label>
          <Input
            borderRadius={"xl"}
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            borderColor={"transparent"}
            backgroundColor={"#000000a8"}
            focusRing={"none"}
          />
        </Field.Root>
        <Button
          borderRadius={"xl"}
          w={"90%"}
          height={50}
          backgroundColor={"#32a88b"}
          boxShadow={"0 0 20px #32a88b"}
          _hover={{ transform: "scale(1.05)" }}
          transition="all 0.2s ease-in-out"
          color={"white"}
          type="submit"
        >
          Sign up
        </Button>
      </Box>
    </form>
  );
}
