import React, { useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useContacts } from "./ContactsProvider";
import { Contact } from "./ContactsProvider";

type Conversation = {
  recipients: Contact[];
  messages: string[];
  selected: boolean;
};

type ConversationsContextValue = {
  conversations: Conversation[];
  selectedConversation: Conversation;
  selectConversationIndex: React.Dispatch<React.SetStateAction<number>>;
  createConversation: (recipients: Contact[]) => void;
};

const ConversationsContext = React.createContext<ConversationsContextValue>({
  conversations: [],
  selectedConversation: { recipients: [], messages: [], selected: false },
  selectConversationIndex: () => {},
  createConversation: () => {},
});

export function useConversations() {
  return useContext(ConversationsContext);
}

export function ConversationsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [conversations, setConversations] = useLocalStorage(
    "conversations",
    []
  );

  const [selectedConversationIndex, setSelectedConversationIndex] =
    React.useState(0);

  const { contacts } = useContacts();

  function createConversation(recipients: Contact[]) {
    setConversations((prevConversations: Conversation[]) => {
      return [...prevConversations, { recipients, messages: [] }];
    });
  }

  const formattedConversations = conversations.map(
    (conversation: Conversation, index: number) => {
      console.log("conversation", conversation);
      const recipients = conversation.recipients.map((recipient: Contact) => {
        const contact = contacts.find((contact) => {
          return contact.id === recipient.id;
        });
        const name = (contact && contact.name) || recipient;
        return { id: recipient, name };
      });

      const selected = index === selectedConversationIndex;
      return { ...conversation, recipients, selected };
    }
  );

  const value = {
    conversations: formattedConversations,
    selectedConversation: formattedConversations[selectedConversationIndex],
    selectConversationIndex: setSelectedConversationIndex,
    createConversation,
  };

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
}
