"use client"

import Title from "../atoms/Title";
import { Button } from "../atoms/button";
import { useRouter } from "next/navigation";

export function LandingPageHero() {
  const router = useRouter();

  const handleSignin = () => {
    router.push("/auth/signin");
  }

  return (
    <div className="space-y-6 text-center">
      <Title>Welcome to the landing page!!</Title>
      <Button type="button" onClick={handleSignin} variant="ghost" size="lg" className="text-lg">Sign in</Button>
    </div>
  )
}