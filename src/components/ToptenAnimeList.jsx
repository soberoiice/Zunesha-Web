import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState, useCallback, memo } from "react";
import { FaFireAlt } from "react-icons/fa";
import { FaClosedCaptioning, FaVolumeHigh } from "react-icons/fa6";
import { useNavigate } from "react-router";

const FILTERS = [
  { name: "Today", link: "today" },
  { name: "Week", link: "week" },
  { name: "Month", link: "month" },
];

function ToptenAnimeList({ data, title }) {
  const [content, setContent] = useState("today");
  const nav = useNavigate();

  const handleNavigate = useCallback(
    (id) => {
      nav(`/details/${id}`);
    },
    [nav]
  );

  return (
    <Box
      display="flex"
      flexDir="column"
      width={{ lg: "25%", base: "100%" }}
      gap={3}
      mt="60px"
      color="white"
    >
      <Stack direction="row" justify="space-between">
        <Heading display="flex" alignItems="center" gap={2}>
          <FaFireAlt />
          <Text>{title}</Text>
        </Heading>

        <HStack>
          {FILTERS.map((item) => (
            <Button
              key={item.link}
              onClick={() => setContent(item.link)}
              bg={content === item.link ? "#32a88b88" : "rgba(0, 0, 0, 0.57)"}
              boxShadow={content === item.link ? "0 0 10px #32a88bff" : "none"}
              _hover={{ transform: "scale(1.03)" }}
              transition="transform 0.15s ease"
            >
              {item.name}
            </Button>
          ))}
        </HStack>
      </Stack>
      <Box bg={"rgba(29, 29, 29, 1)"} borderRadius="lg">
        {data?.[content]?.map((item, index) => (
          <HStack
            key={item.id}
            onClick={() => handleNavigate(item.id)}
            h="100px"
            px={3}
            w={"95%"}
            mx={"auto"}
            cursor="pointer"
            borderBottomWidth={index !== data?.[content]?.length - 1 && "1px"}
            borderBottomColor={"rgba(63, 63, 63, 0.76)"}
            gap={5}
          >
            {/* <CenterBadge number={item.number} /> */}
            <Text
              color={index < 3 ? `rgba(50,168,139,${1 - index / 5})` : "white"}
              fontWeight={"bold"}
              fontSize={"2xl"}
              borderBottomWidth={index < 3 && "3px"}
              borderBottomColor={`rgba(50,168,139,${1 - index / 5})`}
            >
              {item.number}
            </Text>
            <Image
              src={item.poster}
              w="70px"
              h="80px"
              borderRadius="lg"
              loading="lazy"
              decoding="async"
              objectFit="cover"
            />

            <Box flex="1" gap={2}>
              <Text lineClamp={1}>{item.title}</Text>

              <HStack mt={1}>
                <MetaBadge
                  icon={<FaClosedCaptioning />}
                  value={item.tvInfo.sub}
                />
                <MetaBadge icon={<FaVolumeHigh />} value={item.tvInfo.dub} />
              </HStack>
            </Box>
          </HStack>
        ))}
      </Box>
    </Box>
  );
}

const CenterBadge = memo(({ number }) => (
  <Box
    w="40px"
    h="40px"
    borderRadius="full"
    bg="#32a88b"
    display="flex"
    alignItems="center"
    justifyContent="center"
  >
    <Text fontWeight="bold">{number}</Text>
  </Box>
));

const MetaBadge = memo(({ icon, value }) => (
  <HStack
    px={2}
    borderRadius="md"
    color={"rgba(50,168,139,1)"}
    borderWidth={"1px"}
    borderColor={"#32a88b"}
    fontSize="sm"
  >
    {icon}
    <Text>{value}</Text>
  </HStack>
));

export default memo(ToptenAnimeList);
