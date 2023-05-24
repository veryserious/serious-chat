import React, { useContext, useEffect, useCallback } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useContacts } from "./ContactsProvider";
import { Contact } from "./ContactsProvider";
import { useSocket } from "./SocketProvider";

function arrayEquality(a: any[], b: any[]) {
  if (a.length !== b.length) return false;

  a.sort();
  b.sort();

  return a.every((element, index) => {
    return element === b[index];
  });
}

type Message = {
  sender: string;
  text: string;
  fromMe: boolean;
};

type Conversation = {
  recipients: Contact[];
  messages: Message[];
  selected: boolean;
};

type ConversationsContextValue = {
  conversations: Conversation[];
  selectedConversation: Conversation;
  selectConversationIndex: React.Dispatch<React.SetStateAction<number>>;
  sendMessage: (recipients: Contact[], sender: Contact, text: string) => void;
  createConversation: (recipients: Contact[]) => void;
};

const ConversationsContext = React.createContext<ConversationsContextValue>({
  conversations: [],
  selectedConversation: { recipients: [], messages: [], selected: false },
  selectConversationIndex: () => {},
  sendMessage: () => {},
  createConversation: () => {},
});

export function useConversations() {
  return useContext(ConversationsContext);
}

export function ConversationsProvider({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) {
  const [conversations, setConversations] = useLocalStorage(
    "conversations",
    []
  );

  const [selectedConversationIndex, setSelectedConversationIndex] =
    React.useState(0);

  const { contacts } = useContacts();

  const socket = useSocket();

  function createConversation(recipients: Contact[]) {
    setConversations((prevConversations: Conversation[]) => {
      return [...prevConversations, { recipients, messages: [] }];
    });
  }

  const addMessageToConversation = useCallback(
    ({ recipients, text, sender }) => {
      setConversations((prevConversations: Conversation[]) => {
        let madeChange = false;
        const newMessage = { sender, text };
        const newConversations = prevConversations.map(
          (conversation: Conversation) => {
            if (arrayEquality(conversation.recipients, recipients)) {
              madeChange = true;
              return {
                ...conversation,
                messages: [...conversation.messages, newMessage],
              };
            }
            return conversation;
          }
        );

        if (madeChange) {
          return newConversations;
        } else {
          // refactor this garbage
          return [...prevConversations, { recipients, messages: [newMessage] }];
        }
      });
    }
  );

  useEffect(() => {
    if (socket == null) return;

    socket.on("receive-message", addMessageToConversation);

    return () => socket.off("receive-message");
  }, [socket, setConversations]);

  function sendMessage(recipients: Contact[], sender: Contact, text: string) {
    socket.emit("send-message", { recipients, text });
    addMessageToConversation({ recipients, text, sender: id });
  }

  // refactor this garbage
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

      const messages = conversation.messages.map((message) => {
        const contact = contacts.find((contact) => {
          return contact.id === message.sender;
        });
        const name = (contact && contact.name) || message.sender;
        const fromMe = id === message.sender;
        return { ...message, senderName: name, fromMe };
      });

      const selected = index === selectedConversationIndex;
      return { ...conversation, messages, recipients, selected };
    }
  );

  const value = {
    conversations: formattedConversations,
    selectedConversation: formattedConversations[selectedConversationIndex],
    sendMessage,
    selectConversationIndex: setSelectedConversationIndex,
    createConversation,
  };

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
}
