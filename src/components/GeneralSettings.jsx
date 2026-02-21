import { Box, Heading } from "@chakra-ui/react";
import React from "react";

export default function GeneralSettings() {
  return (
    <Box
      height={"400px"}
      w={{ md: "100%", base: "100%" }}
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
        General Settings
      </Heading>
    </Box>
  );
}
