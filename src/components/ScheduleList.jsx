import {
  Box,
  Center,
  DataListItemValue,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { useCallback } from "react";
import { useNavigate } from "react-router";

export default function ScheduleList({ data, loadingSchedule, date }) {
  const nav = useNavigate();

  const handleNavigate = useCallback(
    (id) => {
      nav(`/details/${id}`);
    },
    [nav],
  );
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
      {data[date]?.animes?.map((anime) => (
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
          onClick={() => handleNavigate(anime?.id)}
        >
          <Box textAlign={"center"} width={{ md: "10%", base: "20%" }}>
            <Text>{anime?.date}</Text>
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
            <Text>{anime?.type}</Text>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
