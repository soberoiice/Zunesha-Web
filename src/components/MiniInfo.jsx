import {
  Box,
  Center,
  HStack,
  Image,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useAnime } from "../Contexts/AnimeProvider";
import { useParams } from "react-router";
import { FaStar } from "react-icons/fa";
import EpisodeCountdown from "./EpisodeCountdown";

export default function MiniInfo() {
  const { info, getAnimeDetails, loadingDetails } = useAnime();
  const { animeid } = useParams();

  useEffect(() => {
    // console.log("anime id", animeId);
    getAnimeDetails(animeid);
  }, [animeid]);

  if (loadingDetails) {
    return (
      <Box
        backgroundColor={"#333333ff"}
        width={{ lg: "20%", base: "95%" }}
        paddingX={2}
        py={5}
        marginTop={"80px"}
        borderRadius={"lg"}
        minH={"600px"}
      >
        <Center minH="100vh">
          <Spinner size="xl" color="teal.400" />
        </Center>
      </Box>
    );
  }

  if (!info || info.length === 0) {
    return (
      <Box
        backgroundColor={"#333333ff"}
        width={{ lg: "20%", base: "95%" }}
        paddingX={2}
        py={5}
        marginTop={"80px"}
        borderRadius={"lg"}
        minH={"600px"}
      >
        <Center minH="100vh" color="gray.400">
          No info.
        </Center>
      </Box>
    );
  }
  return (
    <Box
      display={{ base: "flex", lg: "block" }}
      backgroundColor={"#333333ff"}
      width={{ lg: "240px", base: "95%" }}
      paddingX={0}
      borderRadius={"xl"}
      h={{ lg: "780px" }}
      color={"white"}
      gap={2}
    >
      <Image
        w={{ lg: "100%", base: "25%" }}
        aspectRatio={2 / 3}
        borderBottomLeftRadius={{ lg: 0, base: "xl" }}
        borderTopRightRadius={{ lg: "xl", base: 0 }}
        borderTopLeftRadius={{ lg: "xl", base: "xl" }}
        src={info?.data?.poster}
      />
      {console.log(info)}
      <Box w={"90%"} mx={"auto"} mt={3}>
        <Text fontSize={"xl"} fontWeight={"bold"}>
          {info?.data?.title}
        </Text>
        <HStack>
          <Box
            fontSize={"xs"}
            borderRadius={"md"}
            borderColor={"#32a88b"}
            borderWidth={1}
            fontWeight={"bold"}
            w={10}
            color={"#32a88b"}
            display={"flex"}
            justifyContent={"center"}
          >
            {info?.data?.showType}
          </Box>
          <Text fontSize={"xs"} fontWeight={"bold"}>
            {info?.data?.animeInfo?.Status}
          </Text>
          {info?.data?.animeInfo["MAL Score"] !== "?" ? (
            <HStack>
              <FaStar color="#32a88b" /> {info?.data?.animeInfo["MAL Score"]}
            </HStack>
          ) : (
            <Text>No Rating</Text>
          )}
        </HStack>
        <EpisodeCountdown animeId={animeid} place={'videoplayer'} />
        {/* <Stack flexDir={"row"} flexWrap={"wrap"}>
          {info?.data?.animeInfo?.Genres?.map((item) => (
            <Text
              cursor={"pointer"}
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
        </Stack> */}
      </Box>
    </Box>
  );
}
