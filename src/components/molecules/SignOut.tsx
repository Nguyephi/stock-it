import { signOut } from "next-auth/react";
import Title from "../atoms/Title";
import { Button } from "../atoms/button";

export default function SignOut() {
  return (
    <div className="space-y-6 text-center">
      <Title>Sign out</Title>
      <form
        action={() => {
          signOut();
        }}
      >
        <Button type="submit">bye-bye</Button>
      </form>
    </div>
  )
}