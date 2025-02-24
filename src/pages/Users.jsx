import Heading from "../ui/Heading";
import SignUpForm from "../features/authentication/SignupForm";

function NewUsers() {
  return (
    <>
      <Heading as="h1">Create a New User</Heading>
      <SignUpForm />
    </>
  );
}

export default NewUsers;
