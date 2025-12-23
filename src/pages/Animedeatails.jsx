import { Box, Center, Stack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import MainDeatails from "../components/MainDeatails";
import Navbar from "../components/Navbar";
import { useAnime } from "../Contexts/AnimeProvider";
import Loader from "../components/Loader";
import MalDetails from "../components/MalDetails";

export default function Animedeatails() {
  const { id } = useParams();
  const { info, getAnimeDetails, loadingDetails, getMalDetails } = useAnime();

  useEffect(() => {
    console.log("anime id", id);
    getAnimeDetails(id);
  }, [id]);

  if (loadingDetails) {
    return <Loader />;
  }

  if (!info) {
    return (
      <Center minH="100vh" color="gray.400">
        No anime found.
      </Center>
    );
  }

  return (
    <Stack w={"100%"} alignItems={"center"}>
      <Box
        backgroundImage={`url(${info?.data?.poster})`}
        position={"fixed"}
        zIndex={-10}
        w={"100%"}
        h={"100vh"}
        backgroundSize={"cover"}
      ></Box>
      <Navbar />
      <Stack
        w={"100%"}
        background={"rgba(31, 31, 31, 0.84)"}
        backdropFilter="blur(20px)"
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box w={"90%"} marginTop={"120px"}>
          <MainDeatails data={info?.data} />
        </Box>
        <Box w={"90%"} marginTop={"60px"}>
          <MalDetails id={info?.data?.malId} />
        </Box>
      </Stack>
    </Stack>
  );
}
