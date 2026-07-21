import { Box, HStack, Text } from "@chakra-ui/react";
import React, { useState, useEffect, useRef } from "react";
import { useAnime } from "../Contexts/AnimeProvider";

export default function EpisodeCountdown({ animeId, place }) {
  const { getAnimeEpisodeSchedule, episodeSchedule } = useAnime();

  const [countdown, setCountdown] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  const targetTimeRef = useRef(null);

  useEffect(() => {
    if (animeId) {
      getAnimeEpisodeSchedule(animeId);
    }
  }, [animeId]);

  function getCountdownFromTargetTime(targetTime) {
    if (!targetTime) {
      return { days: "00", hours: "00", minutes: "00", seconds: "00" };
    }

    const diffMs = targetTime - Date.now();

    if (diffMs <= 0) {
      return { days: "00", hours: "00", minutes: "00", seconds: "00" };
    }

    return {
      days: String(Math.floor(diffMs / (1000 * 60 * 60 * 24))).padStart(2, "0"),
      hours: String(Math.floor((diffMs / (1000 * 60 * 60)) % 24)).padStart(
        2,
        "0",
      ),
      minutes: String(Math.floor((diffMs / (1000 * 60)) % 60)).padStart(2, "0"),
      seconds: String(Math.floor((diffMs / 1000) % 60)).padStart(2, "0"),
    };
  }

  useEffect(() => {
    const timeUntilAiring = episodeSchedule;

    if (typeof timeUntilAiring !== "number" || isNaN(timeUntilAiring)) {
      targetTimeRef.current = null;
      return;
    }

    targetTimeRef.current = Date.now() + timeUntilAiring * 1000;
    setCountdown(getCountdownFromTargetTime(targetTimeRef.current));
  }, [episodeSchedule]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getCountdownFromTargetTime(targetTimeRef.current));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const groups = [
    { key: "days", label: "d", value: countdown.days },
    { key: "hours", label: "h", value: countdown.hours },
    { key: "minutes", label: "m", value: countdown.minutes },
    { key: "seconds", label: "s", value: countdown.seconds },
  ];

  const digitFontSize =
    place === "details" ? { md: "30px", base: "20px" } : "auto";

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
        alignItems="center"
        gap={2}
        justify={"space-evenly"}
      >
        {groups.map((group, groupIndex) => (
          <HStack
            key={group.key}
            gap={{ md: "10", base: "5" }}
            alignItems="center"
            w
          >
            <HStack gap={0.5} alignItems="baseline">
              <Text fontWeight="bold" fontSize={digitFontSize}>
                {group.value}
              </Text>
              <Text fontWeight="bold" fontSize={digitFontSize}>
                {group.label}
              </Text>
            </HStack>

            {groupIndex < groups.length - 1 && (
              <Text fontWeight="bold" fontSize={digitFontSize} ml={1}>
                :
              </Text>
            )}
          </HStack>
        ))}
      </HStack>
    </Box>
  );
}
