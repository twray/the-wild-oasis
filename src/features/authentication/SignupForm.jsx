/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignUp } from "./useSignUp";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { signUp, isSigningUp } = useSignUp();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function handleFormSubmit({ fullName, email, password }) {
    signUp({ fullName, email, password }, { onSettled: () => reset() });
  }

  return (
    <Form onSubmit={handleSubmit(handleFormSubmit)}>
      <FormRow label="Full name" errorMessage={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", { required: "This field is required." })}
          disabled={isSigningUp}
        />
      </FormRow>
      <FormRow label="Email address" errorMessage={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "This field is required.",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address.",
            },
          })}
          disabled={isSigningUp}
        />
      </FormRow>
      <FormRow
        label="Password (min 8 characters)"
        errorMessage={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "This field is required.",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
          disabled={isSigningUp}
        />
      </FormRow>
      <FormRow
        label="Repeat password"
        errorMessage={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "This field is required.",
            validate: (value) =>
              value === getValues().password || "Passwords need to match",
          })}
          disabled={isSigningUp}
        />
      </FormRow>
      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={isSigningUp}>
          Cancel
        </Button>
        <Button disabled={isSigningUp}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
