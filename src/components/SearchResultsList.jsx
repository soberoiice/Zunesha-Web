import {
  Box,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { memo } from "react";
import { FaFilter, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router";

// Overlay for the title on image
const TitleOverlay = memo(({ title }) => (
  <Box
    width="95%"
    position="absolute"
    bottom={1}
    left={1}
    borderRadius="md"
    backgroundColor="rgba(0, 0, 0, 0.57)"
    backdropFilter="blur(10px)"
    WebkitBackdropFilter="blur(10px)"
    px={2}
  >
    <Text lineClamp={1}>{title}</Text>
  </Box>
));

// Memoized single search result item
const SearchItem = memo(({ item, onClick, width, height }) => (
  <Box
    key={item.id}
    position="relative"
    _hover={{ boxShadow: "0 0 15px #32a88bff" }}
    onClick={onClick}
    w={width}
    h={height}
    cursor="pointer"
    zIndex={1}
    borderRadius="lg"
  >
    <Image
      w="100%"
      h="100%"
      borderRadius="lg"
      src={item.poster}
      loading="lazy"
      decoding="async"
    />
    <TitleOverlay title={item.title} />
  </Box>
));

export default function SearchResultsList({ searchTerm, data }) {
  const nav = useNavigate();

  if (!data || data.length === 0) {
    return (
      <Stack
        width="100%"
        h={"100vh"}
        mt="60px"
        color="white"
        alignItems="center"
      >
        <Text>No results found.</Text>
      </Stack>
    );
  }

  return (
    <Stack
      width={{ lg: "95%", base: "100%" }}
      mx={"auto"}
      gap={5}
      color="white"
    >
      <Box
        display={"flex"}
        flexDir={"row"}
        flexWrap={"wrap"}
        justifyContent={"center"}
        gap="5"
        w={{ lg: "100%", base: "100%" }}
      >
        {data.map((item) => (
          <SearchItem
            key={item.id}
            item={item}
            onClick={() => nav(`/details/${item.id.replace("watch/", "")}`)}
            width={"150px"}
            height={"200px"}
          />
        ))}
      </Box>
    </Stack>
  );
}
