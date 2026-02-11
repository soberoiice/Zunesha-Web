import React, { useEffect, memo } from "react";
import { useAnime } from "../Contexts/AnimeProvider";
import { Box, Center, HStack, Spinner, Text, VStack } from "@chakra-ui/react";
import YouTubeEmbed from "./YoutubeVideoEmbed";
import EpisodeCountdown from "./EpisodeCountdown";

// Small reusable info row
const InfoRow = memo(({ label, value }) => (
  <Box display={"flex"} gap={2}>
    <Text color="rgba(255, 255, 255, 0.57)" fontWeight="bold">
      {label}
    </Text>
    <Text>{value || "N/A"}</Text>
  </Box>
));

export default function MalDetails({ animeId, id }) {
  const { metaData, getMetaData, loadingMetaData } = useAnime();

  // Fetch metadata when id changes
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

  if (!metaData) {
    return (
      <Center minH="100vh" color="gray.400">
        No anime found.
      </Center>
    );
  }

  const studios = metaData?.studios?.map((s) => s.name).join(", ");

  return (
    <Box
      mt={"10px"}
      mb="50px"
      color="white"
      w="100%"
      minH="300px"
      backdropFilter="blur(1px)"
      borderRadius="2xl"
      display="flex"
      flexDir={{ lg: "row", base: "column" }}
      justifyContent="space-between"
      alignItems="center"
      px={{ md: "20px" }}
      py="20px"
    >
      {console.log(metaData)}
      {/* Left section: info + countdown */}
      <Box
        w={{ lg: "60%", base: "100%" }}
        h="90%"
        p={{ base: 5, lg: 10 }}
        display={{ md: "flex", base: "block" }}
        flexDirection="column"
        justifyContent="space-between"
        gap={5}
      >
        <HStack
          display={{ md: "flex", base: "block" }}
          w="100%"
          gap={{ md: 10 }}
        >
          <VStack alignItems="flex-start" spacing={2}>
            <InfoRow
              label="Japanese:"
              value={metaData?.alternative_titles?.ja}
            />
            <InfoRow label="Studios:" value={studios} />
            <InfoRow label="Rating:" value={metaData?.rating} />
          </VStack>
          <VStack alignItems="flex-start" spacing={2}>
            <InfoRow label="Start date:" value={metaData?.start_date} />
            <InfoRow label="End date:" value={metaData?.end_date} />
            <InfoRow
              label="Season:"
              value={`${metaData?.start_season?.season || "N/A"} ${
                metaData?.start_season?.year || ""
              }`}
            />
          </VStack>
        </HStack>

        {/* Countdown component */}
        <EpisodeCountdown
          animeId={animeId}
          place={'details'}
        />
      </Box>

      {/* Right section: trailer */}
      {metaData?.videos?.length > 0 ? (
        <YouTubeEmbed url={metaData?.videos[0]?.url} />
      ) : (
        <Text>No trailer available</Text>
      )}
    </Box>
  );
}
