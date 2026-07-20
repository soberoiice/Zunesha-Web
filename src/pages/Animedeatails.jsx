import { Box, Button, Center, Stack } from "@chakra-ui/react";
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useParams } from "react-router";
import MainDeatails from "../components/MainDeatails";
import Navbar from "../components/Navbar";
import { useAnime } from "../Contexts/AnimeProvider";
import Loader from "../components/Loader";
import MalDetails from "../components/MalDetails";
import CharacterList from "../components/CharacterList";
import Animelist from "../components/Animelist";
import { FaGripLinesVertical } from "react-icons/fa";
import Footer from "../components/Footer";
import EpisodesList from "../components/EpisodesList";

export default function Animedeatails({ data }) {
  const [relatedList, setRelatedList] = useState([]);
  const { id } = useParams();
  const {
    info,
    getAnimeDetails,
    loadingDetails,
    getMalDetails,
    setCurrentPage,
  } = useAnime();
  const [isActive, setIsActive] = useState("Details");
  const scrollRef = useRef(null);

  const tabs = ["Details", "Characters"];
  const activeIndex = tabs.indexOf(isActive);

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
  useEffect(() => {
    console.log("anime id", id);
    getAnimeDetails(id);
    setCurrentPage("details");
  }, [id]);
  useEffect(() => {
    if (!info?.info?.related_anime) return;

    const nodes = info.info.related_anime.map((item) => item.node);
    setRelatedList(nodes);
  }, [info]);

  // const studios = details?.studios?.map((s) => s.name).join(", ");

  if (loadingDetails) {
    return (
      <Stack w={"100%"} alignItems={"center"}>
        <Box
          backgroundImage={`url(${info?.info?.data?.poster})`}
          position={"fixed"}
          zIndex={1}
          w={"100%"}
          h={"100vh"}
          loading="lazy"
          decoding="async"
          backgroundSize={"cover"}
        ></Box>
        <Loader />
      </Stack>
    );
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
        backgroundImage={`url(${info?.info?.main_picture?.large})`}
        // position={"fixed"}
        zIndex={1}
        w={"100%"}
        h={"100%"}
        loading="lazy"
        decoding="async"
        backgroundSize={"cover"}
      >
        {console.log("related:", info)}
        <Stack
          w={"100%"}
          background={"rgba(31, 31, 31, 0.84)"}
          backdropFilter="blur(20px)"
          alignItems={"center"}
          justifyContent={"center"}
          zIndex={2}
        >
          <Box w={"90%"} marginTop={"120px"}>
            {info && <MainDeatails data={info.info} />}
          </Box>
          {/* <Box w={"90%"} marginTop={"120px"}>
            {info && (
              <EpisodesList
                data={info?.episodes}
                image={info?.info?.main_picture?.large}
              />
            )}
          </Box> */}
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
              <MalDetails
                details={info.info}
                animeId={info?.info?.data?.id}
                id={info?.info?.data?.malId}
              />
            </Box>

            <Box minW="100%">
              <CharacterList
                id={info?.info?.data?.malId}
                data={info?.characters?.data}
              />
            </Box>
          </Box>
          <Box w="90%" mb={"50px"}>
            <Animelist
              icon={<FaGripLinesVertical />}
              title={"Related Anime"}
              data={relatedList}
            />
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
}
