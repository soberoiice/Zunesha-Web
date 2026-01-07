import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {
  FaCalendar,
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
} from "react-icons/fa";
import { useNavigate } from "react-router";
import { IoIosVideocam } from "react-icons/io";

export default function Spotlights({ data }) {
  const sliderRef = useRef();
  const nav = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(currentIndex);
    }
  }, [currentIndex]);

  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <IconButton
        onClick={onClick}
        position="absolute"
        right="20px"
        top="10%"
        transform="translateY(-50%)"
        zIndex="2"
        colorScheme="teal"
        aria-label="Next"
        backgroundColor="rgba(0, 0, 0, 0.57)"
        backdropFilter="blur(10px)"
        WebkitBackdropFilter="blur(10px)"
      >
        <FaChevronRight color="white" />
      </IconButton>
    );
  };

  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <IconButton
        onClick={onClick}
        position="absolute"
        right="80px"
        top="10%"
        transform="translateY(-50%)"
        zIndex="2"
        colorScheme="teal"
        aria-label="Previous"
        backgroundColor="rgba(0, 0, 0, 0.57)"
        backdropFilter="blur(10px)"
        WebkitBackdropFilter="blur(10px)"
      >
        <FaChevronLeft color="white" />
      </IconButton>
    );
  };
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    afterChange: (index) => {
      setCurrentIndex(index);
    },
  };
  return (
    <Box
      w="95%"
      maxW="full"
      mx="auto"
      position="relative"
      borderRadius={"xl"}
      h={{ lg: "400px", base: "300px" }}
      boxShadow="0 0 50px #32a88b57"
    >
      <Box
        w={{ lg: "50%", base: "90%", md: "70%" }}
        color="white"
        flexDir="column"
        display={{ lg: "flex" }}
        justifyContent={"center"}
        // px={4}
        zIndex="10"
        borderRadius={"xl"}
        backgroundColor="rgba(0, 0, 0, 0.57)"
        backdropFilter="blur(10px)"
        maxH={{ md: "300px", base: "120px" }}
        p={{ md: 10, base: 5 }}
        // border="3px solid #32a88b"
        gap={3}
        bottom={{ base: "60px", md: 10 }}
        left={2.5}
        position={"absolute"}
      >
        <Heading
          w={{ base: "100%", lg: "50%" }}
          fontSize="lg"
          color={"#32a88b"}
        >
          #{currentIndex + 1} Spotlight
        </Heading>
        <Heading fontSize={{ lg: "2xl", base: "lg" }} fontWeight={"bold"}>
          {data[currentIndex].title}
        </Heading>
        <Box display={{ md: "block", base: "none" }}>
          <Text lineClamp={{ md: 2, base: 1 }}>
            {data[currentIndex].description}
          </Text>
        </Box>

        <Box display={{ md: "block", base: "none" }}>
          <HStack gap={5}>
            <Text
              border="1px solid #32a88b"
              borderRadius={"lg"}
              paddingX={"2"}
              paddingY={"1"}
              color={"#32a88b"}
            >
              {data[currentIndex]?.tvInfo.showType}
            </Text>
            <HStack>
              <IoIosVideocam size={25} />
              {data[currentIndex]?.tvInfo?.episodeInfo?.sub}
            </HStack>
            <HStack>
              <FaCalendar />
              {data[currentIndex]?.tvInfo.releaseDate}
            </HStack>
            <Text
              backgroundColor="rgba(0, 0, 0, 0.19)"
              backdropFilter="blur(10px)"
              WebkitBackdropFilter="blur(10px)"
              borderRadius={"lg"}
              paddingX={"2"}
              paddingY={"1"}
            >
              {data[currentIndex]?.tvInfo.quality}
            </Text>
          </HStack>
        </Box>
      </Box>
      <HStack
        position={"absolute"}
        zIndex={10}
        bottom={{ base: "20px", md: 2 }}
        left={2.5}
        backgroundColor="rgba(0, 0, 0, 0.57)"
        backdropFilter="blur(10px)"
        h={"20px"}
        px={"5"}
        borderRadius={"md"}
      >
        {Array.from({ length: data?.length }).map((_, index) => (
          <Box
            key={index}
            borderRadius={"xs"}
            bg={
              index == currentIndex
                ? "rgba(255, 255, 255, 1)"
                : "rgba(215, 214, 214, 1)"
            }
            w={index == currentIndex ? "20px" : "7px"}
            h={1}
            transition="all 0.3s ease"
            cursor={"pointer"}
            onClick={() => setCurrentIndex(index)}
          ></Box>
        ))}
      </HStack>
      {data ? (
        <Slider {...settings} ref={sliderRef}>
          {data.map((item, index) => (
            <Stack
              flexDir={"row"}
              key={item.id}
              position="relative"
              width={"full"}
              borderRadius={"2xl"}
              // onScroll={() => setCurrentIndex(index)}
            >
              <Image
                key={item.id || index}
                src={item.poster}
                alt={item.title || "Anime poster"}
                borderRadius="xl"
                h={{ lg: "400px", base: "300px" }}
                minW={"full"}
              />
              <Box
                position="absolute"
                bottom={5}
                right={5}
                left={5}
                display={"flex"}
                flexDir={{ md: "row", base: "column-reverse" }}
                borderRadius="lg"
                p="2px"
                justifyContent={"space-between"}
                gap={2}
              ></Box>
            </Stack>
          ))}
        </Slider>
      ) : (
        <Skeleton height="400px" width="100%" />
      )}
      <HStack zIndex={11} position={"absolute"} right={2} bottom={2}>
        <Button
          colorScheme="teal"
          width={50}
          height={50}
          onClick={() => nav(`/watch/${data[currentIndex].id}/1`)}
          backgroundColor="rgba(0, 0, 0, 0.57)"
          backdropFilter="blur(10px)"
          WebkitBackdropFilter="blur(10px)"
          color={"white"}
          borderRadius={"xl"}
          _hover={{
            transform: "scale(1.1)",
          }}
        >
          <FaPlay />
        </Button>
        <Button
          colorScheme="teal"
          fontSize={"lg"}
          width={90}
          height={50}
          onClick={() => nav(`/details/${data[currentIndex].id}`)}
          borderRadius={"xl"}
          backgroundColor="rgba(255, 255, 255, 0.66)"
          backdropFilter="blur(10px)"
          WebkitBackdropFilter="blur(10px)"
          _hover={{
            transform: "scale(1.1)",
          }}
          color={"black"}
        >
          Details
        </Button>
      </HStack>
    </Box>
  );
}
