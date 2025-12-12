import { Box, Center, Spinner } from "@chakra-ui/react";
import React from "react";

export default function Loader() {
  return (
    <Box height={"100%"} backgroundColor={"black"}>
      <Center minH="100vh">
        <Spinner size="xl" color="teal.400" />
      </Center>
    </Box>
  );
}
