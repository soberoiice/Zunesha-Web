import {
  Avatar,
  Box,
  Button,
  CloseButton,
  Drawer,
  HStack,
  IconButton,
  Image,
  Portal,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { memo } from "react";
import { TiThMenu } from "react-icons/ti";
import AuthDialog from "./AuthDialog";
import Zunisha from "../assets/Zunisha.png";
import { Link, useNavigate } from "react-router";
import {
  FaCog,
  FaHeart,
  FaHome,
  FaNewspaper,
  FaRandom,
  FaSearch,
} from "react-icons/fa";
import { useAnime } from "../Contexts/AnimeProvider";
import { FaPerson } from "react-icons/fa6";

const MenuBtn = memo(({ icon, title, handleClick, currentPage }) => (
  <VStack
    fontSize={"sm"}
    w={"full"}
    h={"60px"}
    justifyContent={"center"}
    _hover={{
      transform: "translateY(-7%)",
    }}
    transition={"transform 0.3s ease"}
    cursor={"pointer"}
    onClick={handleClick}
    backgroundColor={
      currentPage === title.toLowerCase() ? "#32a88b1e" : "transparent"
    }
    borderRightWidth={{base:'0', md:'3px'}}
    borderColor={currentPage === title.toLowerCase() ? "#32a88b" : "transparent"}
    borderTopWidth={{base:'3px', md:'0'}}
  >
    <Text color={"rgb(255, 255, 255)"}>{icon}</Text>
    {title}
  </VStack>
));
export default function NavMenu() {
  const { setSearchTerm, setCurrentPage, currentPage } = useAnime();
  const nav = useNavigate();
  return (
    <Box
      width={"full"}
      backdropFilter="blur(10px)"
      w={{md:"80px", base:'100%'}}
      height={{base:"60px", md:'100%'}}
      backgroundColor={"rgb(0, 0, 0)"}
      color={"white"}
      display={"flex"}
      flexDir={{base:"row", md:"column"}}
      justifyContent={"space-between"}
      position={"fixed"}
      zIndex={"10"}
      bottom={{base:0}}
    >
      <Stack flexDir={{base:'row', md:'column'}} justifyContent={'center'} gap={{md:5,base:0}} w={'100%'} height={'100%'}>
        <MenuBtn
          title={"Home"}
          currentPage={currentPage}
          icon={<FaHome />}
          handleClick={() => {
            nav("/home");
            setCurrentPage("home");
          }}
        />
        <MenuBtn
          title={"Search"}
          currentPage={currentPage}
          icon={<FaSearch />}
          handleClick={() => {
            nav("/search");
            setCurrentPage("search");
          }}
        />
        <MenuBtn
          title={"Random"}
          currentPage={currentPage}
          icon={<FaRandom />}
          handleClick={() => {
            nav("/random");
            setCurrentPage("random");
          }}
        />
        <MenuBtn
          title={"News"}
          currentPage={currentPage}
          icon={<FaNewspaper />}
          handleClick={() => {
            nav("/news");
            setCurrentPage("news");
          }}
        />
      </Stack>
    </Box>
  );
}
