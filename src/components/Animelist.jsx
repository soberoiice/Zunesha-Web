import {
  Box,
  Heading,
  Stack,
  Text,
  Image,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useRef } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router";

export default function Animelist({ title, data, icon }) {
  const nav = useNavigate();
  const animeListScrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);

  const scroll = useCallback((direction) => {
    if (!animeListScrollRef.current) return;

    const { scrollLeft, clientWidth } = animeListScrollRef.current;
    const amount = direction === "left" ? scrollLeft - 300 : scrollLeft + 300;

    animeListScrollRef.current.scrollTo({
      left: amount,
      behavior: "smooth",
    });
  }, []);

  const updateScrollButtons = useCallback(() => {
    if (!animeListScrollRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = animeListScrollRef.current;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  }, []);

  useEffect(() => {
    updateScrollButtons();
  }, [data, updateScrollButtons]);

  return (
    <Stack color={"white"} fontWeight={"bold"}>
      <Heading display={"flex"} alignItems={"center"} gap={2} fontSize={"2xl"}>
        {icon}
        <Text>{title}</Text>
      </Heading>
      <Box position="relative" w={"98%"}>
        {/* Left Arrow */}
        {canScrollLeft && (
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
            height={"100%"}
            borderRadius={"none"}
            bgGradient="to-r"
            gradientFrom="rgba(0,0,0,0.8)"
            gradientTo="rgba(0, 0, 0, 0)"
            border={"none"}
          >
            <IoIosArrowBack />
          </IconButton>
        )}
        {/* Right Arrow */}
        {canScrollRight && (
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
            height={"100%"}
            borderRadius={"none"}
            bgGradient="to-l"
            gradientFrom="rgba(0, 0, 0, 1)"
            gradientTo="rgba(0, 0, 0, 0)"
            border={"none"}
          >
            <IoIosArrowForward />
          </IconButton>
        )}
        <HStack
          ref={animeListScrollRef}
          onScroll={updateScrollButtons}
          w="100%"
          overflowX="scroll"
          overflowY={"hidden"}
          height={"270px"}
          scrollbarWidth="none"
          gap={2}
        >
          {data?.slice(0, 15).map((item) => (
            <Box
              key={item.id}
              zIndex={1}
              onClick={() => nav(`/details/${item.id}`)}
              w={{ lg: "150px", base: "125px" }}
              cursor="pointer"
              h={"250px"}
              flex="0 0 auto"
              borderRadius="lg"
              display="flex"
              flexDir="column"
              alignItems="center"
              gap={2}
              _hover={{
                color: "#32a88b",
                transition: "0.3s",
              }}
            >
              <Image
                w="100%"
                maxH="200px"
                minH={"200px"}
                borderRadius="lg"
                src={item.main_picture?.large}
                mx="auto"
                loading="lazy"
                decoding="async"
              />
              <Box w={"100%"}>
                {item?.media_type && (
                  <HStack
                    color={"#7a7a7a"}
                    fontSize={"11px"}
                    justifyContent={"space-between"}
                  >
                    <Text lineClamp={2}>{item.media_type}</Text>
                    <Text lineClamp={2}>EP{item.num_episodes}</Text>
                  </HStack>
                )}
                <Box
                  width="95%"
                  borderRadius="md"
                  WebkitBackdropFilter="blur(10px)"
                  fontSize={"12px"}
                >
                  <Text lineClamp={2}>{item.title}</Text>
                </Box>
              </Box>
            </Box>
          ))}
        </HStack>
      </Box>
    </Stack>
  );
}
