import { signOut } from "@/auth"
import Title from "../atoms/Title";
import Button from "../atoms/Button";

export default function SignOut() {
  return (
    <div className="space-y-6 text-center">
      <Title>Sign out</Title>
      <form
        action={async () => {
          "use server"
          await signOut({ redirectTo: "/" });
        }}
      >
        <Button type="submit">bye-bye</Button>
      </form>
    </div>
  )
}