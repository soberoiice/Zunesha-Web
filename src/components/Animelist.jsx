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
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);

  const scroll = useCallback((direction) => {
    if (!scrollRef.current) return;

    const { scrollLeft, clientWidth } = scrollRef.current;
    const amount = direction === "left" ? scrollLeft - 300 : scrollLeft + 300;

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
  }, [data, updateScrollButtons]);

  return (
    <Stack gap={2} color={"white"}>
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
            height={{ lg: "200px", base: "165px" }}
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
            height={{ lg: "200px", base: "165px" }}
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
          ref={scrollRef}
          onScroll={updateScrollButtons}
          w="100%"
          overflowX="scroll"
          spacing={{ base: 2, lg: 5 }}
          height={{ lg: "210px", base: "165px" }}
          scrollbarWidth="none"
          gap={2}
        >
          {data?.slice(0, 10).map((item) => (
            <Box
              key={item.id}
              position="relative"
              zIndex={1}
              onClick={() => nav(`/details/${item.id}`)}
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
                src={item.poster}
                mx="auto"
                _hover={{
                  scale: 1.05,
                  transition: "0.3s",
                }}
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
                <Text truncate>{item.title}</Text>
              </Box>
            </Box>
          ))}
        </HStack>
      </Box>
    </Stack>
  );
}
