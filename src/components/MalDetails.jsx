import React, { useEffect } from "react";
import { useAnime } from "../Contexts/AnimeProvider";
import { Box, Center, HStack, Spinner, Text, VStack } from "@chakra-ui/react";
import YouTubeEmbed from "./YoutubeVideoEmbed";
import EpisodeCountdown from "./EpisodeCountdown";

export default function MalDetails({ id }) {
  const { metaData, getMetaData, loadingMetaData } = useAnime();

  useEffect(() => {
    if (id) {
      getMetaData(id);
    }
  }, [id]);
  if (loadingMetaData) {
    return (
      <Center minH="100%">
        <Spinner size="xl" color="teal.400" />
      </Center>
    );
  }

  if (!metaData || metaData.length === 0) {
    return (
      <Center minH="100vh" color="gray.400">
        No anime found.
      </Center>
    );
  }

  return (
    metaData?.studios?.length && (
      <Box
        mb={"50px"}
        color={"white"}
        w={"100%"}
        minH={"300px"}
        backdropFilter="blur(1px)"
        borderRadius={"2xl"}
        display={"flex"}
        flexDir={{ lg: "row", base: "column" }}
        justifyContent={"space-between"}
        alignItems={"center"}
        px={{ md: "20px" }}
        py={"20px"}
      >
        <Box
          w={{ lg: "50%", base: "100%" }}
          h={"90%"}
          p={10}
          display={{ md: "flex", base: "block" }}
          flexDirection={"column"}
          justifyContent={"space-between"}
          gap={5}
        >
          <HStack
            display={{ md: "flex", base: "block" }}
            alignItems={"flex-start"}
            w={"100%"}
            h={"50%"}
            gap={10}
          >
            <VStack alignItems={"flex-start"}>
              <HStack>
                <Text color={"rgba(255, 255, 255, 0.57)"} fontWeight={"bold"}>
                  Japanese:
                </Text>
                <Text>{metaData?.alternative_titles?.ja}</Text>
              </HStack>
              <HStack>
                <Text color={"rgba(255, 255, 255, 0.57)"} fontWeight={"bold"}>
                  Studios:
                </Text>
                <Text>{metaData?.studios?.map((studio) => studio.name)}</Text>
              </HStack>
              <HStack>
                <Text color={"rgba(255, 255, 255, 0.57)"} fontWeight={"bold"}>
                  Rating:
                </Text>
                <Text>{metaData?.rating}</Text>
              </HStack>
            </VStack>
            <VStack w={"45%"} h={"90%"} alignItems={"flex-start"}>
              <HStack>
                <Text color={"rgba(255, 255, 255, 0.57)"} fontWeight={"bold"}>
                  Start date:
                </Text>
                <Text>{metaData?.start_date}</Text>
              </HStack>
              <HStack>
                <Text color={"rgba(255, 255, 255, 0.57)"} fontWeight={"bold"}>
                  End date:
                </Text>
                <Text>{metaData?.end_date}</Text>
              </HStack>
              <HStack>
                <Text color={"rgba(255, 255, 255, 0.57)"} fontWeight={"bold"}>
                  Season:
                </Text>
                <Text>
                  {metaData?.start_season.season} {metaData?.start_season.year}
                </Text>
              </HStack>
            </VStack>
          </HStack>
          <EpisodeCountdown
            day={metaData?.broadcast?.day_of_the_week}
            time={metaData?.broadcast?.start_time}
          />
        </Box>

        {metaData?.videos?.length > 0 ? (
          <YouTubeEmbed url={metaData?.videos[0]?.url} />
        ) : (
          <Text>No trailer available</Text>
        )}
      </Box>
    )
  );
}
