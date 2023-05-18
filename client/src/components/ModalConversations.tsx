import React from "react";
import { useForm } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Stack,
  Checkbox,
} from "@chakra-ui/react";
import { useContacts } from "../contexts/ContactsProvider";
import { useConversations } from "../contexts/ConversationsProvider";

export default function ModalConversations({
  closeModal,
}: {
  closeModal: any;
}) {
  const [selectedContactIds, setSelectedContactIds] = React.useState([]);
  const { contacts } = useContacts();
  const { createConversation } = useConversations();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    const { id, name } = data;
    createConversation(selectedContactIds);
  });

  function handleCheckboxChange(contactId) {
    setSelectedContactIds((prevSelectedContactIds) => {
      if (prevSelectedContactIds.includes(contactId)) {
        return prevSelectedContactIds.filter((prevId) => {
          return contactId !== prevId;
        });
      } else {
        return [...prevSelectedContactIds, contactId];
      }
    });
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <FormControl isInvalid={Boolean(errors.id)}>
          <Stack>
            <div>
              {contacts.map((contact: any) => (
                <FormControl key={contact.id}>
                  <FormLabel htmlFor={contact.id}>{contact.name}</FormLabel>
                  <Checkbox
                    id={contact.id}
                    label={contact.name}
                    value={selectedContactIds.includes(contact.id)}
                    onChange={() => handleCheckboxChange(contact.id)}
                  ></Checkbox>
                </FormControl>
              ))}
            </div>
          </Stack>

          <FormErrorMessage>
            {errors.id && errors.id.type === "required" && "ID is required"}
          </FormErrorMessage>
        </FormControl>

        <Button
          mt={4}
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
        >
          Create
        </Button>
      </form>
    </div>
  );
}
