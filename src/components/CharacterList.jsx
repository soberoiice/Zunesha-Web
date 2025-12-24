import { Box, HStack, IconButton, Image, Text } from "@chakra-ui/react";
import React, { useCallback, useEffect, useRef } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useAnime } from "../Contexts/AnimeProvider";

export default function CharacterList({ id }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);
  const { getAnimeCharacters, animeCharacters, loadingAnimeCharacters } =
    useAnime();

  useEffect(() => {
    if (id) {
      getAnimeCharacters(id);
      console.log(id);
    }
  }, [id]);

  if (loadingAnimeCharacters) {
    return (
      <Center minH="100%">
        <Spinner size="xl" color="teal.400" />
      </Center>
    );
  }

  if (!animeCharacters) {
    return (
      <Center minH="100vh" color="gray.400">
        No characters found.
      </Center>
    );
  }

  const scroll = useCallback((direction) => {
    if (!scrollRef.current) return;

    const { scrollLeft, clientWidth } = scrollRef.current;
    const amount =
      direction === "left"
        ? scrollLeft - clientWidth
        : scrollLeft + clientWidth;

    scrollRef.current.scrollTo({
      left: amount,
      behavior: "smooth",
    });
  }, []);

  const updateScrollButtons = useCallback(() => {
    if (!scrollRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  }, []);

  useEffect(() => {
    updateScrollButtons();
  }, [animeCharacters, updateScrollButtons]);
  return (
    <Box
      mb="50px"
      color="white"
      w="100%"
      height={{ lg: "200px" }}
      borderRadius="2xl"
      display="flex"
      flexDir={{ lg: "row", base: "column" }}
      justifyContent="space-between"
      alignItems="center"
      py="20px"
      position={"relative"}
    >
      {/* Left Arrow */}
      <IconButton
        position="absolute"
        left={0}
        top="50%"
        transform="translateY(-50%)"
        zIndex={10}
        onClick={() => scroll("left")}
        aria-label="Scroll Left"
        bg="transparent"
        _hover={{
          bgGradient: "to-r",
          gradientFrom: "rgba(0, 0, 0, 1)",
          gradientTo: "transparent",
          border: "none",
        }}
        color="white"
        height={{ lg: "200px", base: "165px" }}
        borderRadius={"none"}
        bgGradient="to-r"
        gradientFrom="rgba(0,0,0,0.8)"
        gradientTo="rgba(0, 0, 0, 0)"
        border={"none"}
      >
        <IoIosArrowBack />
      </IconButton>

      {/* Right Arrow */}
      <IconButton
        position="absolute"
        right={0}
        top="50%"
        transform="translateY(-50%)"
        zIndex={10}
        onClick={() => scroll("right")}
        aria-label="Scroll Right"
        _hover={{
          bgGradient: "linear(to-l, rgba(0, 0, 0, 1), transparent)",
        }}
        bg="transparent"
        color="white"
        height={{ lg: "200px", base: "165px" }}
        borderRadius={"none"}
        bgGradient="to-l"
        gradientFrom="rgba(0, 0, 0, 1)"
        gradientTo="rgba(0, 0, 0, 0)"
        border={"none"}
      >
        <IoIosArrowForward />
      </IconButton>
      <HStack
        ref={scrollRef}
        onScroll={updateScrollButtons}
        w="100%"
        overflowX="scroll"
        spacing={{ base: 2, lg: 5 }}
        height={{ lg: "210px", base: "165px" }}
        scrollbarWidth="none"
        gap={2}
      >
        {animeCharacters?.slice(0, 20).map((item) => (
          <Box
            key={item.character.id}
            position="relative"
            zIndex={1}
            onClick={() => nav(`/details/${item.character.id}`)}
            w={{ lg: "145px", base: "120px" }}
            cursor="pointer"
            h={{ lg: "200px", base: "165px" }}
            flex="0 0 auto"
            borderRadius="lg"
          >
            <Image
              w="100%"
              h="100%"
              borderRadius="lg"
              src={item.character.images.webp.image_url}
              mx="auto"
              loading="lazy"
              decoding="async"
            />
            <Box
              width="95%"
              position="absolute"
              borderRadius="md"
              backgroundColor="rgba(0, 0, 0, 0.57)"
              WebkitBackdropFilter="blur(10px)"
              left={1}
              bottom={1}
              px={2}
            >
              <Text truncate>{item.character.name}</Text>
            </Box>
          </Box>
        ))}
      </HStack>
    </Box>
  );
}
