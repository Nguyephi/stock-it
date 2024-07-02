import { signIn } from "@/auth"
 
export function SignIn() {
  return (
    <div>
        <form
        action={async () => {
            "use server"
            await signIn("facebook", { redirectTo: "/dashboard" });
        }}
        >
        <button type="submit">Signin with FB</button>
        </form>
    </div>
  )
}