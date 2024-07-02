import React from 'react';
import CardHeader from '../atoms/CardHeader';
import Card from '../atoms/Card';
import CardBody from '../atoms/CardBody';
import CardActions from '../atoms/CardActions';
import SocialsButton from '../atoms/SocialsButton';
import LinkButton from '../atoms/LinkButton';

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel?: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
}

const CardWrapper: React.FC<CardWrapperProps> = ({
    children,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    showSocial = true,
}) => {
    return (
        <Card>
            <CardBody>
                {headerLabel && (
                    <CardHeader>{headerLabel}</CardHeader>
                )}
                {children}
                <div className='space-y-2'>
                    <div className="divider"></div>
                    {showSocial && (
                        <CardActions className="justify-end">
                            <SocialsButton />
                        </CardActions>
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

export default CardWrapper;
