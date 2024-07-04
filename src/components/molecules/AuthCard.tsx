import React from 'react';
import CardHeader from '../atoms/CardHeader';
import Card from '../atoms/Card';
import CardBody from '../atoms/CardBody';
import CardActions from '../atoms/CardActions';
import SocialsButton from '../atoms/SocialsButton';
import LinkButton from '../atoms/LinkButton';
import Title from '../atoms/Title';

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
        <Card>
            <CardBody>
                {headerLabel && (
                    <div className='space-y-2'>
                        <Title>🔐</Title>
                        <CardHeader>{headerLabel}</CardHeader>
                    </div>
                )}
                {children}
                <div className='space-y-2'>
                    <div className="divider mt-0"></div>
                    {showSocial && (
                        <SocialsButton />
                    )}
                    <CardActions className="justify-center">
                        <LinkButton
                            label={backButtonLabel}
                            href={backButtonHref}
                        />
                    </CardActions>
                </div>
            </CardBody>
        </Card>
    );
};

export default AuthCard;
