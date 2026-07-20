import {
  Box,
  Center,
  Grid,
  Heading,
  HStack,
  IconButton,
  Image,
  Portal,
  Select,
  Stack,
  Text,
  VStack,
  createListCollection,
  Circle,
  Spinner,
} from "@chakra-ui/react";
import React, {
  Children,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router";
import { useAnime } from "../Contexts/AnimeProvider";
import Loader from "./Loader";
import { IoGrid, IoList } from "react-icons/io5";
import { TiThList } from "react-icons/ti";

export default function EpisodesList({ id, episode, setEpisode }) {
  const nav = useNavigate();
  const [page, setPage] = React.useState(1);
  const [isListView, setIsListView] = React.useState(true);
  const { episodes, getAnimeEpisodes, loadingEpisodes } = useAnime();
  console.log(
    "RENDER — loadingEpisodes:",
    loadingEpisodes,
    "episodes:",
    episodes,
  );

  const numbers = useMemo(() => {
    const length = episodes?.pagination?.last_visible_page || 0;
    const items = Array.from({ length }, (_, i) => i + 1);
    return createListCollection({
      items,
      itemToString: (item) => String(item),
      itemToValue: (item) => String(item),
    });
  }, [episodes?.pagination?.last_visible_page]);
  useEffect(() => {
    console.log("effect fired", { id, page });
    getAnimeEpisodes(id, page);
  }, [id, page]);

  if (loadingEpisodes) {
    return (
      <Stack w={"100%"} alignItems={"center"}>
        <Center height={"full"}>
          <Spinner size={"xl"} color={"#32a88b"} />
        </Center>
      </Stack>
    );
  }

  if (!episodes || episodes.length === 0) {
    return (
      <Center minH="100vh" color="gray.400">
        No anime found.
      </Center>
    );
  }
  return (
    <Stack
      color={"white"}
      fontWeight={"bold"}
      height={"600px"}
      w={"95%"}
      borderRadius={"lg"}
      alignItems={"center"}
    >
      <HStack w={"90%"} justifyContent={"space-between"}>
        <Heading
          display={"flex"}
          alignItems={"center"}
          gap={2}
          fontSize={"2xl"}
        >
          <Text>Episodes</Text>
        </Heading>
        <HStack>
          <Box onClick={() => setIsListView(!isListView)} cursor={"pointer"}>
            {isListView ? <IoList /> : <IoGrid />}
          </Box>
          <Select.Root
            size="sm"
            width="70px"
            collection={numbers}
            value={[String(page)]}
            onValueChange={(e) => setPage(Number(e.value[0]))}
          >
            <Select.HiddenSelect />
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder="Page" />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content
                  h={"100px"}
                  backgroundColor={"#000000"}
                  color={"white"}
                >
                  {numbers.items.map((num) => (
                    <Select.Item key={num} item={num}>
                      {num}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
        </HStack>
      </HStack>
      {isListView ? (
        <HStack overflowY={"Scroll"} flexDir={"column"} paddingY={5}>
          {episodes?.data?.map((ep) => (
            <HStack
              key={ep.mal_id}
              // justifyContent={"space-evenly"}
              w={"90%"}
              padding={2}
              borderRadius={"lg"}
              border={
                ep?.mal_id === episode
                  ? "1px solid #32a88b"
                  : "1px solid #333333ff"
              }
              color={ep?.mal_id === episode ? "#32a88b" : "white"}
              onClick={() => setEpisode(ep?.mal_id)}
              cursor={"pointer"}
            >
              <Box
                w={"15%"}
                h={"100%"}
                borderRadius={0}
                padding={0}
                overflow={"hidden"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                fontSize={"18px"}
              >
                <Text>{ep?.mal_id}</Text>
              </Box>
              <Box
                w={"80%"}
                h={"50px"}
                borderRadius={0}
                overflow={"hidden"}
                fontSize={"12px"}
              >
                <Text>{ep?.title}</Text>
                <Text lineClamp={2} color={"#7a7a7a"}>
                  {ep?.synopsis}
                </Text>
              </Box>
            </HStack>
          ))}
        </HStack>
      ) : (
        <Grid
          templateColumns="repeat(5, 1fr)"
          overflowY={"Scroll"}
          flexDir={"column"}
          padding={5}
          gap={5}
          w={"90%"}
        >
          {episodes?.data?.map((ep) => (
            <VStack
              key={ep.mal_id}
              justifyContent={"space-evenly"}
              padding={2}
              borderRadius={"lg"}
              border={
                ep?.mal_id === episode
                  ? "1px solid #32a88b"
                  : "1px solid #333333ff"
              }
              color={ep?.mal_id === episode ? "#32a88b" : "white"}
              onClick={() => setEpisode(ep?.mal_id)}
              cursor={"pointer"}
            >
              <Box
                borderRadius={0}
                overflow={"hidden"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                fontSize={"18px"}
              >
                <Text>{ep?.mal_id}</Text>
              </Box>
            </VStack>
          ))}
        </Grid>
      )}
    </Stack>
  );
}
