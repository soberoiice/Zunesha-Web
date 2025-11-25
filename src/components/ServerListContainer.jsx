import { Box, Button, HStack, Stack, Text } from "@chakra-ui/react";
import React from "react";

export default function ServerListContainer({
  subServers,
  dubServers,
  setServer,
  setType,
  server,
  type,
}) {
  return (
    <Stack
      width={{ md: "35%", base: "100%" }}
      height={"200px"}
      backgroundColor="rgba(0, 0, 0, 0.57)"
      backdropFilter="blur(10px)"
      WebkitBackdropFilter="blur(10px)"
      borderRadius={"xl"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Stack gap={3}>
        {subServers && (
          <Box>
            <Text lineHeight={2}>Sub Servers</Text>
            <HStack>
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
            </HStack>
          </Box>
        )}

        {dubServers && (
          <Box>
            <Text lineHeight={2}>Dub Servers</Text>
            <HStack>
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
            </HStack>
          </Box>
        )}
      </Stack>
    </Stack>
  );
}
