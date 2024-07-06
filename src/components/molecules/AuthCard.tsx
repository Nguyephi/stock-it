import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardTitle, CardHeader } from '../atoms/card';
import SocialsButton from '../atoms/SocialsButton';
import LinkButton from '../atoms/LinkButton';
import Divider from '../atoms/Divider';

interface AuthCardProps {
    children: React.ReactNode;
    headerLabel?: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
}

const AuthCard: React.FC<AuthCardProps> = ({
    children,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    showSocial = false,
}) => {
    return (
        <Card className="flex flex-col space-y-3 py-4 w-[400px]">
            <CardHeader className="flex flex-col space-y-2 items-center">
                <CardTitle className="text-6xl">🔐</CardTitle>
                {headerLabel && <CardDescription className="text-2xl">{headerLabel}</CardDescription>}
            </CardHeader>
            <CardContent className='pb-0'>
                {children}
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
                <Divider orientation="horizontal" />
                {showSocial && (
                    <SocialsButton />
                )}
                <LinkButton
                    label={backButtonLabel}
                    href={backButtonHref}
                />
            </CardFooter>
        </Card >
    );
};

export default AuthCard;
