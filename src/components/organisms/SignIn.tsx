import { signIn } from "@/auth"
import Title from "../atoms/Title";
import Button from "../atoms/Button";
 
export function SignIn() {
  return (
    <div className="space-y-6 text-center">
        <Title>🔐 Auth</Title>
        <form
        action={async () => {
            "use server"
            await signIn("facebook", { redirectTo: "/dashboard" });
        }}
        >
        <Button type="submit" size='small' variant='danger'>Signin with FB</Button>
        </form>
    </div>
  )
}