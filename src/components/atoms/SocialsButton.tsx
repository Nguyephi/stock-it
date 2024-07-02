"use client"

import { FaGoogle, FaFacebook } from "react-icons/fa"
import Button from "./Button";

const Socials: React.FC = () => {
    return (
        <div className="space-y-2 w-full">
            <Button
                size="small"
                className="w-full"
                onClick={() => {}}
                variant="danger"
            >
                <FaGoogle className="h-4 w-4" />
            </Button>
            <Button
                size="small"
                className="w-full"
                onClick={() => {}}
                variant="danger"
            >
                <FaFacebook className="h-4 w-4" />
            </Button>
        </div>
    );
};

export default Socials;
