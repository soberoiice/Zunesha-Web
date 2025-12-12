import { Center, Text, VStack } from "@chakra-ui/react";

export default function NotFound() {
  return (
    <Center minH="100vh" color="gray.400" backgroundColor={"black"}>
      <VStack>
        <Text fontSize={"8xl"} fontWeight={"900"} color={"#32a88b"}>
          404
        </Text>
        <Text fontWeight={"700"} fontSize={"2xl"}>
          Not Found
        </Text>
      </VStack>
    </Center>
  );
}
