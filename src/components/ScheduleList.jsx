import { Box, Center, Spinner, Text } from "@chakra-ui/react";
import React from "react";

export default function ScheduleList({ data, loadingSchedule }) {
  if (loadingSchedule) {
    return (
      <Center minH="100%">
        <Spinner size="xl" color="teal.400" />
      </Center>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Center minH="100vh" color="gray.400">
        No anime found.
      </Center>
    );
  }

  return (
    <Box
      w={"100%"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      gap={4}
      color={"white"}
    >
      {data.map((anime) => (
        <Box
          key={anime?.id}
          display={"flex"}
          flexDir={"row"}
          bg={"rgba(29, 29, 29, 1)"}
          borderRadius={"xl"}
          w={"100%"}
          mx={"auto"}
          h={"50px"}
          alignItems={"center"}
          gap={4}
          cursor={"pointer"}
        >
          <Box textAlign={"center"} width={{ md: "10%", base: "20%" }}>
            <Text>{anime?.time}</Text>
          </Box>
          <Box
            w={"2px"}
            h={"80%"}
            backgroundColor={"rgba(0, 0, 0, 0.71)"}
          ></Box>
          <Box w={{ md: "60%", base: "40%" }} lineClamp={1}>
            <Text>{anime?.title}</Text>
          </Box>
          <Box textAlign={"center"} width={"20%"}>
            <Text>EP{anime?.episode_no}</Text>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
