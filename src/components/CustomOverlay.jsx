import {
  Box,
  Button,
  HStack,
  IconButton,
  Slider,
  Text,
} from "@chakra-ui/react";
import React from "react";
import {
  FaCamera,
  FaExpand,
  FaFastBackward,
  FaFastForward,
  FaStepBackward,
  FaStepForward,
  FaVolumeMute,
} from "react-icons/fa";
import {
  FaPlay,
  FaPause,
  FaVolumeHigh,
  FaGear,
  FaMinimize,
  FaArrowRotateRight,
  FaArrowRotateLeft,
} from "react-icons/fa6";
import VideoPlayerSettings from "./VideoPlayerSettings";
import { useAnime } from "../Contexts/AnimeProvider";

export default function CustomOverlay({
  playing,
  togglePlay,
  handleSeek,
  duration,
  currentTime,
  seeking,
  seekValue,
  setSeekValue,
  setSeeking,
  currentIndex,
  setCurrentIndex,
  isFullScreen,
  handleFullScreen,
  bufferedTime,
  subs,
  loadSubtitle,
  setFontSize,
  handleEpisodeChange,
  fontSize,
  playerRef,
  isMute,
  handleMuting,
  handleJump,
  handleScreenShot,
}) {
  const bufferedPercent = duration > 0 ? (bufferedTime / duration) * 100 : 0;
  const { episodes } = useAnime();

  const formatTime = (time) => {
    if (!time) return "00:00";

    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    const hDisplay = hours > 0 ? `${hours.toString().padStart(2, "0")}:` : "";
    const mDisplay = `${minutes.toString().padStart(2, "0")}:`;
    const sDisplay = seconds.toString().padStart(2, "0");

    return `${hDisplay}${mDisplay}${sDisplay}`;
  };

  return (
    <Box
      position="absolute"
      inset={0}
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="rgba(0,0,0,0.25)"
      pointerEvents="auto"
      transition="transform 0.3s ease"
      color={"white"}
    >
      <Box
        onClick={togglePlay}
        bg="transparent"
        pointerEvents="auto"
        fontSize={"50px"}
        borderRadius={"full"}
        cursor={"pointer"}
      >
        {playing ? <FaPause /> : <FaPlay />}
      </Box>
      <Box
        backgroundColor={"rgba(0, 0, 0, 0.47)"}
        position="absolute"
        bottom="12px"
        left="0"
        right="0"
        py={"5px"}
        px="16px"
        height={"15%"}
        display={"flex"}
        flexDir={"column"}
        w={"98%"}
        mx={"auto"}
        borderRadius={"lg"}
        justifyContent={"space-evenly"}
      >
        <Box
          display={"flex"}
          flexDir={"row"}
          justifyContent={"space-between"}
          h={"20px"}
          fontSize={"18px"}
        >
          <Text
            display={{ md: "block", base: "none" }}
            lineHeight={0.9}
            textOverflow="ellipsis"
            overflow="hidden"
            whiteSpace="nowrap"
            color="white"
            fontSize="sm"
          >
            {episodes[currentIndex]?.title}
          </Text>
          <Text lineHeight={0.9} color="white" fontSize="sm">
            {formatTime(currentTime)} / {formatTime(duration)}
          </Text>
          <Box gap={2} display={{ md: "none", base: "flex" }} flexDir={"row"}>
            <Box cursor={"pointer"}>
              <VideoPlayerSettings
                setFontSize={setFontSize}
                subs={subs}
                loadSubtitle={loadSubtitle}
              />
            </Box>
            <Box
              onClick={() => {
                handleFullScreen();
              }}
              cursor={"pointer"}
            >
              {isFullScreen ? <FaMinimize /> : <FaExpand />}
            </Box>
          </Box>
        </Box>
        <Slider.Root
          min={0}
          max={duration || 1}
          value={[seeking ? seekValue : currentTime]}
          w="100%"
          step={1}
          onValueChange={(e) => {
            setSeeking(true);
            setSeekValue(e.value);
          }}
          onValueChangeEnd={(e) => {
            handleSeek(e.value);
            setSeeking(false);
          }}
          size={"sm"}
          cursor={"pointer"}
        >
          <Slider.Control>
            <Slider.Track h="7px" bg="rgba(255, 255, 255, 0.2)">
              <Box
                position="absolute"
                left={0}
                top={0}
                h="100%"
                w={`${bufferedPercent}%`}
                borderRadius={"xl"}
                bg="rgba(255, 255, 255, 0.54)"
              />
              <Slider.Range bg="teal.400" />
            </Slider.Track>
            <Slider.Thumbs h={"10px"} />
          </Slider.Control>
        </Slider.Root>
        <Box
          display={{ md: "flex", base: "none" }}
          flexDir={"row"}
          justifyContent={"space-between"}
          fontSize={"18px"}
        >
          <HStack gap={2} h={"20px"}>
            {currentIndex > 0 && (
              <Box
                cursor={"pointer"}
                onClick={() => handleEpisodeChange("prev")}
              >
                <FaStepBackward />
              </Box>
            )}
            <Box onClick={togglePlay}>{playing ? <FaPause /> : <FaPlay />}</Box>
            {currentIndex !== episodes?.length - 1 && (
              <Box
                cursor={"pointer"}
                onClick={() => handleEpisodeChange("next")}
              >
                <FaStepForward />
              </Box>
            )}
            <Box
              onClick={() => {
                handleMuting();
              }}
              cursor={"pointer"}
            >
              {isMute ? <FaVolumeMute /> : <FaVolumeHigh />}
            </Box>
            <Box
              cursor={"pointer"}
              onClick={() => {
                handleJump("backward");
              }}
            >
              <FaArrowRotateLeft />
            </Box>
            <Box
              cursor={"pointer"}
              onClick={() => {
                handleJump("forward");
              }}
            >
              <FaArrowRotateRight />
            </Box>
          </HStack>
          <HStack>
            <Box cursor={"pointer"}>
              <VideoPlayerSettings
                setFontSize={setFontSize}
                subs={subs}
                loadSubtitle={loadSubtitle}
                portalRef={playerRef}
              />
            </Box>
            <Box
              cursor={"pointer"}
              onClick={() => {
                handleScreenShot();
              }}
            >
              <FaCamera />
            </Box>
            <Box
              onClick={() => {
                handleFullScreen();
              }}
              cursor={"pointer"}
            >
              {isFullScreen ? <FaMinimize /> : <FaExpand />}
            </Box>
          </HStack>
        </Box>
      </Box>
    </Box>
  );
}
