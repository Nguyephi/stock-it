"use client"

import { FaGoogle, FaFacebook } from "react-icons/fa"
import Button from "./Button";

const Socials: React.FC = () => {
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
                onClick={() => {}}
            >
                <FaFacebook className="h-4 w-4" />
            </Button>
        </div>
    );
};

export default Socials;
