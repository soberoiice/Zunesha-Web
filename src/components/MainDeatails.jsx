import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState, useMemo, memo, useCallback } from "react";
import { FaClosedCaptioning, FaPlay, FaShareAlt, FaStar } from "react-icons/fa";
import { FaVolumeHigh } from "react-icons/fa6";
import { MdBookmarkAdd } from "react-icons/md";
import { useNavigate } from "react-router";
import anilist from "../assets/anilist_logo_icon.svg";
import mal from "../assets/myanimelist_logo_icon.svg";

// Reusable Icon Button for consistent styling
const IconButton = memo(({ children, onClick, bg = "#32a88b", size = 50 }) => (
  <Button
    onClick={onClick}
    w={size}
    h={size}
    bg={bg}
    boxShadow="0 0 20px #32a88b"
    _hover={{ transform: "scale(1.05)" }}
    backdropFilter="blur(10px)"
    WebkitBackdropFilter="blur(10px)"
    color="white"
    borderRadius="xl"
    p={3}
  >
    {children}
  </Button>
));

// Memoized Overview component to prevent re-renders of the whole main component
const Overview = memo(({ text }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <>
      {/* Line clamp for short preview; shows full text when toggled */}
      <Text lineClamp={showMore ? null : 3}>{text}</Text>
      <Text
        onClick={() => setShowMore(!showMore)}
        color="#32a88b"
        fontWeight="bold"
        cursor="pointer"
        ml="auto"
      >
        {showMore ? "- less" : "+ more"}
      </Text>
    </>
  );
});

// Main component
export default function MainDetails({ data }) {
  const nav = useNavigate();

  // Memoize the genres list to avoid recalculating on each render
  const genreList = useMemo(() => {
    return data?.animeInfo?.Genres?.map((item) => (
      <Text
        key={item}
        cursor="pointer"
        border="1px solid #fff"
        borderRadius="2xl"
        px={3}
        py={1}
        fontSize="xs"
        color="#fff"
      >
        {item}
      </Text>
    ));
  }, [data?.animeInfo?.Genres]);

  // // Memoized handler to prevent recreation on each render
  // const handleBookmark = useCallback(() => {
  //   handleclick(data.id); // Replace with your bookmark function
  // }, [data?.id]);

  // const handleShare = useCallback(() => {
  //   handleclick(data.id); // Replace with your share function
  // }, [data.id]);

  return (
    <Stack
      flexDir={{ md: "row", base: "column" }}
      w="100%"
      gap={10}
      color="white"
    >
      {/* Poster Image */}
      <Image
        h="400px"
        w="300px"
        mx="auto"
        src={data?.poster}
        loading="lazy"
        decoding="async"
        objectFit="cover"
        borderRadius="lg"
      />

      <Box display="flex" flexDir="column" gap={5}>
        {/* Top Info Tags */}
        <HStack gap={5} flexWrap="wrap">
          <Text
            border="2px solid #32a88b"
            borderRadius="2xl"
            px={3}
            py={1}
            color="#32a88b"
            fontWeight="bold"
          >
            {data?.showType}
          </Text>

          <Text borderRadius="2xl" color="#fff">
            {data?.animeInfo?.Status}
          </Text>

          {data?.animeInfo["MAL Score"] !== "?" ? (
            <HStack>
              <FaStar color="#32a88b" /> {data?.animeInfo["MAL Score"]}
            </HStack>
          ) : (
            <Text>No Rating</Text>
          )}

          <HStack>
            <FaClosedCaptioning color="#32a88b" />{" "}
            {data?.animeInfo?.tvInfo?.sub}
          </HStack>

          {data?.animeInfo?.tvInfo?.dub && (
            <HStack>
              <FaVolumeHigh color="#32a88b" /> {data?.animeInfo?.tvInfo?.dub}
            </HStack>
          )}
        </HStack>

        {/* Titles */}
        <Heading fontSize="4xl" fontWeight="bold" lineHeight={1.2}>
          {data?.title}
        </Heading>
        <Text fontSize="md" color="#32a88b" fontWeight="bold">
          {data?.japanese_title}
        </Text>

        {/* Genres */}
        {genreList?.length > 0 && <HStack flexWrap="wrap">{genreList}</HStack>}

        {/* Overview Section */}
        <Overview text={data?.animeInfo?.Overview} />

        {/* Action Buttons */}
        <HStack flexWrap="wrap" gap={3}>
          <Button
            colorScheme="teal"
            height={50}
            onClick={() => nav(`/watch/${data?.id}/1`)}
            backgroundColor={"#32a88b"}
            boxShadow={"0 0 20px #32a88b"}
            _hover={{ transform: "scale(1.05)" }}
            transition="all 0.2s ease-in-out"
            color={"white"}
            borderRadius={"xl"}
          >
            <FaPlay /> Watch now
          </Button>

          <IconButton>
            <MdBookmarkAdd />
          </IconButton>

          <IconButton>
            <FaShareAlt />
          </IconButton>

          {/* External Links */}
          {data?.malId && (
            <Link
              href={`https://myanimelist.net/anime/${data?.malId}`}
              target="_blank"
            >
              <IconButton bg="rgba(0, 0, 0, 0.34)">
                <Image src={mal} filter="invert(1)" />
              </IconButton>
            </Link>
          )}

          {data?.anilistId && (
            <Link
              href={`https://anilist.co/anime/${data?.anilistId}`}
              target="_blank"
            >
              <IconButton bg="rgba(0, 0, 0, 0.34)">
                <Image src={anilist} w="50px" filter="invert(1)" />
              </IconButton>
            </Link>
          )}
        </HStack>
      </Box>
    </Stack>
  );
}
