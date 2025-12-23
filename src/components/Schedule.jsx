import { Box, Button, Center, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { useAnime } from "../Contexts/AnimeProvider";
import ScheduleList from "./ScheduleList";
import Loader from "./Loader";

export default function Schedule() {
  const [content, setContent] = useState(0);
  const { schedule, getSchedule, loadingSchedule } = useAnime();
  useEffect(() => {
    getSchedule(getNextSevenDays()[content]?.date);
  }, [content]);
  const getNextSevenDays = () => {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      dates.push({
        date: date
          .toISOString({ year: "numeric", month: "long", day: "numeric" })
          .split("T")[0],
        month: date.toLocaleString("default", { month: "short" }),
        day: date.toLocaleString("default", { day: "2-digit" }),
        weekDay: date.toLocaleString("default", { weekday: "short" }),
      });
    }

    return dates;
  };

  return (
    <Box w={"98%"} color={"white"}>
      <Heading
        display={"flex"}
        alignItems={"center"}
        gap={2}
        fontSize={"2xl"}
        marginBottom={"20px"}
      >
        <RiCalendarScheduleFill />
        <Text>Schedule</Text>
      </Heading>
      <Box
        w={"100%"}
        display={"flex"}
        gap={2}
        marginBottom={"20px"}
        overflow={"scroll"}
        scrollBarWidth={"none"}
      >
        {getNextSevenDays().map((date, index) => (
          <Button
            onClick={() => setContent(index)}
            color="#fff"
            borderRadius="lg"
            backgroundColor={
              content === index ? "#32a88b88" : "rgba(0, 0, 0, 0.57)"
            }
            boxShadow={content === index ? "0 0 15px #32a88bff" : ""}
            _hover={{
              transform: "scale(1.05)",
            }}
            transition="all 0.2s ease-in-out"
            flexDirection={"column"}
            w={{ md: "13.5%", base: "30%" }}
            key={index}
            gap={0}
            height={"60px"}
          >
            <Text fontWeight={"bold"}>{date.weekDay}</Text>
            <Text>
              {date.month} {date.day}
            </Text>
          </Button>
        ))}
      </Box>
      <Box borderRadius={"xl"} py={"10px"} scrollBarWidth={"none"}>
        <ScheduleList data={schedule} loadingSchedule={loadingSchedule} />
      </Box>
    </Box>
  );
}
