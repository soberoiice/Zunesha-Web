import { Box, Heading, HStack, Image, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { BsCameraVideoFill } from "react-icons/bs";
import { useNavigate } from "react-router";

export default function Animelist({ title, data }) {
  const nav = useNavigate();
  return (
    <Stack
      width={{ lg: "70%", base: "100%" }}
      marginTop={"60px"}
      gap={5}
      color={"white"}
      s
    >
      <Heading fontSize={"2xl"}>{title}</Heading>
      <Box
        w={"100%"}
        display={"flex"}
        flexWrap={"wrap"}
        gap={{ base: 2, lg: 5 }}
        justifyContent={{ base: "center", lg: "flex-start" }}
      >
        {data?.slice(0, 16)?.map((item) => (
          <Box
            key={item.id}
            position={"relative"}
            _hover={{
              boxShadow: "0 0 15px #32a88bff",
            }}
            onClick={() => {
              nav(`/details/${item.id}`);
            }}
            w={{ base: "170px", lg: "200px" }}
            cursor={"pointer"}
            h={{ base: "250px", lg: "275px" }}
          >
            <Image
              w={"100%"}
              h={{ base: "250px", lg: "275px" }}
              borderRadius={"lg"}
              src={item.poster}
              mx={"auto"}
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
