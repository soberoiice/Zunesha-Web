import { Box, Center, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAnime } from "../Contexts/AnimeProvider";
import Animelist from "../components/Animelist";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import SearchResultsList from "../components/SearchResultsList";
import PaginationComponent from "../components/Pagination";
import FilterSearchForm from "../components/FilterSearchForm";

export default function Search() {
  const { searchTerm } = useParams();
  const { getAnime, searchResults, loadingSearch } = useAnime();
  const [page, setPage] = useState(1);

  useEffect(() => {
    getAnime(searchTerm, page);
    console.log("Searching for:", searchTerm);
  }, [searchTerm, page]);

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
      paddingBottom={"50px"}
    >
      <Navbar />
      <Box width={"95%"} mx={"auto"} mt={"20px"}>
        <Box w={"100%"}>
          <SearchResultsList
            searchTerm={searchTerm}
            data={searchResults?.data}
          />
          <PaginationComponent
            totalPages={searchResults?.totalPage}
            setPage={setPage}
            page={page}
          />
        </Box>
        <Box w={{ lg: "20%", base: "100%" }}>
          <FilterSearchForm />
        </Box>
      </Box>
    </Box>
  );
}
