import React, { memo, useCallback, useRef, useState } from "react";
import SignUpForm from "../components/SignUpForm";
import { Box, Button, Center, Stack } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import landingbg from "../assets/landing-bg.jpg";
import SignInForm from "../components/SignInForm";

export default function Signup() {
  const tabs = ["Sign Up", "Sign In"];
  const [isActive, setIsActive] = useState("Sign Up");
  const scrollRef = useRef(null);
  const activeIndex = tabs.indexOf(isActive);

  const handleclick = (option) => {
    setIsActive(option);
    console.log("Clicked:", option);
    scroll(option === "Sign Up" ? "left" : "right");
  };
  const scroll = useCallback((direction) => {
    if (!scrollRef.current) return;

    const { scrollLeft, clientWidth } = scrollRef.current;
    const amount =
      direction === "left"
        ? scrollLeft - clientWidth
        : scrollLeft + clientWidth;

    scrollRef.current.scrollTo({
      left: amount,
      behavior: "smooth",
    });
  }, []);
  const TabButton = memo(({ children }) => (
    <Button
      position="relative"
      bg="transparent"
      borderRadius={0}
      h="50px"
      w={"100px"}
      onClick={() => handleclick(children)}
      flex={1}
    >
      {children}
    </Button>
  ));
  return (
    <Box
      position={"relative"}
      display={"flex"}
      flexDir={"column"}
      h={"100vh"}
      bg={"rgba(0, 0, 0, 0.85)"}
      paddingBottom={"50px"}
    >
      <Box
        backgroundImage={`url(${landingbg})`}
        w={"100%"}
        h={"100vh"}
        backgroundSize={"cover"}
        position={"absolute"}
        zIndex={-1}
      ></Box>
      <Stack
        w={"100%"}
        h={"100%"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDir={"column"}
      >
        <Box mx="auto" mt="60px" position={"relative"} w={"200px"}>
          <Stack direction="row" spacing={0}>
            {tabs.map((tab) => (
              <TabButton key={tab}>{tab}</TabButton>
            ))}
          </Stack>

          <Box
            position="absolute"
            bottom="0"
            left="0"
            h="3px"
            w="100px"
            bg="#32a88b"
            transform={`translateX(${activeIndex * 100}px)`}
            transition="transform 0.3s ease"
          ></Box>
        </Box>

        <Box
          w={{md:"460px",base:'90%'}}
          ref={scrollRef}
          display="flex"
          overflowX="hidden"
          scrollbarWidth={"none"}
          alignItems={"center"}
          overflowY={"hidden"}
        >
          <Box minW="100%">
            <SignUpForm />
          </Box>

          <Box minW="100%">
            <SignInForm />
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}
