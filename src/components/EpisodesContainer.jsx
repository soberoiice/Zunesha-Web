import { Button, Stack, Text } from "@chakra-ui/react";
import React from "react";

export default function EpisodesContainer({
  episodes,
  setCurentEpisodeIndex,
  currentEpisodeIndex,
}) {
  return (
    <Stack
      h={"200px"}
      w={{ md: "70%", base: "100%" }}
      flexWrap={"wrap"}
      gap={2}
      alignItems={"center"}
    >
      <Stack
        flexDir={"row"}
        flexWrap={"wrap"}
        gap={2}
        overflow={"scroll"}
        maxH={"98%"}
        scrollbar={"hidden"}
      >
        {episodes.length > 0 &&
          episodes.map((ep, index) => (
            <Button
              key={ep?.id || index}
              onClick={() => setCurentEpisodeIndex(index)}
              width={"50px"}
              height={"35px"}
              backgroundColor={index == currentEpisodeIndex && "#32a88b8e"}
              bgGradient={ep.filler && "to-tr"}
              gradientFrom={"rgba(177, 77, 77, 1)"}
              gradientTo={"#387969ff"}
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
