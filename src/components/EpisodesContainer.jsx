import { Button, Stack, Text } from "@chakra-ui/react";
import React from "react";

export default function EpisodesContainer({ episodes, setCurentEpisodeIndex }) {
  return (
    <Stack w={{ md: "70%", base: "100%" }} flexWrap={"wrap"} gap={2}>
      <Text fontWeight={"bold"} color={"#32a88b"} fontSize={"xl"}>
        Episodes
      </Text>
      <Stack
        flexDir={"row"}
        flexWrap={"wrap"}
        gap={2}
        overflow={"scroll"}
        maxH={"340px"}
      >
        {episodes.length > 0 &&
          episodes.map((ep, index) => (
            <Button
              key={ep?.id || index}
              onClick={() => setCurentEpisodeIndex(index)}
              colorScheme="teal"
              width={"50px"}
              height={"35px"}
              backgroundColor="rgba(0, 0, 0, 0.57)"
              backdropFilter="blur(10px)"
              WebkitBackdropFilter="blur(10px)"
              color={"white"}
              borderRadius={"lg"}
              _hover={{
                transform: "scale(1.1)",
              }}
            >
              {ep?.episode_no || `Episode ${index + 1}`}
            </Button>
          ))}
      </Stack>
    </Stack>
  );
}
