

import { signIn } from "@/auth"
 
export function SignIn() {
  return (
    <form
      action={async (formData) => {
        await signIn("resend", formData)
      }}
    >
      <input type="text" name="email" placeholder="Email" />
      <button type="submit">Signin with Resend</button>
    </form>
  )
}