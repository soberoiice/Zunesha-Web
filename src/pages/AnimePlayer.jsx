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

export default function HLSPlayer() {
  const videoRef = useRef(null);
  const { getAnimeEpisodes, episodes, loading, setLoading } = useAnime();
  const [currentEpisodeIndex, setCurentEpisodeIndex] = useState(0);
  const [currentEpisodeInfo, setCurentEpisodeInfo] = useState({});
  const [type, setType] = useState("sub");
  const [server, setServer] = useState("hd-2");
  const { id } = useParams();
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
    getAnimeEpisodes(id);
  }, [id]);

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
      <Box
        backgroundColor={"#333333ff"}
        width={{ lg: "60%", base: "95%" }}
        marginX={"auto"}
        paddingX={2}
        py={5}
        marginTop={"80px"}
        borderRadius={"lg"}
      >
        <Box w={"95%"} mx={"auto"}>
          <Text
            fontWeight={"bold"}
            color={"#32a88b"}
            fontSize={"xl"}
            mb={"10px"}
          >
            {episodes[currentEpisodeIndex]?.title}
          </Text>
          <HLSReactPlayer src={file} epInfo={currentEpisodeInfo} />
        </Box>
        <Stack
          mx={"auto"}
          width={"95%"}
          flexDir={{ md: "row", base: "column" }}
          mt={"20px"}
          maxH={"400px"}
        >
          <Stack w={{ md: "70%", base: "100%" }} flexWrap={"wrap"} gap={2}>
            <Text fontWeight={"bold"} color={"#32a88b"} fontSize={"xl"}>
              Episodes
            </Text>
            <Stack
              flexDir={"row"}
              flexWrap={"wrap"}
              gap={2}
              overflow={"scroll"}
              maxH={"340px"}
            >
              {episodes.length > 0 &&
                episodes.map((ep, index) => (
                  <Button
                    key={ep?.id || index}
                    onClick={() => setCurentEpisodeIndex(index)}
                    colorScheme="teal"
                    width={"50px"}
                    height={"35px"}
                    backgroundColor="rgba(0, 0, 0, 0.57)"
                    backdropFilter="blur(10px)"
                    WebkitBackdropFilter="blur(10px)"
                    color={"white"}
                    borderRadius={"lg"}
                  >
                    {ep?.episode_no || `Episode ${index + 1}`}
                  </Button>
                ))}
            </Stack>
          </Stack>
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
                          server == item?.serverName.toLowerCase() &&
                          type == "sub"
                            ? "rgba(255, 255, 255, 0.57)"
                            : "#00000096"
                        }
                        backdropFilter="blur(10px)"
                        WebkitBackdropFilter="blur(10px)"
                        color={
                          server == item?.serverName.toLowerCase() &&
                          type == "sub"
                            ? "rgba(0, 0, 0, 1)"
                            : "#ffffffff"
                        }
                        borderRadius={"lg"}
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
                          server == item?.serverName.toLowerCase() &&
                          type == "dub"
                            ? "rgba(243, 243, 243, 0.59)"
                            : "#000000a1"
                        }
                        backdropFilter="blur(10px)"
                        WebkitBackdropFilter="blur(10px)"
                        color={
                          server == item?.serverName.toLowerCase() &&
                          type == "dub"
                            ? "rgba(0, 0, 0, 1)"
                            : "#ffffffff"
                        }
                        borderRadius={"lg"}
                      >
                        {item?.serverName}
                      </Button>
                    ))}
                  </HStack>
                </Box>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
