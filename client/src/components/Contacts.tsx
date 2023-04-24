import { List, ListItem } from "@chakra-ui/react";
import { useContacts } from "../contexts/ContactsProvider";

export default function Contacts() {
  const { contacts } = useContacts();

  return (
    <div>
      <List>
        {contacts.map((contact: any) => {
          return <ListItem key={contact.id}>{contact.name}</ListItem>;
        })}
      </List>
    </div>
  );
}
