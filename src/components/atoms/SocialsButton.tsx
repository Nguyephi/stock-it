"use client"

import { FaGoogle, FaFacebook } from "react-icons/fa"
import Button from "./Button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

const Socials: React.FC = () => {
    const onClick = (provider: "facebook") => {
        signIn(provider, {
            callbaclUrl: DEFAULT_LOGIN_REDIRECT
        })
    } 
    return (
        <div className="flex justify-center items-center space-x-2">
            <Button
                className="min-w-[50%] text-sm btn-outline"
                onClick={() => {}}
            >
                <FaGoogle className="h-4 w-4" />
            </Button>
            <Button
                className="min-w-[50%] text-sm btn-outline"
                onClick={() => onClick('facebook')}
            >
                <FaFacebook className="h-4 w-4" />
            </Button>
        </div>
    );
};

export default Socials;
