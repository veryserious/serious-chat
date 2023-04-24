import React, { useRef } from "react";
import {
  FormLabel,
  FormErrorMessage,
  FormControl,
  Input,
  Button,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { v4 as uuidV4 } from "uuid";

export default function Login({ onIdSubmit }) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    onIdSubmit(data.id);
    // return new Promise<void>((resolve) => {
    //   setTimeout(() => {
    //     alert(JSON.stringify(data, null, 2));
    //     resolve();
    //   }, 3000);
    // });
  });

  function createNewId() {
    onIdSubmit(uuidV4());
  }

  return (
    <div>
      <h1 className="text-4xl mb-4">Login</h1>
      <form onSubmit={onSubmit}>
        <FormControl isInvalid={Boolean(errors.id)}>
          <FormLabel htmlFor="id">Enter your ID</FormLabel>
          <Input type="text" id="id" {...register("id", { required: true })} />

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
          Submit
        </Button>
        <Button mt={4} ml={4} onClick={createNewId}>
          Create a New ID
        </Button>
      </form>
    </div>
  );
}
