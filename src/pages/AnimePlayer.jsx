import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  Box,
  Button,
  Center,
  HStack,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import HLSReactPlayer from "../components/HLSReactPlayer";
import EpisodesContainer from "../components/EpisodesContainer";
import ServerListContainer from "../components/ServerListContainer";
import MiniInfo from "../components/MiniInfo";
import { useAnime } from "../Contexts/AnimeProvider";

export default function HLSPlayer() {
  const {
    getAnimeEpisodes,
    episodes,
    loadingEpisodes,
    getCurrentEpisodeInfo,
    currentEpisodeInfo,
  } = useAnime();
  const [currentEpisodeIndex, setCurentEpisodeIndex] = useState(0);
  const [type, setType] = useState("sub");
  const [server, setServer] = useState("hd-2");
  const { animeid } = useParams();
  const file = currentEpisodeInfo?.streamingLink?.link?.file;
  const subServers = currentEpisodeInfo?.servers?.filter(
    (subs) => subs?.type.toString() === "sub"
  );
  const dubServers = currentEpisodeInfo?.servers?.filter(
    (dubs) => dubs?.type.toString() === "dub"
  );

  useEffect(() => {
    if (episodes && episodes.length > 0) {
      getCurrentEpisodeInfo(episodes[currentEpisodeIndex].id, server, type);
      // console.log("current ep index", episodes[currentEpisodeIndex].id);
    }
  }, [currentEpisodeIndex, episodes, server, type, loadingEpisodes]);

  useEffect(() => {
    setType("sub");
    getAnimeEpisodes(animeid);
  }, [animeid]);

  if (loadingEpisodes) {
    return (
      <Center minH="100vh">
        <Spinner size="xl" color="teal.400" />
      </Center>
    );
  }

  if (!episodes || episodes.length === 0) {
    return (
      <Center minH="100vh" color="gray.400">
        No anime found.
      </Center>
    );
  }
  return (
    <Box
      position={"relative"}
      justifyContent={"center"}
      alignItems={"center"}
      display={"flex"}
      flexDir={"column"}
      mb={"60px"}
    >
      <Navbar />
      <Stack
        flexDir={{ lg: "row", base: "column" }}
        alignItems={{ base: "center", lg: "flex-start" }}
        justifyContent={{ lg: "center", base: "flex-start" }}
        gap={5}
        marginTop={"80px"}
        w={"95%"}
      >
        <Box
          display={"flex"}
          width={{ lg: "70%", base: "95%" }}
          gap={5}
          flexDir={"column"}
        >
          <Box
            w={"100%"}
            borderRadius={"lg"}
            paddingTop={0}
            backgroundColor={"#333333ff"}
          >
            <HLSReactPlayer src={file} epInfo={currentEpisodeInfo} />
          </Box>
          <Box
            backgroundColor={"#333333ff"}
            w={"full"}
            borderRadius={"lg"}
            py={3}
            px={2}
            minH={"250px"}
          >
            <Stack
              mx={"auto"}
              width={"95%"}
              flexDir={{ md: "row", base: "column" }}
              maxH={"400px"}
            >
              <EpisodesContainer
                episodes={episodes}
                setCurentEpisodeIndex={setCurentEpisodeIndex}
                currentEpisodeIndex={currentEpisodeIndex}
              />
              <ServerListContainer
                setServer={setServer}
                server={server}
                subServers={subServers}
                dubServers={dubServers}
                type={type}
                setType={setType}
              />
            </Stack>
          </Box>
        </Box>
        <MiniInfo animeId={animeid} />
      </Stack>
    </Box>
  );
}
