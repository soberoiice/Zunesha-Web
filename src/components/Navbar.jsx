import {
  Avatar,
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  InputGroup,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import Zunisha from "../assets/Zunisha.png";
import { LuSearch } from "react-icons/lu";
import { useNavigate } from "react-router";
import { FaRandom } from "react-icons/fa";
import AuthDialog from "./AuthDialog";

export default function Navbar() {
  const nav = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      nav(`/search/${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
    }
  };

  return (
    <HStack
      position={"fixed"}
      zIndex={"100"}
      top={0}
      width={"full"}
      height={"60px"}
      backdropFilter="blur(10px)"
      WebkitBackdropFilter="blur(10px)"
      paddingX={{ lg: 10, base: 2 }}
      justifyContent={"space-between"}
    >
      <HStack
        gap={2}
        onClick={() => {
          nav("/");
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
          display={{ lg: "block", base: "none" }}
        >
          Zunisha
        </Text>
      </HStack>
      <HStack>
        <form onSubmit={handleSubmit}>
          <InputGroup
            endElement={
              <IconButton
                backgroundColor={"#161616ff"}
                marginRight={0}
                type="submit"
              >
                <LuSearch color={"#535353ff"} />
              </IconButton>
            }
            w={{ lg: "400px", base: "200px" }}
          >
            <Input
              placeholder="Search"
              focusRing={"none"}
              border={"none"}
              backgroundColor={"#161616ff"}
              borderRadius={"2xl"}
              onChange={(e) => setSearchTerm(e.target.value)}
              color={"white"}
            />
          </InputGroup>
        </form>
        <IconButton borderRadius={"xl"} backgroundColor={"#161616ff"}>
          <FaRandom color={"#535353ff"} />
        </IconButton>
      </HStack>
      <AuthDialog />
    </HStack>
  );
}
