import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { useAnime } from "../utils/AnimeProvider";
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
import axios from "axios";
import ReactPlayer from "react-player";
import Navbar from "../components/Navbar";
import HLSReactPlayer from "../components/HLSReactPlayer";
import EpisodesContainer from "../components/EpisodesContainer";
import ServerListContainer from "../components/ServerListContainer";
import MiniInfo from "../components/MiniInfo";

export default function HLSPlayer() {
  const { getAnimeEpisodes, episodes, loading, setLoading } = useAnime();
  const [currentEpisodeIndex, setCurentEpisodeIndex] = useState(0);
  const [currentEpisodeInfo, setCurentEpisodeInfo] = useState({});
  const [type, setType] = useState("sub");
  const [server, setServer] = useState("hd-2");
  const { animeid } = useParams();
  const file = currentEpisodeInfo?.streamingLink?.link?.file;
  const [videoReady, setVideoReady] = useState(false);
  const subServers = currentEpisodeInfo?.servers?.filter(
    (subs) => subs?.type.toString() === "sub"
  );
  const dubServers = currentEpisodeInfo?.servers?.filter(
    (dubs) => dubs?.type.toString() === "dub"
  );

  useEffect(() => {
    if (file) setVideoReady(true);
  }, [file]);

  useEffect(() => {
    setType("sub");
    const getAnimeEpisodeInfo = async (id) => {
      try {
        setCurentEpisodeInfo({});
        const apiUrl = import.meta.env.VITE_API_URL;
        const targetUrl = `${apiUrl}stream?id=${id}&server=${server}&type=${type}`;
        const encodedUrl = encodeURIComponent(targetUrl);
        console.log(targetUrl);
        const response = await axios.get(
          `https://corsproxy-psi.vercel.app/api/proxy?url=${encodedUrl}`
        );
        setCurentEpisodeInfo(response.data.results);
        console.log("episode data:", response.data.results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (episodes && episodes.length) {
      getAnimeEpisodeInfo(episodes[currentEpisodeIndex].id);
      console.log("current ep index", episodes[currentEpisodeIndex].id);
    }
  }, [currentEpisodeIndex, episodes, server, type]);

  useEffect(() => {
    getAnimeEpisodes(animeid);
  }, [animeid]);

  if (loading) {
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
    <Box position={"relative"} display={"flex"} flexDir={"column"} mb={"60px"}>
      <Navbar />
      <Stack
        flexDir={{ lg: "row", base: "column" }}
        justifyContent={"center"}
        gap={5}
      >
        <Box
          backgroundColor={"#333333ff"}
          width={{ lg: "70%", base: "95%" }}
          marginTop={"80px"}
          borderRadius={"lg"}
          maxH={"800px"}
        >
          <Box w={"100%"} paddingTop={0}>
            <HLSReactPlayer src={file} epInfo={currentEpisodeInfo} />
          </Box>
          <Stack
            mx={"auto"}
            width={"95%"}
            flexDir={{ md: "row", base: "column" }}
            mt={"20px"}
            mb={"20px"}
            maxH={"400px"}
          >
            <EpisodesContainer
              episodes={episodes}
              setCurentEpisodeIndex={setCurentEpisodeIndex}
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
        <MiniInfo animeId={animeid} />
      </Stack>
    </Box>
  );
}
