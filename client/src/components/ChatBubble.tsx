import React from "react";
import { Box } from "@chakra-ui/react";

export default function ChatBubble({ message }: { message: any }) {
  return (
    <Box
      borderRadius="5px"
      px={2}
      py={1}
      bg={message.fromMe ? "blue.500" : "green.500"}
      color="white"
    >
      {message.text}
    </Box>
  );
}
