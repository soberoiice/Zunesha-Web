import { Box, Center, Image, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Spotlights from "../components/Spotlights";
import Navbar from "../components/Navbar";
import Animelist from "../components/Animelist";
import ToptenAnimeList from "../components/ToptenAnimeList";
import { useAnime } from "../Contexts/AnimeProvider";

export default function Homepage() {
  const { getHomepage, homepage, loadingHomepage } = useAnime();
  const { content, setContent } = useState();

  const list = ["New Episodes"];
  useEffect(() => {
    getHomepage();
  }, []);
  if (loadingHomepage) {
    return (
      <Center minH="100vh">
        <Spinner size="xl" color="teal.400" />
      </Center>
    );
  }

  if (!homepage || homepage.length === 0) {
    return (
      <Center minH="100vh" color="gray.400">
        No anime found.
      </Center>
    );
  }

  return (
    <Box position={"relative"} display={"flex"} flexDir={"column"}>
      <Navbar />
      <Box marginTop={"80px"}>
        <Spotlights data={homepage.spotlights} />
        <Box
          display={"flex"}
          flexDir={{ base: "column", lg: "row" }}
          width={"95%"}
          mx={"auto"}
        >
          <Animelist title={"Latest Episodes"} data={homepage.latestEpisode} />
          <ToptenAnimeList data={homepage.topTen} />
        </Box>
      </Box>
    </Box>
  );
}
