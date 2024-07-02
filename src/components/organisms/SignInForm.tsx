import React from 'react';
import CardWrapper from '../molecules/CardWrapper';

export default function SignInForm() {
    return (
        <div>
            <CardWrapper
                headerLabel='Sign In'
                backButtonLabel="Don't have an account?"
                backButtonHref="/auth/register"
                showSocial
            >
                Sign in form here
            </CardWrapper>
        </div>
    )
}