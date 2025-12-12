import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaClosedCaptioning, FaVolumeHigh } from "react-icons/fa6";
import { useNavigate } from "react-router";

export default function ToptenAnimeList({ data, type, title }) {
  const [content, setContent] = useState("today");
  const nav = useNavigate();
  const list = [
    { name: "Today", link: "today" },
    { name: "This Week", link: "week" },
    { name: "This Month", link: "month" },
  ];

  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      width={{ lg: "30%", base: "100%" }}
      gap={2.5}
      marginTop={"60px"}
      color={"white"}
    >
      <Stack flexDir={"row"} justifyContent={"space-between"}>
        <Heading>{title}</Heading>
        <HStack>
          {list.map((item) => (
            <Button
              onClick={() => setContent(item.link)}
              key={item.name}
              color="#fff"
              borderRadius="lg"
              backgroundColor={
                content === item.link ? "#32a88b88" : "rgba(0, 0, 0, 0.57)"
              }
              boxShadow={content === item.link ? "0 0 15px #32a88bff" : ""}
              _hover={{
                transform: "scale(1.05)",
              }}
              transition="all 0.2s ease-in-out"
            >
              {item.name}
            </Button>
          ))}
        </HStack>
      </Stack>
      {data?.[content]?.map((item) => (
        <HStack
          onClick={() => {
            nav(`details/${item.id}`);
          }}
          maxW={"100%"}
          key={item.id}
          display={"flex"}
          height={"100px"}
          backgroundColor="rgba(65, 65, 65, 0.57)"
          backdropFilter="blur(10px)"
          WebkitBackdropFilter="blur(10px)"
          px={3}
          borderRadius={"lg"}
          boxShadow={"0 0 15px rgba(65, 65, 65, 0.24)"}
        >
          <Box
            borderRadius={"4xl"}
            display={"flex"}
            backgroundColor={"#32a88b"}
            backdropFilter="blur(10px)"
            WebkitBackdropFilter="blur(10px)"
            w={"40px"}
            h={"40px"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Text fontSize={"lg"} fontWeight={"bold"}>
              {item.number}
            </Text>
          </Box>
          <Image
            width={"70px"}
            height={"80px"}
            borderRadius={"lg"}
            src={item.poster}
          />
          <Box
            display={"flex"}
            flexDir={"column"}
            width={"70%"}
            py={2}
            justifyContent={"center"}
            height={"90%"}
          >
            <Text lineClamp={2}>{item.title}</Text>
            <HStack>
              <HStack
                borderRadius={"md"}
                backgroundColor="rgba(0, 0, 0, 0.57)"
                backdropFilter="blur(10px)"
                WebkitBackdropFilter="blur(10px)"
                px={2}
              >
                <FaClosedCaptioning />
                <Text fontSize={"sm"}>{item.tvInfo.sub}</Text>
              </HStack>
              <HStack
                borderRadius={"md"}
                backgroundColor="rgba(0, 0, 0, 0.57)"
                backdropFilter="blur(10px)"
                WebkitBackdropFilter="blur(10px)"
                px={2}
              >
                <FaVolumeHigh />
                <Text fontSize={"sm"}>{item.tvInfo.dub}</Text>
              </HStack>
            </HStack>
          </Box>
        </HStack>
      ))}
    </Box>
  );
}
