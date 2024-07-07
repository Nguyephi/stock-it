import { signOut } from "next-auth/react";
import { Button } from "../atoms/button";

export default function SignOut() {
  return (
    <div className="space-y-6 text-center">
      <form
        action={() => {
          signOut();
        }}
      >
        <Button variant="ghost" type="submit" size="sm" className="text-md">Sign out</Button>
      </form>
    </div>
  )
}