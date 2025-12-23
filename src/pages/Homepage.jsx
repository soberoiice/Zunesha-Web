import { Box, Center } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Spotlights from "../components/Spotlights";
import Navbar from "../components/Navbar";
import Animelist from "../components/Animelist";
import ToptenAnimeList from "../components/ToptenAnimeList";
import { useAnime } from "../Contexts/AnimeProvider";
import Loader from "../components/Loader";
import { IoSparkles, IoTimeSharp } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import Schedule from "../components/Schedule";
import { RiFilmFill } from "react-icons/ri";

export default function Homepage() {
  const { getHomepage, homepage, loadingHomepage, getMalDetails } = useAnime();
  const { content, setContent } = useState();

  const list = ["New Episodes"];
  useEffect(() => {
    getHomepage();
  }, []);

  if (loadingHomepage) {
    return <Loader />;
  }

  if (!homepage || homepage.length === 0) {
    return (
      <Center minH="100vh" color="gray.400">
        No anime found.
      </Center>
    );
  }
  return (
    <Box
      position={"relative"}
      display={"flex"}
      flexDir={"column"}
      h={"100%"}
      backgroundColor={"black"}
      paddingBottom={"50px"}
    >
      <Navbar />
      <Box marginTop={"80px"}>
        <Spotlights data={homepage.spotlights} />
        <Box
          display={"flex"}
          flexDir={{ base: "column", lg: "row" }}
          width={"95%"}
          mx={"auto"}
          justifyContent={"space-between"}
        >
          <Box
            display={"flex"}
            flexDir={"column"}
            gap={5}
            marginTop={"60px"}
            width={{ lg: "68%", base: "100%" }}
          >
            <Animelist
              title={"Latest Episodes"}
              icon={<RiFilmFill />}
              data={homepage.latestEpisode}
            />
            <Animelist
              title={"Latest Completed"}
              icon={<IoTimeSharp />}
              data={homepage.latestCompleted}
            />
            <Animelist
              title={"Most Favorite"}
              icon={<FaStar />}
              data={homepage.mostFavorite}
            />
            <Schedule />
          </Box>
          <ToptenAnimeList data={homepage.topTen} title={"Top 10"} />
        </Box>
      </Box>
    </Box>
  );
}
