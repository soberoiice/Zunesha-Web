import { Box, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useAnime } from "../Contexts/AnimeProvider";

export default function EpisodeCountdown({ animeId, place }) {
  const { getAnimeEpisodeSchedule, episodeSchedule } = useAnime();

  const [countdown, setCountdown] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    if (animeId) {
      getAnimeEpisodeSchedule(animeId);
    }
  }, [animeId]);

  function getCountdownFromDateTime(dateTimeString) {
    if (!dateTimeString) {
      return { days: "00", hours: "00", minutes: "00", seconds: "00" };
    }

    const now = Date.now();

    const targetTime = new Date(
      dateTimeString.replace(" ", "T") + "Z"
    ).getTime();
    console.log("target time", targetTime);
    if (isNaN(targetTime)) {
      return { days: "00", hours: "00", minutes: "00", seconds: "00" };
    }

    const diffMs = targetTime - now;

    if (diffMs <= 0) {
      return { days: "00", hours: "00", minutes: "00", seconds: "00" };
    }
    return {
      days: String(Math.floor(diffMs / (1000 * 60 * 60 * 24))).padStart(2, "0"),
      hours: String(Math.floor((diffMs / (1000 * 60 * 60)) % 24)).padStart(
        2,
        "0"
      ),
      minutes: String(Math.floor((diffMs / (1000 * 60)) % 60)).padStart(2, "0"),
      seconds: String(Math.floor((diffMs / 1000) % 60)).padStart(2, "0"),
    };
  }

  useEffect(() => {
    if (!episodeSchedule) return;

    const interval = setInterval(() => {
      setCountdown(getCountdownFromDateTime(episodeSchedule));
    }, 1000);

    return () => clearInterval(interval);
  }, [episodeSchedule]);

  return (
    <Box>
      <Text color="rgba(255, 255, 255, 0.57)" mb={2} fontWeight="bold">
        Next episode in:
      </Text>

      <HStack
        w="100%"
        color="#32a88b"
        bg="rgba(29, 29, 29, 1)"
        borderRadius="2xl"
        h="60px"
        justifyContent="center"
        px={{ md: 5, base: 5 }}
        alignItems={"center"}
      >
        {[
          { label: "d", value: countdown.days },
          { label: "h", value: countdown.hours },
          { label: "m", value: countdown.minutes },
          { label: "s", value: countdown.seconds },
        ].map((item, index) => (
          <Stack
            flexDir="row"
            key={item.label}
            justifyContent={"space-around"}
            alignItems={"center"}
            w={"90%"}
            h={"90%"}
          >
            <HStack gap={0} alignItems={"center"} h={"100%"}>
              <Text
                fontWeight="bold"
                fontSize={
                  place === "details" ? { md: "30px", base: "20px" } : "auto"
                }
              >
                {item.value}
              </Text>
              <Text
                fontWeight="bold"
                fontSize={
                  place === "details" ? { md: "30px", base: "20px" } : "auto"
                }
              >
                {item.label}
              </Text>
            </HStack>
            {index < 3 && (
              <Text fontWeight="bold" fontSize={{ md: "30px", base: "20px" }}>
                :
              </Text>
            )}
          </Stack>
        ))}
      </HStack>
    </Box>
  );
}
