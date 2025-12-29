import {
  Avatar,
  Button,
  CloseButton,
  Drawer,
  HStack,
  Image,
  Portal,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { TiThMenu } from "react-icons/ti";
import AuthDialog from "./AuthDialog";
import Zunisha from "../assets/Zunisha.png";
import { useNavigate } from "react-router";

export default function NavMenu() {
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
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content bg={"black"} color={"white"}>
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
            <Drawer.Body></Drawer.Body>
            <Drawer.Footer>
              <Avatar.Root colorPalette={"grey"} cursor={"pointer"}>
                <Avatar.Fallback onClick={() => nav("/signup")} />
              </Avatar.Root>
            </Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" color={"white"} />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
}
