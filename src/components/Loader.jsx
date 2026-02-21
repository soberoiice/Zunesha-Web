import {
  Box,
  Center,
  HStack,
  Image,
  Progress,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import Zunisha from "../assets/Zunisha.png";
import { keyframes } from "@emotion/react";
// import { keyframes } from "@chakra-ui/react";

export default function Loader() {
  const pulse = keyframes`
  0% {  opacity: 1; }
  50% {  opacity: 0.5; }
  100% {  opacity: 1; }
`;

  const pulseAnimation = `${pulse} 1.5s ease-in-out infinite`;
  return (
    <Box height={"100vh"} backgroundColor={"black"}>
      <Center minH="100vh">
        <VStack alignItems="center">
          <HStack
            gap={2}
            onClick={() => nav("/home")}
            cursor="pointer"
            animation={pulseAnimation} // apply animation here
          >
            <Image
              boxShadow="0 0 50px #32a88b57"
              src={Zunisha}
              width="60px"
              borderRadius="4xl"
            />
            <Text
              color="#32a88b"
              fontSize="4xl"
              fontWeight="bold"
              textAlign="left"
            >
              ZUNESHA
            </Text>
          </HStack>
          <Progress.Root w="220px" value={null} size={'xs'}>
            <Progress.Track backgroundColor={'transparent'} borderRadius={'2xl'}>
              <Progress.Range backgroundColor={'#32a88b'} borderRadius={'2xl'}/>
            </Progress.Track>
          </Progress.Root>
        </VStack>
      </Center>
    </Box>
  );
}
