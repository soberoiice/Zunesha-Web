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
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {
  FaBookOpen,
  FaCalendar,
  FaChevronLeft,
  FaChevronRight,
  FaClock,
  FaPlay,
} from "react-icons/fa";
import { useNavigate } from "react-router";

export default function Spotlights({ data }) {
  const nav = useNavigate();
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
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <Box
      w="95%"
      maxW="full"
      mx="auto"
      position="relative"
      borderRadius={"xl"}
      boxShadow="0 0 15px #32a88b"
      height={"575px"}
    >
      {data ? (
        <Slider {...settings}>
          {data.map((item, index) => (
            <Stack
              flexDir={"row"}
              key={item.id}
              position="relative"
              width={"full"}
              borderRadius={"xl"}
            >
              <Image
                key={item.id || index}
                src={item.poster}
                alt={item.title || "Anime poster"}
                borderRadius="xl"
                boxShadow="lg"
                h={"575px"}
                minW={"full"}
              />
              <Box
                position="absolute"
                bottom={5}
                right={5}
                left={5}
                display={"flex"}
                borderRadius="lg"
                p="2px"
                justifyContent={"space-between"}
              >
                <Box
                  w="50%"
                  color="white"
                  flexDir="column"
                  display={"flex"}
                  justifyContent={"center"}
                  px={4}
                  zIndex="100"
                  borderRadius={"xl"}
                  backgroundColor="rgba(0, 0, 0, 0.57)"
                  backdropFilter="blur(10px)"
                  WebkitBackdropFilter="blur(10px)"
                  maxH={"300px"}
                  p={10}
                  // border="3px solid #32a88b"
                  gap={3}
                >
                  <Heading
                    w={{ base: "100%", lg: "50%" }}
                    fontSize="lg"
                    color={"#32a88b"}
                  >
                    #{index + 1} Spotlight
                  </Heading>
                  <Heading fontSize="2xl" fontWeight={"bold"}>
                    {item.title}
                  </Heading>
                  {/* <Text lineClamp={3}>{item.description}</Text> */}
                  <HStack gap={5}>
                    <Text
                      border="1px solid #32a88b"
                      borderRadius={"lg"}
                      paddingX={"2"}
                      paddingY={"1"}
                      color={"#32a88b"}
                    >
                      {item?.tvInfo.showType}
                    </Text>
                    <HStack>
                      <FaClock />
                      {item?.tvInfo.duration}
                    </HStack>
                    <HStack>
                      <FaCalendar />
                      {item?.tvInfo.releaseDate}
                    </HStack>
                    <Text
                      backgroundColor="rgba(0, 0, 0, 0.19)"
                      backdropFilter="blur(10px)"
                      WebkitBackdropFilter="blur(10px)"
                      borderRadius={"lg"}
                      paddingX={"2"}
                      paddingY={"1"}
                    >
                      {item?.tvInfo.quality}
                    </Text>
                  </HStack>
                </Box>
                <HStack marginTop={"auto"}>
                  <Button
                    mt={4}
                    colorScheme="teal"
                    width={50}
                    height={50}
                    onClick={() => nav(`watch/${item.id}`)}
                    backgroundColor="rgba(0, 0, 0, 0.57)"
                    backdropFilter="blur(10px)"
                    WebkitBackdropFilter="blur(10px)"
                    color={"white"}
                    borderRadius={"xl"}
                  >
                    <FaPlay />
                  </Button>
                  <Button
                    mt={4}
                    colorScheme="teal"
                    fontSize={"lg"}
                    width={90}
                    height={50}
                    onClick={() => nav(`details/${item.id}`)}
                    borderRadius={"xl"}
                    backgroundColor="rgba(255, 255, 255, 0.66)"
                    backdropFilter="blur(10px)"
                    WebkitBackdropFilter="blur(10px)"
                  >
                    Details
                  </Button>
                </HStack>
              </Box>
            </Stack>
          ))}
        </Slider>
      ) : (
        <Skeleton height="500px" width="100%" />
      )}
    </Box>
  );
}
