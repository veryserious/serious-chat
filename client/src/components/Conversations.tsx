import { List, ListItem } from "@chakra-ui/react";
import { useConversations } from "../contexts/ConversationsProvider";

export default function Contacts() {
  const { conversations, selectConversationIndex } = useConversations();

  const activeStyles = {
    backgroundColor: "blue.500",
    color: "white",
  };

  return (
    <div>
      <List>
        {conversations.map((conversation, index) => {
          return (
            <ListItem
              key={index}
              onClick={() => selectConversationIndex(index)}
              sx={conversation.selected ? activeStyles : {}}
            >
              {conversation.recipients.map((r) => r.name).join(", ")}
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}
