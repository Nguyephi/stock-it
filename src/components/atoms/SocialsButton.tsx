"use client"

import { FaGoogle, FaFacebook } from "react-icons/fa"
import Button from "./Button";

const Socials: React.FC = () => {
    return (
        <div className="flex justify-center items-center space-x-2">
            <Button
                size="small"
                className="min-w-[50%]"
                onClick={() => {}}
                variant="danger"
            >
                <FaGoogle className="h-4 w-4" />
            </Button>
            <Button
                size="small"
                className="min-w-[50%]"
                onClick={() => {}}
                variant="danger"
            >
                <FaFacebook className="h-4 w-4" />
            </Button>
        </div>
    );
};

export default Socials;
