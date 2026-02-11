import { Box, Center } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAnime } from "../Contexts/AnimeProvider";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import SearchResultsList from "../components/SearchResultsList";
import PaginationComponent from "../components/Pagination";
import FilterSearchForm from "../components/FilterSearchForm";
import landingbg from "../assets/landing-bg.jpg";
import { set } from "nprogress";

export default function Search() {
  const {
    getAnime,
    searchResults,
    loadingSearch,
    searchTerm,
    getFilterdAnime,
    setCurrentPage,
  } = useAnime();
  const [page, setPage] = useState(1);
  const nav = useNavigate();
  useEffect(() => {
    getFilterdAnime(searchTerm, page);
    setCurrentPage("search");
    // console.log("Searching for:", searchTerm);
  }, [searchTerm, page]);

  if (loadingSearch) {
    return <Loader />;
  }

  if (!searchResults || searchResults.length === 0) {
    return (
      <Center minH="100vh" color="gray.400" backgroundColor={"black"}>
        Search Something
      </Center>
    );
  }

  return (
    <Box
      position={"relative"}
      display={"flex"}
      flexDir={"column"}
      // height={"100%"}
      backgroundColor={"rgba(0, 0, 0, 0.34)"}
    >
      <Box
        backgroundImage={`url(${landingbg})`}
        w={"100%"}
        h={"100vh"}
        backgroundSize={"cover"}
        position={"fixed"}
        zIndex={-1}
      ></Box>
      <Box
        h={{ lg: "350px", base: "600px" }}
        w={"100%"}
        backdropFilter="blur(10px)"
        color={"white"}
        zIndex={10}
      >
        <FilterSearchForm
          searchTerm={searchTerm}
          submitFilter={() => getFiltereAnime(searchTerm, page, params)}
          page={page}
        />
      </Box>
      <Box
        width={"100%"}
        color={"white"}
        mx={"auto"}
        backgroundColor={"rgba(0, 0, 0, 1)"}
        py={10}
        zIndex={1}
      >
        <Box w={"95%"} mx={"auto"}>
          <SearchResultsList data={searchResults?.data} />
          <PaginationComponent
            totalPages={searchResults?.totalPage}
            setPage={setPage}
            page={page}
          />
        </Box>
      </Box>
    </Box>
  );
}
