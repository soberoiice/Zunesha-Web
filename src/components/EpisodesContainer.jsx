import {
  Box,
  Button,
  FileUploadList,
  HStack,
  IconButton,
  Input,
  InputGroup,
  Portal,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { createListCollection } from "@chakra-ui/react";
import { FaFilm } from "react-icons/fa6";

export default function EpisodesContainer({
  episodes,
  setCurentEpisodeIndex,
  currentEpisodeIndex,
}) {
  const [chunks, setChunks] = useState([]);
  const [selectedChunk, setSelectedChunk] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const splitToChunks = (array) => {
    const result = [];
    for (let i = 0; i < array.length; i += 100) {
      result.push({
        start: i,
        end: Math.min(i + 100, array.length),
      });
    }
    return result;
  };

  useEffect(() => {
    if (!episodes || episodes.length === 0) return;

    const newChunks = splitToChunks(episodes);
    setChunks(newChunks);
    setSelectedChunk(newChunks[0]);
  }, [episodes]);

  const chunkCollection = useMemo(() => {
    return createListCollection({
      items: chunks.map((c) => ({
        value: `${c.start}-${c.end}`,
        label: `${c.start + 1}-${c.end}`,
      })),
    });
  }, [chunks]);

  const visibleEpisodes = useMemo(() => {
    if (!selectedChunk) return [];

    return episodes
      .slice(selectedChunk.start, selectedChunk.end)
      .filter((ep, index) =>
        `${ep?.episode_no || index + 1}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
  }, [episodes, selectedChunk, searchTerm]);

  return (
    <Stack
      h={{ lg: "250px", base: "200px" }}
      w={{ md: "70%", base: "100%" }}
      gap={2}
    >
      <Box w={"100%"} display={"flex"} flexDir={"row"} gap={{ base: 2, md: 5 }}>
        <HStack color={"white"} fontWeight={"bold"}>
          <FaFilm />
          <Text>Episodes</Text>
        </HStack>
        <Select.Root
          collection={chunkCollection}
          size="sm"
          width="100px"
          value={
            selectedChunk ? [`${selectedChunk.start}-${selectedChunk.end}`] : []
          }
          onValueChange={(e) => {
            if (!e.value?.length) return;

            const [start, end] = e.value[0].split("-").map(Number);
            setSelectedChunk({ start, end });
          }}
        >
          <Select.HiddenSelect />
          <Select.Control>
            <Select.Trigger
              borderRadius={"2xl"}
              border={"none"}
              backgroundColor="#16161688"
              color={"white"}
              h={"40px"}
            >
              <Select.ValueText
                color={"#c9c9c9b6"}
                placeholder="Select episodes"
              />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator />
            </Select.IndicatorGroup>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content
                backgroundColor="#161616d5"
                color="white"
                h={"200px"}
              >
                {chunkCollection.items.map((item) => (
                  <Select.Item item={item} key={item.value}>
                    {item.label}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
        </Select.Root>
        <InputGroup
          // endElement={
          //   <IconButton backgroundColor="transparent" type="submit" w={"10px"}>
          //     <LuSearch color="#c9c9c9ff" />
          //   </IconButton>
          // }
          w={{ md: "200px", base: "100px" }}
        >
          <Input
            placeholder="Search episodes"
            border="none"
            backgroundColor="#16161688"
            borderRadius="2xl"
            h={"40px"}
            color="white"
            onChange={(e) => setSearchTerm(e.target.value)}
            _placeholder={{
              color: "#c9c9c9b6",
            }}
          />
        </InputGroup>
      </Box>
      <Stack
        flexDir="row"
        flexWrap="wrap"
        overflow="auto"
        // h={"200px"}
        scrollbar={"hidden"}
        gapY={2}
        justifyContent={{ base: "center", lg: "flex-start" }}
      >
        {visibleEpisodes.map((ep, index) => {
          const realIndex = selectedChunk.start + index;
          return (
            <Button
              key={ep?.id || index}
              onClick={() => setCurentEpisodeIndex(realIndex)}
              width={"8.5%"}
              // height={"35px"}
              backgroundColor={realIndex == currentEpisodeIndex && "#32a88b8e"}
              bgGradient={ep.filler && "to-tr"}
              gradientFrom={"rgba(177, 77, 77, 1)"}
              gradientTo={"#387969ff"}
              color={"white"}
              borderRadius={"lg"}
              _hover={{ transform: "scale(1.1)" }}
            >
              {ep?.episode_no || realIndex + 1}
            </Button>
          );
        })}
      </Stack>
    </Stack>
  );
}
