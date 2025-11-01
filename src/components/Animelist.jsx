import { Box, Heading, HStack, Image, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { BsCameraVideoFill } from "react-icons/bs";
import { useNavigate } from "react-router";

export default function Animelist({ title, data }) {
  const nav = useNavigate();
  return (
    <Stack width={{ lg: "70%", base: "100%" }} marginTop={"60px"} gap={5}>
      <Heading>{title}</Heading>
      <Box display={"flex"} flexWrap={"wrap"} gap={5}>
        {data?.slice(0, 12)?.map((item) => (
          <Box
            key={item.id}
            position={"relative"}
            _hover={{
              boxShadow: "0 0 15px #32a88bff",
            }}
            onClick={() => {
              nav(`details/${item.id}`);
            }}
          >
            <Image
              height={"225px"}
              borderRadius={"lg"}
              w={"175px"}
              src={item.poster}
            />
            <Box
              width={"95%"}
              position={"absolute"}
              borderRadius={"md"}
              backgroundColor="rgba(0, 0, 0, 0.57)"
              backdropFilter="blur(10px)"
              WebkitBackdropFilter="blur(10px)"
              bottom={1}
              left={1}
              px={2}
            >
              <Text truncate>{item.title}</Text>
            </Box>
            <HStack position={"absolute"} top={1} right={1} gap={1}>
              <Box
                borderRadius={"md"}
                backgroundColor="rgba(0, 0, 0, 0.57)"
                backdropFilter="blur(10px)"
                WebkitBackdropFilter="blur(10px)"
                px={2}
              >
                <Text fontSize={"sm"}>{item.tvInfo.showType}</Text>
              </Box>
              <Box
                borderRadius={"md"}
                backgroundColor="rgba(0, 0, 0, 0.57)"
                backdropFilter="blur(10px)"
                WebkitBackdropFilter="blur(10px)"
                px={2}
              >
                <Text fontSize={"sm"}>{item.tvInfo.duration}</Text>
              </Box>
              <HStack
                borderRadius={"md"}
                backgroundColor="rgba(0, 0, 0, 0.57)"
                backdropFilter="blur(10px)"
                WebkitBackdropFilter="blur(10px)"
                px={2}
              >
                <BsCameraVideoFill />
                <Text fontSize={"sm"}>{item.tvInfo.sub}</Text>
              </HStack>
            </HStack>
          </Box>
        ))}
      </Box>
    </Stack>
  );
}
