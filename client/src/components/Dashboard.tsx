import React from "react";
import Sidebar from "./Sidebar";
import OpenConversation from "./OpenConversation";
import { useConversations } from "../contexts/ConversationsProvider";
import { Flex } from "@chakra-ui/react";

export default function Dashboard({ id }: { id: string }) {
  const { selectedConversation } = useConversations();
  return (
    <Flex>
      <Sidebar id={id} />
      {selectedConversation && <OpenConversation />}
    </Flex>
  );
}
