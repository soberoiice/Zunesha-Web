import { Box, Heading, HStack, Image, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { BsCameraVideoFill } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router";

export default function SearchResultsList({ title, data }) {
  const nav = useNavigate();
  return (
    <Stack
      width={{ lg: "80%", base: "100%" }}
      marginTop={"60px"}
      gap={5}
      color={"white"}
    >
      <Heading display={"flex"} alignItems={"center"} gap={2} fontSize={"2xl"}>
        <FaSearch />
        <Text>Search results</Text>
      </Heading>
      <Box
        w={"95%"}
        display={"flex"}
        overflow={"scroll"}
        flexWrap={"wrap"}
        gap={{ base: 2, lg: 5 }}
      >
        {data?.map((item) => (
          <Box
            key={item.id}
            position={"relative"}
            _hover={{ boxShadow: "0 0 15px #32a88bff" }}
            onClick={() => {
              nav(`/details/${item.id}`);
            }}
            w={{ lg: "145px", base: "120px" }}
            cursor={"pointer"}
            h={{ lg: "200px", base: "165px" }}
            aspectRatio={16 / 9}
          >
            <Image
              w={"100%"}
              h={"100%"}
              borderRadius={"lg"}
              src={item.poster}
              mx={"auto"}
            />{" "}
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
              <Text truncate>{item.title}</Text>{" "}
            </Box>
            {/* <HStack position={"absolute"} top={1} right={1} gap={1}> <Box borderRadius={"md"} backgroundColor="rgba(0, 0, 0, 0.57)" backdropFilter="blur(10px)" WebkitBackdropFilter="blur(10px)" px={2} > <Text fontSize={"sm"}>{item.tvInfo.showType}</Text> </Box> <Box borderRadius={"md"} backgroundColor="rgba(0, 0, 0, 0.57)" backdropFilter="blur(10px)" WebkitBackdropFilter="blur(10px)" px={2} > <Text fontSize={"sm"}>{item.tvInfo.duration}</Text> </Box> <HStack borderRadius={"md"} backgroundColor="rgba(0, 0, 0, 0.57)" backdropFilter="blur(10px)" WebkitBackdropFilter="blur(10px)" px={2} > <BsCameraVideoFill /> <Text fontSize={"sm"}>{item.tvInfo.sub}</Text> </HStack> </HStack> */}{" "}
          </Box>
        ))}
      </Box>
    </Stack>
  );
}
