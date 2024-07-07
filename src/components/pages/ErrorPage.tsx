import React from 'react'
import {
    Card,
    CardDescription,
    CardFooter,
    CardTitle,
    CardHeader
} from '../atoms/card';
import LinkButton from '../atoms/LinkButton'
import Divider from '../atoms/Divider'

const ErrorPage = () => {
    return (
        <main>
            <Card className="w-[450px]">
                <CardHeader className="flex flex-col space-y-2 items-cente">
                    <CardTitle>💩</CardTitle>
                    <CardDescription className="text-red-700 text-2xl">Oops! Something went wrong</CardDescription>
                </CardHeader>
                <CardFooter className="flex flex-col space-y-2">
                    <Divider orientation="horizontal" />
                    <LinkButton
                        label="Back to login"
                        href="/auth/signin"
                    />
                </CardFooter>
            </Card>
        </main>
    )
}

export default ErrorPage