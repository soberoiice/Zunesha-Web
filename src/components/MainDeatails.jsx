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
import { FaClosedCaptioning, FaPlay, FaStar } from "react-icons/fa";
import { FaVolumeHigh } from "react-icons/fa6";
import { MdBookmarkAdd } from "react-icons/md";
import { useNavigate } from "react-router";

export default function MainDeatails({ data }) {
  const nav = useNavigate();
  const [showMore, setShowMore] = useState(false);
  return (
    <Stack flexDir={{ md: "row", base: "column" }} w={"100%"} gap={10}>
      <Image h={"400px"} borderRadius={"lg"} w={"300px"} src={data?.poster} />
      <Box display={"flex"} flexDir={"column"} gap={5}>
        <HStack>
          <Text
            border="2px solid #32a88b"
            borderRadius={"2xl"}
            paddingX={"3"}
            paddingY={"1"}
            color={"#32a88b"}
            fontWeight={"bold"}
          >
            {data?.showType}
          </Text>
          <Text
            borderRadius={"2xl"}
            paddingX={"3"}
            paddingY={"1"}
            color={"#ffffffff"}
          >
            {data?.animeInfo?.Status}
          </Text>
        </HStack>
        <Heading fontSize={"4xl"} fontWeight={"bold"}>
          {data?.title}
        </Heading>
        <Text fontSize={"md"} color={"#32a88b"} fontWeight={"bold"}>
          {data?.japanese_title}
        </Text>
        <HStack gap={5} color={"#ffffffaf"}>
          <HStack>
            <FaStar color={"#32a88b"} /> {data?.animeInfo["MAL Score"]}
          </HStack>
          &middot;
          <HStack>
            <FaClosedCaptioning color={"#32a88b"} />{" "}
            {data?.animeInfo?.tvInfo?.sub}
          </HStack>
          &middot;
          <HStack>
            <FaVolumeHigh color={"#32a88b"} /> {data?.animeInfo?.tvInfo?.dub}
          </HStack>
        </HStack>
        <Text lineClamp={showMore ? null : 3}>{data?.animeInfo?.Overview}</Text>
        <Text
          onClick={() => {
            setShowMore(!showMore);
          }}
          color={"#32a88b"}
          fontWeight={"bold"}
          cursor={"pointer"}
          marginLeft={"auto"}
        >
          {showMore ? "- less " : "+ more"}
        </Text>
        <HStack>
          <Button
            mt={4}
            colorScheme="teal"
            height={50}
            onClick={() => nav(`/watch/${data?.id}`)}
            backgroundColor={"#32a88b"}
            boxShadow={"0 0 20px #32a88b"}
            _hover={{
              transform: "scale(1.05)",
            }}
            transition="all 0.2s ease-in-out"
            color={"white"}
            borderRadius={"xl"}
          >
            <FaPlay /> Watch now
          </Button>
          <Button
            mt={4}
            colorScheme="teal"
            w={50}
            height={50}
            onClick={() => handleclick(data.id)}
            backgroundColor="rgba(0, 0, 0, 0.57)"
            backdropFilter="blur(10px)"
            WebkitBackdropFilter="blur(10px)"
            color={"white"}
            borderRadius={"xl"}
          >
            <MdBookmarkAdd />
          </Button>
        </HStack>
      </Box>
      <Box
        background={"rgba(31, 31, 31, 0.84)"}
        backdropFilter="blur(20px)"
        height={"400px"}
        minW={"300px"}
        borderRadius={"lg"}
        padding={5}
        // border="1px solid #32a88b"
        boxShadow={"0 0 15px #32a88b63"}
        display={"flex"}
        flexDir={"column"}
        gap={5}
      >
        <Heading>Geners</Heading>
        <Stack flexDir={"row"} flexWrap={"wrap"}>
          {data?.animeInfo?.Genres.map((item) => (
            <Text
              key={item}
              border="1px solid #ffffffff"
              borderRadius={"2xl"}
              paddingX={"3"}
              paddingY={"1"}
              color={"#ffffffff"}
              fontSize={"xs"}
            >
              {item}
            </Text>
          ))}
        </Stack>
        <Text>
          <b>Duration:</b> {data?.animeInfo?.Duration}
        </Text>
        <Text>
          <b>Studio:</b> {data?.animeInfo?.Studios}
        </Text>
        <Text>
          <b>Aired:</b> {data?.animeInfo?.Aired}
        </Text>
        <Text>
          <b>Premiered:</b> {data?.animeInfo?.Premiered}
        </Text>
        <Text>
          <b>Rating:</b> {data?.animeInfo?.tvInfo?.rating}
        </Text>
      </Box>
    </Stack>
  );
}
