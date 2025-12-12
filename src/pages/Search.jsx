import { Box, Center, Spinner } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useAnime } from "../Contexts/AnimeProvider";
import Animelist from "../components/Animelist";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

export default function Search() {
  const { searchTerm } = useParams();
  const { getAnime, searchResults, loadingSearch } = useAnime();

  useEffect(() => {
    getAnime(searchTerm);
    console.log("Searching for:", searchTerm);
  }, [searchTerm]);

  if (loadingSearch) {
    return <Loader />;
  }

  if (!searchResults || searchResults.length === 0) {
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
      height={"100%"}
      backgroundColor={"black"}
    >
      <Navbar />
      <Box width={"95%"} mx={"auto"} mt={"20px"}>
        <Animelist data={searchResults} title={"Search Results"} />
      </Box>
    </Box>
  );
}
