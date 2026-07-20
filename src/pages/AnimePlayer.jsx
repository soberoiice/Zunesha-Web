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
import Loader from "../components/Loader";
import VideoPlayer from "../components/VideoPlayer";
import EpisodesList from "../components/EpisodesList";

export default function AnimePlayer() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [episode, setEpisode] = useState(1);

  return (
    <Box
      position={"relative"}
      justifyContent={"center"}
      alignItems={"center"}
      display={"flex"}
      flexDir={"column"}
      height={"100%"}
      background={"black"}
      paddingBottom={"50px"}
    >
      <Stack
        flexDir={{ lg: "row", base: "column" }}
        alignItems={{ base: "center", lg: "flex-start" }}
        justifyContent={{ lg: "center", base: "flex-start" }}
        gap={5}
        w={"98%"}
      >
        <Box
          display={"flex"}
          width={{ lg: "70%", base: "95%" }}
          gap={5}
          flexDir={"column"}
        >
          <Box
            w={"100%"}
            height={"600px"}
            borderRadius={"lg"}
            paddingTop={0}
            backgroundColor={"#333333ff"}
          >
            <VideoPlayer
              url={`https://api.yenime.net/anime/${id}/${episode}`}
            />
          </Box>
          {/* <Box
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
              maxH={"460px"}
            >
              <EpisodesContainer episodes={episodes} />
              <ServerListContainer
                setServer={setServer}
                server={server}
                subServers={subServers}
                dubServers={dubServers}
                type={type}
                setType={setType}
              />
            </Stack>
          </Box> */}
        </Box>
        {/* <MiniInfo animeId={id} /> */}
        <Box width={"30%"}>
          <EpisodesList id={id} episode={episode} setEpisode={setEpisode} />
        </Box>
      </Stack>
    </Box>
  );
}
