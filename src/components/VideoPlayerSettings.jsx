import { Box, Button, Menu, Portal } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  FaAngleRight,
  FaClosedCaptioning,
  FaDownload,
  FaFont,
} from "react-icons/fa";
import { FaGear } from "react-icons/fa6";

export default function VideoPlayerSettings({
  subs,
  loadSubtitle,
  setFontSize,
  portalRef,
}) {
  const fontSizes = [
    { name: "Small", value: "15px" },
    { name: "Medium", value: "20px" },
    { name: "Large", value: "25px" },
    { name: "Extra Large", value: "30px" },
  ];
  const [font, setFont] = useState("20px");
  const [subtitle, setSubtitle] = useState("english");
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Box>
          <FaGear />
        </Box>
      </Menu.Trigger>
      <Portal ref={portalRef}>
        <Menu.Positioner>
          <Menu.Content bg={"black"}>
            <Menu.Item color={"white"}>
              <FaDownload />
              Download
            </Menu.Item>
            <Menu.Root positioning={{ placement: "right-start", gutter: 2 }}>
              <Menu.TriggerItem color={"white"}>
                <FaFont /> Font Size <FaAngleRight />
              </Menu.TriggerItem>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content bg={"black"}>
                    {fontSizes.map((size) => (
                      <Menu.Item
                        onClick={() => {
                          setFont(size.value);
                          setFontSize(size.value);
                        }}
                        color={"white"}
                        key={size.value}
                        value={size.value}
                        bg={
                          font === size.value
                            ? "rgba(37, 37, 37, 0.57)"
                            : "none"
                        }
                        _hover={{
                          bg: "rgba(37, 37, 37, 0.57)",
                        }}
                      >
                        {size.name}
                      </Menu.Item>
                    ))}
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
            <Menu.Root positioning={{ placement: "right-start", gutter: 2 }}>
              <Menu.TriggerItem color={"white"}>
                <FaClosedCaptioning />
                subtitles <FaAngleRight />
              </Menu.TriggerItem>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content bg={"black"}>
                    {subs.map((sub) => (
                      <Menu.Item
                        onClick={() => {
                          setSubtitle(sub.label.toLowerCase());
                          loadSubtitle(sub.src);
                        }}
                        color={"white"}
                        key={sub.src}
                        bg={
                          subtitle === sub.label.toLowerCase()
                            ? "rgba(37, 37, 37, 0.57)"
                            : "none"
                        }
                        value={sub.src}
                      >
                        {sub.label}
                      </Menu.Item>
                    ))}
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}
