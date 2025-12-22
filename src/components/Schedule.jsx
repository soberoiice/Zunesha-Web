import { Box, Center, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { RiCalendarScheduleFill } from "react-icons/ri";

export default function Schedule() {
  return (
    <Box w={"98%"} color={"white"}>
      <Heading
        display={"flex"}
        alignItems={"center"}
        gap={2}
        fontSize={"2xl"}
        marginBottom={"10px"}
      >
        <RiCalendarScheduleFill />
        <Text>Schedule</Text>
      </Heading>
      <Box
        borderWidth={"2px"}
        borderColor={"#32a88b"}
        p={"5px"}
        bg={"rgba(29, 29, 29, 1)"}
        height={"300px"}
        borderRadius={"xl"}
      >
        <Center h={"100%"}>
          <Text fontWeight={"bold"} fontSize={"2xl"}>
            Comming Soon
          </Text>
        </Center>
      </Box>
    </Box>
  );
}
