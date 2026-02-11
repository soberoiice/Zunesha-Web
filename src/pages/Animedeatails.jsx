import { Box, Button, Center, Stack } from "@chakra-ui/react";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import MainDeatails from "../components/MainDeatails";
import Navbar from "../components/Navbar";
import { useAnime } from "../Contexts/AnimeProvider";
import Loader from "../components/Loader";
import MalDetails from "../components/MalDetails";
import CharacterList from "../components/CharacterList";
import Animelist from "../components/Animelist";
import { FaGripLinesVertical } from "react-icons/fa";

    const TabButton = memo(({ children }) => (
      <Button
        position="relative"
        bg="transparent"
        borderRadius={0}
        h="50px"
        w={"100px"}
        onClick={() => handleclick(children)}
        flex={1}
      >
        {children}
      </Button>
    ));
export default function Animedeatails({data}) {
  const { id } = useParams();
  const { info, getAnimeDetails, loadingDetails, getMalDetails, setCurrentPage } = useAnime();
  const [isActive, setIsActive] = useState("Details");
  const scrollRef = useRef(null);

  const tabs = ["Details", "Characters"];
  const activeIndex = tabs.indexOf(isActive);

  useEffect(()=>{},[])

  const handleclick = (option) => {
    setIsActive(option);
    // console.log("Clicked:", option);
    scroll(option === "Details" ? "left" : "right");
  };
  const scroll = useCallback((direction) => {
    if (!scrollRef.current) return;

    const { scrollLeft, clientWidth } = scrollRef.current;
    const amount =
      direction === "left"
        ? scrollLeft - clientWidth
        : scrollLeft + clientWidth + 2;

    scrollRef.current.scrollTo({
      left: amount,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    // console.log("anime id", id);
    getAnimeDetails(id);
    setCurrentPage('details');
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
        loading="lazy"
        decoding="async"
        backgroundSize={"cover"}
      ></Box>
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
        <Box position="relative" w="200px" mx="auto" mt="60px">
          <Stack direction="row" spacing={0}>
            {tabs.map((tab) => (
              <TabButton key={tab}>{tab}</TabButton>
            ))}
          </Stack>

          <Box
            position="absolute"
            bottom="0"
            left="0"
            h="3px"
            w="100px"
            bg="#32a88b"
            transform={`translateX(${activeIndex * 100}%)`}
            transition="transform 0.3s ease"
            marginBottom={2}
          />
        </Box>

        <Box
          w="90%"
          ref={scrollRef}
          maxH={
            isActive === "Details" ? { lg: "400px", base: "auto" } : "250px"
          }
          display="flex"
          overflowX="hidden"
          scrollbarWidth={"none"}
          gap={2}
          alignItems={"center"}
          overflowY={"hidden"}
        >
          <Box minW="100%">
            <MalDetails animeId={info?.data?.id} id={info?.data?.malId} />
          </Box>

          <Box minW="100%">
            <CharacterList id={info?.data?.malId} />
          </Box>
        </Box>
        <Box w="90%" mb={"50px"}>
          <Animelist
            icon={<FaGripLinesVertical />}
            title={"Recomended"}
            data={info?.data?.recommended_data}
          />
        </Box>
      </Stack>
    </Stack>
  );
}
