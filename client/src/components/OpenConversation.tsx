import React from "react";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
} from "@chakra-ui/react";
import { useConversations } from "../contexts/ConversationsProvider";
import useLocalStorage from "../hooks/useLocalStorage";
import ChatBubble from "./ChatBubble";

export default function OpenConversation() {
  const [text, setText] = React.useState("");
  const [id, setId] = useLocalStorage("id");
  const lastMessageRef =
    React.useRef() as React.MutableRefObject<HTMLDivElement>;
  const { sendMessage, selectedConversation } = useConversations();

  function handleSubmit(e) {
    e.preventDefault();
    sendMessage(
      selectedConversation.recipients.map((r) => r.id),
      id,
      text
    );
    setText("");
  }

  React.useEffect(() => {
    if (lastMessageRef.current) {
      // fix type error
      lastMessageRef.current.scrollIntoView({ smooth: true });
    }
  });

  return (
    <Flex direction="column" px={3} py={2}>
      <Box height="85vh" overflow="auto" py={4}>
        <Flex
          direction="column"
          alignContent="flex-start"
          justify="flex-end"
          px={3}
        >
          {selectedConversation.messages.map((message, index) => {
            const lastMessage =
              selectedConversation.messages.length - 1 === index;
            return (
              <Flex
                ref={lastMessage ? lastMessageRef : null}
                key={index}
                my={1}
                direction="column"
                align={message.fromMe ? "flex-end" : "flex-start"}
              >
                <ChatBubble message={message} />
                <Box
                  color="gray.400"
                  className={`small ${message.fromMe ? "text-right" : ""}`}
                >
                  {message.fromMe ? "You" : message.senderName}
                </Box>
              </Flex>
            );
          })}
        </Flex>
      </Box>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel htmlFor="message">Message</FormLabel>
          <Textarea
            id="message"
            required
            value={text}
            onChange={(e) => setText(e.target.value)}
            height={"75px"}
            resize={"none"}
          />
        </FormControl>
        <Button type="submit">Send</Button>
      </form>
    </Flex>
  );
}
