import {
  Avatar,
  Button,
  CloseButton,
  Drawer,
  HStack,
  IconButton,
  Image,
  Portal,
  Text,
} from "@chakra-ui/react";
import React, { memo } from "react";
import { TiThMenu } from "react-icons/ti";
import AuthDialog from "./AuthDialog";
import Zunisha from "../assets/Zunisha.png";
import { Link, useNavigate } from "react-router";
import { FaCog, FaHeart, FaHome, FaRandom, FaSearch } from "react-icons/fa";
import { useAnime } from "../Contexts/AnimeProvider";

const MenuBtn = memo(({ icon, title, handleClick }) => (
  <HStack
    fontSize={"lg"}
    w={"95%"}
    h={"60px"}
    gap={5}
    _hover={{
      transform: "translateY(-7%)",
    }}
    transition={"transform 0.3s ease"}
    cursor={"pointer"}
    onClick={handleClick}
  >
    <Text color={"rgba(161, 161, 161, 1)"}>{icon}</Text>
    {title}
  </HStack>
));
export default function NavMenu() {
  const { setSearchTerm } = useAnime();
  const nav = useNavigate();
  return (
    <Drawer.Root placement={"start"}>
      <Drawer.Trigger asChild>
        <Button
          variant="outline"
          size="xs"
          bg={"transparent"}
          color={"white"}
          borderWidth={"0"}
        >
          <TiThMenu />
        </Button>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop backdropFilter={"blur(10px)"} />
        <Drawer.Positioner>
          <Drawer.Content w={"250px"} bg={"black"} color={"white"}>
            <Drawer.Header>
              <HStack
                gap={2}
                onClick={() => {
                  nav("/home");
                }}
                cursor={"pointer"}
              >
                <Image
                  boxShadow="0 0 50px #32a88b57"
                  src={Zunisha}
                  width={"45px"}
                  borderRadius={"4xl"}
                />
                <Text
                  color={"#32a88b"}
                  fontSize={"2xl"}
                  fontWeight={"bold"}
                  textAlign={"left"}
                >
                  Zunisha
                </Text>
              </HStack>
            </Drawer.Header>
            <Drawer.Body>
              <MenuBtn
                title={"Home"}
                icon={<FaHome />}
                handleClick={() => nav("/home")}
              />
              <MenuBtn
                title={"Search"}
                icon={<FaSearch />}
                handleClick={() => nav("/search")}
              />
              <MenuBtn
                title={"Random"}
                icon={<FaRandom />}
                handleClick={() => nav("/random")}
              />
              <MenuBtn
                title={"Support"}
                icon={<FaHeart />}
                handleClick={() => nav("/signup")}
              />
            </Drawer.Body>
            <Drawer.Footer>
              <IconButton
                onClick={() => nav("/settings")}
                backgroundColor={"transparent"}
              >
                <FaCog />
              </IconButton>
              <Avatar.Root colorPalette={"grey"} cursor={"pointer"}>
                <Avatar.Fallback onClick={() => nav("/signup")} />
              </Avatar.Root>
            </Drawer.Footer>
            <Drawer.CloseTrigger
              asChild
              _hover={{
                color: "white",
                backgroundColor: "transparent",
              }}
            >
              <CloseButton size="sm" color={"white"} />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
}
