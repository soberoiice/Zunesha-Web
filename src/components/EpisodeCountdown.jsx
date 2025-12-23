import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

export default function EpisodeCountdown({ day, time }) {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  function getNextBroadcastCountdown(dayOfWeek, startTime) {
    const daysMap = {
      sunday: 0,
      monday: 1,
      tuesday: 2,
      wednesday: 3,
      thursday: 4,
      friday: 5,
      saturday: 6,
    };

    const now = new Date();
    const targetDay = daysMap[dayOfWeek.toLowerCase()];
    const [hours, minutes] = startTime.split(":").map(Number);

    let targetDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hours,
      minutes,
      0,
      0
    );

    const dayDiff = (targetDay - targetDate.getDay() + 7) % 7;
    if (dayDiff !== 0 || targetDate <= now) {
      targetDate.setDate(targetDate.getDate() + (dayDiff === 0 ? 7 : dayDiff));
    }

    const diffMs = targetDate - now;

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
      setCountdown(getNextBroadcastCountdown(day, time));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
