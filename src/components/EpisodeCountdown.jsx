import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useAnime } from "../Contexts/AnimeProvider";

export default function EpisodeCountdown({ day, time, animeId }) {
  const { getAnimeEpisodeSchedule, episodeSchedule, loadingEpisodeSchedule } =
    useAnime();
  useEffect(() => {
    getAnimeEpisodeSchedule(animeId);
  }, []);
  useEffect(() => {
    console.log(episodeSchedule);
  }, [episodeSchedule]);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  function getCountdownFromDateTime(dateTimeString) {
    if (!dateTimeString) {
      return {
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
      };
    }
    const now = new Date();

    const targetDate = new Date(dateTimeString.replace(" ", "T"));
    setCountdown({
      days: String(days).padStart(2, "0"),
      hours: String(hours).padStart(2, "0"),
      minutes: String(minutes).padStart(2, "0"),
      seconds: String(seconds).padStart(2, "0"),
    });

    if (isNaN(targetDate)) {
      return null;
    }

    const diffMs = targetDate - now;

    if (diffMs <= 0) {
      return {
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
      };
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
    const interval = setInterval(() => {
      setCountdown(getCountdownFromDateTime(episodeSchedule));
    }, 1000);

    return () => clearInterval(interval);
  }, [episodeSchedule]);

  return (
    <Box>
      <Text color={"rgba(255, 255, 255, 0.57)"} mb={5} fontWeight={"bold"}>
        Next episode in:
      </Text>
      <HStack
        w={"100%"}
        color={"#32a88b"}
        bg={"rgba(29, 29, 29, 1)"}
        borderRadius={"2xl"}
        h={"60px"}
        justifyContent={"space-between"}
        px={{ md: 10, base: 5 }}
      >
        <VStack lineHeight={1} gap={0}>
          <Text fontWeight={"bold"} fontSize={{ md: "30px", base: "20px" }}>
            {countdown.days}
          </Text>
          <Text fontWeight={"bold"} fontSize={{ md: "20px", base: "15px" }}>
            days
          </Text>
        </VStack>
        <Text fontWeight={"bold"} fontSize={{ md: "30px", base: "20px" }}>
          :
        </Text>
        <VStack lineHeight={1} gap={0}>
          <Text fontWeight={"bold"} fontSize={{ md: "30px", base: "20px" }}>
            {countdown.hours}
          </Text>
          <Text fontWeight={"bold"} fontSize={{ md: "20px", base: "15px" }}>
            hrs
          </Text>
        </VStack>
        <Text fontWeight={"bold"} fontSize={{ md: "30px", base: "20px" }}>
          :
        </Text>
        <VStack lineHeight={1} gap={0}>
          <Text fontWeight={"bold"} fontSize={{ md: "30px", base: "20px" }}>
            {countdown.minutes}
          </Text>
          <Text fontWeight={"bold"} fontSize={{ md: "20px", base: "15px" }}>
            mins
          </Text>
        </VStack>
        <Text fontWeight={"bold"} fontSize={{ md: "30px", base: "20px" }}>
          :
        </Text>
        <VStack lineHeight={1} gap={0}>
          <Text fontWeight={"bold"} fontSize={{ md: "30px", base: "20px" }}>
            {countdown.seconds}
          </Text>
          <Text fontWeight={"bold"} fontSize={{ md: "20px", base: "15px" }}>
            secs
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
}
