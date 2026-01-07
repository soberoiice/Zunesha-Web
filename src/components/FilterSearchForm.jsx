import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  Portal,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { memo, useEffect, useState } from "react";
import { FaFilter, FaSearch, FaTrash } from "react-icons/fa";
import { LuChevronsUpDown, LuSearch } from "react-icons/lu";
import { useNavigate } from "react-router";
import { useAnime } from "../Contexts/AnimeProvider";

export default function FilterSearchForm({
  params,
  setParams,
  submitFilter,
  page,
}) {
  const { searchTerm, setSearchTerm, getFilterdAnime } = useAnime();
  const [query, setQuery] = useState("");
  const [tempParams, setTempParams] = useState({
    type: { value: "any", visible: false, label: "Any" },
    status: { value: "any", visible: false, label: "Any" },
    genre: { value: [] },
    season: { value: "any", visible: false, label: "Any" },
    rating: { value: "any", visible: false, label: "Any" },
  });
  const type = [
    { label: "Any", value: "any" },
    { label: "Movie", value: "1" },
    { label: "Special", value: "5" },
    { label: "OVA", value: "3" },
    { label: "ONA", value: "ona" },
    { label: "TV", value: "2" },
    { label: "Music", value: "music" },
  ];

  const status = [
    { label: "Any", value: "any" },
    { label: "Finished", value: "1" },
    { label: "Currently Airing", value: "2" },
  ];

  const genres = [
    "action",
    "adventure",
    "cars",
    "comedy",
    "dementia",
    "demons",
    "drama",
    "ecchi",
    "fantasy",
    "game",
    "harem",
    "historical",
    "horror",
    "isekai",
    "josei",
    "kids",
    "magic",
    "martial-arts",
    "mecha",
    "military",
    "music",
    "mystery",
    "parody",
    "police",
    "psychological",
    "romance",
    "samurai",
    "school",
    "sci-fi",
    "seinen",
    "shoujo",
    "shoujo-ai",
    "shounen",
    "shounen-ai",
    "slice-of-life",
    "space",
    "sports",
    "super-power",
    "supernatural",
    "thriller",
    "vampire",
  ];
  const rating = [
    { label: "Any", value: "any" },
    { label: "G", value: "1" },
    { label: "PG", value: "2" },
    { label: "PG-13", value: "3" },
    { label: "R", value: "4" },
    { label: "R+", value: "5" },
    { label: "Rx", value: "6" },
  ];

  const season = [
    { label: "Any", value: "any" },
    { label: "Winter", value: "winter" },
    { label: "Spring", value: "spring" },
    { label: "Summer", value: "summer" },
    { label: "Fall", value: "fall" },
  ];

  const nav = useNavigate();

  useEffect(() => {
    setQuery(searchTerm);
  }, []);

  const handleSubmit = () => {
    setSearchTerm(query);
    setParams(tempParams);
    console.log("temp params", tempParams);
    // getFilterdAnime(searchTerm, page, params);
    // setQuery("");
  };
  function handleAddGenre(g) {
    setTempParams((prev) => {
      const exists = isInGenreList(g);

      const nextValue = exists
        ? prev.genre.value.filter((item) => item !== g)
        : [...prev.genre.value, g];

      return {
        ...prev,
        genre: {
          value: nextValue,
        },
      };
    });
    console.log(params.genre.value);
  }
  function isInGenreList(g) {
    return tempParams.genre.value.includes(g);
  }
  const ItemFilter = memo(({ list, title }) => (
    <Stack w={{ lg: "10%", base: "45%" }} height={"100px"}>
      <Heading h={"30px"}>{title}</Heading>
      <Box w={"100%"} height={"50px"} position={"relative"}>
        <Box
          h={"100%"}
          borderRadius={"xl"}
          px={5}
          w={"100%"}
          display={"flex"}
          alignItems={"center"}
          backgroundColor={"#16161688"}
          justifyContent={"space-between"}
          onClick={() =>
            setTempParams((prev) => ({
              ...prev,
              [title]: {
                value: "any",
                visible: !prev[title]?.visible,
                label: "Any",
              },
            }))
          }
        >
          {tempParams[title]?.label || "Any"}

          <LuChevronsUpDown />
        </Box>
        <Box
          backgroundColor={"#16161688"}
          position={"absolute"}
          height={tempParams[title]?.visible ? "150px" : "0px"}
          overflowY={"scroll"}
          borderRadius={"xl"}
          px={"5"}
          w={"100%"}
          top={"50px"}
          left={0}
          display={tempParams[title]?.visible ? "flex" : "none"}
          flexDir={"column"}
          gap={2}
          overflowX={"hidden"}
          py={"2"}
          scrollbarColor={"#32a88b "}
          transition="transform 0.3s ease"
        >
          {list.map((item, index) => (
            <Box
              onClick={() =>
                setTempParams((prev) => ({
                  ...prev,
                  [title]: {
                    value: item.value ?? "any",
                    visible: !prev[title]?.visible,
                    label: item.label,
                  },
                }))
              }
              cursor={"pointer"}
            >
              {item.label}
              {index + 1 != list.length && (
                <Box w={"100%"} h={"1px"} backgroundColor={"#ffffff54"}></Box>
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </Stack>
  ));
  return (
    <Box w={"95%"} h={"100%"} mx={"auto"}>
      <Stack
        w={"100%"}
        mt={"80px"}
        justifyContent={"space-between"}
        flexDir={"row"}
        marginBottom={"20px"}
      >
        <Heading display="flex" alignItems="center" gap={2} fontSize="2xl">
          <FaSearch />
          {searchTerm != " " ? (
            <HStack>
              <Text> Search results for</Text>{" "}
              <Text color={"#32a88b"}> {searchTerm}</Text>
            </HStack>
          ) : (
            <Text> Search Something</Text>
          )}
        </Heading>
      </Stack>
      <HStack w={"100%"} display={"flex"}>
        <Box style={{ width: "100%" }}>
          <InputGroup
            endElement={
              <IconButton
                backgroundColor={"transparent"}
                marginRight={0}
                type="submit"
              >
                <LuSearch color={"#c9c9c9ff"} />
              </IconButton>
            }
            w={"100%"}
          >
            <Input
              placeholder={"Search"}
              focusRing={"none"}
              border={"none"}
              backgroundColor={"#16161688"}
              borderRadius={"2xl"}
              onChange={(e) => setQuery(e.target.value)}
              color={"white"}
              backdropFilter="blur(10px)"
              WebkitBackdropFilter="blur(10px)"
              _placeholder={{
                color: "#c9c9c9ff",
              }}
              w={"100%"}
              h={"50px"}
              value={query}
              px={5}
            />
          </InputGroup>
        </Box>
        <Button
          w={"7%"}
          borderRadius={"xl"}
          backgroundColor={"#16161688"}
          backdropFilter="blur(10px)"
          h={"50px"}
          onClick={() => setQuery("")}
        >
          <FaTrash color={"#c9c9c9ff"} />
        </Button>
        <Button
          w={"7%"}
          borderRadius={"xl"}
          backgroundColor={"#16161688"}
          backdropFilter="blur(10px)"
          h={"50px"}
          onClick={() => {
            handleSubmit();
          }}
        >
          <FaSearch color={"#c9c9c9ff"} />
        </Button>
      </HStack>
      <Stack
        flexDir={"row"}
        flexWrap={"wrap"}
        mt={"20px"}
        w={"100%"}
        mx={"auto"}
        justifyContent={"space-between"}
      >
        <ItemFilter title={"type"} list={type} />
        <ItemFilter title={"status"} list={status} />
        <ItemFilter title={"rating"} list={rating} />
        <ItemFilter title={"season"} list={season} />
        <Box w={{ lg: "55%", base: "100%" }}>
          <Heading>Genres</Heading>
          <Stack
            flexWrap={"wrap"}
            flexDir={"row"}
            overflowY={"scroll"}
            h={"100px"}
          >
            {genres.map((genre) => (
              <Box
                borderRadius={"lg"}
                borderWidth={"1px"}
                borderColor={isInGenreList(genre) ? "#32a88b" : "transparent"}
                backgroundColor={"#16161688"}
                px={2}
                cursor={"pointer"}
                onClick={() => handleAddGenre(genre)}
                key={genre}
                color={isInGenreList(genre) ? "#32a88b" : "white"}
              >
                {genre}
              </Box>
            ))}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
