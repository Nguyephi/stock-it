"use client"

import { FcGoogle } from "react-icons/fc"
import Button from "./Button";

const Socials: React.FC = () => {
    return (
        <div className="flex item-center w-full gap-x-2">
            <Button
                size="large"
                className="w-full"
                onClick={() => {}}
                variant="danger"
            >
                <FcGoogle className="h-5 w-5" />
            </Button>
        </div>
    );
};

export default Socials;
