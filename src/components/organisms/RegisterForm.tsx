import React from 'react';
import CardWrapper from '../molecules/CardWrapper';

export default function RegisterForm() {
    return (
        <div>
            <CardWrapper
                headerLabel='Register'
                backButtonLabel="Already have an account?"
                backButtonHref="/auth/signin"
                showSocial
            >
                Register form here
            </CardWrapper>
        </div>
    )
}

