import React from "react";
import { useForm } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Stack,
} from "@chakra-ui/react";
import { useContacts } from "../contexts/ContactsProvider";

export default function ModalContacts() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const { createContact } = useContacts();

  const onSubmit = handleSubmit((data) => {
    const { id, name } = data;
    createContact(id, name);
  });

  return (
    <div>
      <form onSubmit={onSubmit}>
        <FormControl isInvalid={Boolean(errors.id)}>
          <Stack>
            <div>
              <FormLabel htmlFor="id">Id</FormLabel>
              <Input
                type="text"
                id="id"
                {...register("id", { required: true })}
              />
            </div>

            <div>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                type="text"
                id="name"
                {...register("name", { required: true })}
              />
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
