import { Box, Button, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { FaClosedCaptioning, FaMicrophone, FaServer } from "react-icons/fa";

export default function ServerListContainer({
  subServers,
  dubServers,
  setServer,
  setType,
  server,
  type,
}) {
  return (
    <Box
      width={{ md: "35%", base: "100%" }}
      height={"250px"}
      color={"white"}
      display={"flex"}
      flexDir={"column"}
      gap={2}
    >
      <HStack fontWeight={"bold"}>
        <FaServer />
        <Text>Available Servers</Text>
      </HStack>
      <Stack
        w={"100%"}
        h={"75%"}
        backdropFilter="blur(10px)"
        WebkitBackdropFilter="blur(10px)"
        alignItems={"center"}
        justifyContent={"center"}
        flexDir={"row"}
      >
        {subServers && (
          <VStack
            h={"100%"}
            w={"50%"}
            borderRadius={"xl"}
            backgroundColor="rgba(0, 0, 0, 0.57)"
          >
            <HStack w={"50px"} mx={"auto"}>
              <FaClosedCaptioning />
              Sub
            </HStack>
            <VStack>
              {subServers.map((item, index) => (
                <Button
                  key={index}
                  onClick={() => {
                    setServer(item?.serverName.toLowerCase());
                    setType("sub");
                  }}
                  colorScheme="teal"
                  width={"50px"}
                  height={"35px"}
                  backgroundColor={
                    server == item?.serverName.toLowerCase() && type == "sub"
                      ? "rgba(255, 255, 255, 0.57)"
                      : "#00000096"
                  }
                  backdropFilter="blur(10px)"
                  WebkitBackdropFilter="blur(10px)"
                  color={
                    server == item?.serverName.toLowerCase() && type == "sub"
                      ? "rgba(0, 0, 0, 1)"
                      : "#ffffffff"
                  }
                  borderRadius={"lg"}
                  _hover={{
                    transform: "scale(1.1)",
                  }}
                >
                  {item?.serverName}
                </Button>
              ))}
            </VStack>
          </VStack>
        )}

        {dubServers && (
          <VStack
            h={"100%"}
            w={"50%"}
            borderRadius={"xl"}
            backgroundColor="rgba(0, 0, 0, 0.57)"
          >
            <HStack w={"50px"} mx={"auto"}>
              <FaMicrophone />
              Dub
            </HStack>
            <VStack>
              {dubServers.map((item, index) => (
                <Button
                  key={index}
                  onClick={() => {
                    setServer(item?.serverName.toLowerCase());
                    setType("dub");
                  }}
                  colorScheme="teal"
                  width={"50px"}
                  height={"35px"}
                  backgroundColor={
                    server == item?.serverName.toLowerCase() && type == "dub"
                      ? "rgba(243, 243, 243, 0.59)"
                      : "#000000a1"
                  }
                  backdropFilter="blur(10px)"
                  WebkitBackdropFilter="blur(10px)"
                  color={
                    server == item?.serverName.toLowerCase() && type == "dub"
                      ? "rgba(0, 0, 0, 1)"
                      : "#ffffffff"
                  }
                  borderRadius={"lg"}
                  _hover={{
                    transform: "scale(1.1)",
                  }}
                >
                  {item?.serverName}
                </Button>
              ))}
            </VStack>
          </VStack>
        )}
      </Stack>
      <Box
        h={"50px"}
        borderWidth={"1px"}
        borderColor={"#32a88b"}
        borderRadius={"lg"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        color={"#32a88b"}
        bg={"#32a88b28"}
      >
        <Text>change servers if playback error</Text>
      </Box>
    </Box>
  );
}
