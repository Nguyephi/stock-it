"use client"

import Title from "../atoms/Title";
import Button from "../atoms/Button";
import { useRouter } from "next/navigation";
 
export function LandingPageHero() {
  const router = useRouter();

  const handleSignin = () => {
    router.push("/auth/register");
  }

  return (
    <div className="space-y-6 text-center">
        <Title>Welcome to the landing page!</Title>
        <Button type="button" onClick={handleSignin} className="text-sm btn-primary">Sign in here</Button>
    </div>
  )
}