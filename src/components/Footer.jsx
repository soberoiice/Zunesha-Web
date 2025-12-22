import { Box, HStack, Image, Link, Stack, Text } from "@chakra-ui/react";
import React from "react";
import Zunisha from "../assets/Zunisha.png";
import { FaBalanceScale } from "react-icons/fa";

export default function Footer() {
  const links = ["FAQ", "Contact", "Terms of use", "Privacy policy"];
  return (
    <Stack
      w={"100%"}
      h={"250px"}
      backgroundColor={"black"}
      bgGradient="to-tr"
      gradientFrom="rgba(0, 0, 0, 1)"
      gradientTo="#32a88b05"
      flexDir={"column"}
      justifyContent={"center"}
      gap={5}
      color={"white"}
    >
      <Stack
        w={"90%"}
        flexDir={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        gap={10}
        mx={"auto"}
      >
        <Box w={"60%"}>
          <HStack gap={2}>
            <Image
              boxShadow="0 0 50px #32a88b57"
              src={Zunisha}
              width={"70px"}
              borderRadius={"4xl"}
            />
            <Text
              color={"#32a88b"}
              fontSize={"2xl"}
              fontWeight={"bold"}
              textAlign={"left"}
              display={{ lg: "block", base: "none" }}
            >
              Zunisha
            </Text>
          </HStack>
          <Text>
            Please note: Zunesha does not host any files itself but instead only
            displays <br /> content from 3rd party providers. Legal issues
            should be taken up with them.
          </Text>
        </Box>
        <Box w={"15%"}>
          <Text fontSize={"lg"} fontWeight={"bold"}>
            Resourses
          </Text>
          {links.map((link, index) => (
            <Text key={index}>
              <Link color={"white"}>{link}</Link>
            </Text>
          ))}
        </Box>
        <Box w={"15%"}>
          <Text fontSize={"lg"} fontWeight={"bold"}>
            Browse
          </Text>
          {links.map((link, index) => (
            <Text key={index}>
              <Link color={"white"}>{link}</Link>
            </Text>
          ))}
        </Box>
      </Stack>
      <Box mx={"auto"} w={"90%"} h={"1px"} backgroundColor={"#3b3b3b57"}></Box>
      <Stack
        w={"90%"}
        mx={"auto"}
        flexDir={"row"}
        justifyContent={"space-between"}
      >
        <Text>
          © 2025{" "}
          <Link fontWeight={"bold"} color={"#32a88b"}>
            Zunisha
          </Link>
          . All rights reserved.
        </Text>
        <Link>
          <FaBalanceScale /> DMCA
        </Link>
      </Stack>
    </Stack>
  );
}
