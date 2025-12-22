import { Avatar, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import React from "react";

export default function AuthDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Avatar.Root colorPalette={"grey"} cursor={"pointer"}>
          <Avatar.Fallback />
        </Avatar.Root>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Sign In</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>Hello</Dialog.Body>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
