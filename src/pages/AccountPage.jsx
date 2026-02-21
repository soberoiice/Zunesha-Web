import { Box, Button, HStack, Icon, Stack, Text } from "@chakra-ui/react";
import landingbg from "../assets/landing-bg.jpg";
import React, { memo, useCallback, useRef, useState } from "react";
import { FaUser } from "react-icons/fa6";
import { FaCog } from "react-icons/fa";
import SignUpForm from "../components/SignUpForm";
import SignInForm from "../components/SignInForm";
import AccountSettings from "../components/AccountSettings";
import GeneralSettings from "../components/GeneralSettings";

export default function AccountPage() {
  const tabs = [
    { title: "Account", icon: <FaUser /> },
    { title: "Settings", icon: <FaCog /> },
  ];
  const [isActive, setIsActive] = useState(tabs[0]);
  const scrollRef = useRef(null);
  const activeIndex = tabs.indexOf(isActive);

  const handleclick = (option) => {
    setIsActive(tabs.indexOf(option));
    scroll(option.title === "Account" ? "left" : "right");
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
  const TabButton = memo(({ children, title }) => (
    <Button
      position="relative"
      bg="transparent"
      borderRadius={0}
      h="50px"
      w={"100px"}
      onClick={() => handleclick(title)}
      flex={1}
    >
      {children}
    </Button>
  ));
  return (
    <Box height={"100vh"} w={'100%'}>
      <Box
        backgroundImage={`url(${landingbg})`}
        w={"100%"}
        h={"200px"}
        backgroundSize={"cover"}
        // position={"fixed"}
      >
        <Box
          h={"100%"}
          w={"100%"}
          backdropFilter="blur(10px)"
          color={"white"}
          zIndex={2}
        >
          <Text>Account</Text>
        </Box>
      </Box>
      <Box mx="auto" mt="10px" position={"relative"} w={"200px"}>
        <Stack direction="row" gap={1} w={"100%"}>
          {tabs.map((tab) => (
            <TabButton key={tab.title} title={tab}>
              {tab.icon}
            </TabButton>
          ))}
        </Stack>

        <Box
          position="absolute"
          bottom="0"
          left="0"
          h="3px"
          w="50%"
          bg="#32a88b"
          transform={`translateX(${isActive * 100}px)`}
          transition="transform 0.3s ease"
        ></Box>
      </Box>

      <Box
        w={{ md: "90%", base: "90%" }}
        mt={'30px'}
        ref={scrollRef}
        display="flex"
        overflowX="hidden"
        scrollbarWidth={"none"}
        alignItems={"center"}
        overflowY={"hidden"}
        mx={'auto'}
      >
        <Box minW="100%">
          <AccountSettings />
        </Box>

        <Box minW="100%">
          <GeneralSettings />
        </Box>
      </Box>
    </Box>
  );
}
