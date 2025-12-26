import {
  Box,
  Button,
  Center,
  HStack,
  IconButton,
  Image,
  Input,
  InputGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import landingbg from "../assets/landing-bg.jpg";
import Zunisha from "../assets/Zunisha.png";
import { LuSearch } from "react-icons/lu";
import { useNavigate } from "react-router";
import { FaCheckCircle } from "react-icons/fa";
import Navbar from "../components/Navbar";

export default function LandingPage() {
  const nav = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      nav(`/search/${searchTerm}`);
      setSearchTerm("");
    }
  };
  return (
    <Box
      height={"100vh"}
      bg={"rgba(0, 0, 0, 0.95)"}
      resize={"both"}
      position={"relative"}
    >
      <Navbar />
      <Box
        backgroundImage={`url(${landingbg})`}
        w={"100%"}
        h={"100vh"}
        backgroundSize={"cover"}
        position={"absolute"}
        zIndex={-1}
      ></Box>
      <Center h={"100%"} flexDir={"column"} gap={5}>
        <HStack gap={2}>
          <Image
            // boxShadow="0 0 50px #32a88b57"
            src={Zunisha}
            width={{ md: "100px", base: "50px" }}
            borderRadius={{ md: "4xl", base: "xl" }}
          />
          <Text
            color={"#32a88b"}
            fontSize={{ md: "100px", base: "30px" }}
            fontWeight={"bold"}
            textAlign={"left"}
          >
            ZUNESHA
          </Text>
        </HStack>
        <Stack
          alignItems={"center"}
          w={{ md: "400px", base: "90%" }}
          textAlign={"center"}
          gap={5}
        >
          <Text color={"rgba(255, 255, 255, 0.79)"}>
            Watch thousands of anime series and movies for free. High-quality
            streaming
          </Text>
          <HStack
            mx={"auto"}
            w={{ md: "450px", base: "98%" }}
            flexWrap={"wrap"}
            justifyContent={"center"}
            gap={5}
            color={"rgba(255, 255, 255, 0.59)"}
          >
            <HStack>
              <FaCheckCircle color="#32a88b" />
              <Text> 100% Free</Text>
            </HStack>
            &middot;
            <HStack>
              <FaCheckCircle color="#32a88b" />
              <Text>HD Quality</Text>
            </HStack>
            &middot;
            <HStack>
              <FaCheckCircle color="#32a88b" />
              <Text>No Registration</Text>
            </HStack>
          </HStack>
          <HStack>
            <Button
              height={50}
              w={"100px"}
              onClick={() => nav(`/home`)}
              backgroundColor={"#32a88b"}
              boxShadow={"0 0 20px #32a88b"}
              _hover={{ transform: "scale(1.05)" }}
              transition="all 0.2s ease-in-out"
              color={"white"}
              borderRadius={"xl"}
            >
              Browse
            </Button>
            <form onSubmit={handleSubmit}>
              <InputGroup
                endElement={
                  <IconButton
                    backgroundColor={"transparent"}
                    marginRight={0}
                    type="submit"
                  >
                    <LuSearch color={"#c9c9c9ff"} />
                  </IconButton>
                }
                w={{ lg: "250px", base: "200px" }}
              >
                <Input
                  height={"50px"}
                  placeholder="Search"
                  focusRing={"none"}
                  boxShadow={"0 0 20px #32a88b"}
                  border={"none"}
                  backgroundColor={"#16161688"}
                  borderRadius={"2xl"}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  color={"white"}
                  backdropFilter="blur(10px)"
                  WebkitBackdropFilter="blur(10px)"
                  _placeholder={{
                    color: "#c9c9c9ff",
                  }}
                />
              </InputGroup>
            </form>
          </HStack>
        </Stack>
      </Center>
    </Box>
  );
}
