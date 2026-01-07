import { Box, Center } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Animedeatails from "./Animedeatails";
import { useAnime } from "../Contexts/AnimeProvider";
import Loader from "../components/Loader";
import { useNavigate } from "react-router";

export default function RandomAnime() {
  const { getRandomAnime, info, loadingDetails } = useAnime();
  const nav = useNavigate();
  useEffect(() => {
    getRandomAnime();
  }, []);

  if (loadingDetails) {
    return <Loader />;
  }

  if (!info || info.length === 0) {
    return (
      <Center minH="100vh" color="gray.400" backgroundColor={"black"}>
        Error
      </Center>
    );
  }

  return (
    <Box height={"100vh"} bg={"black"}>
      {nav(`/details/${info.id}`)}
    </Box>
  );
}
