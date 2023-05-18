import React, { useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export type Contact = {
  id: string;
  name: string;
};

type ContactsContextValue = {
  contacts: Contact[];
  createContact: (id: string, name: string) => void;
};

const ContactsContext = React.createContext<ContactsContextValue>({
  contacts: [],
  createContact: () => {},
});

export function useContacts() {
  return useContext(ContactsContext);
}

export function ContactsProvider({ children }: { children: React.ReactNode }) {
  const [contacts, setContacts] = useLocalStorage("contacts", []);

  function createContact(id: string, name: string) {
    setContacts((prevContacts: Contact[]) => {
      return [...prevContacts, { id, name }];
    });
  }
  return (
    <ContactsContext.Provider value={{ contacts, createContact }}>
      {children}
    </ContactsContext.Provider>
  );
}
