import React from 'react'
import Card from '../atoms/card'
import CardBody from '../atoms/CardBody'
import Title from '../atoms/Title'
import CardActions from '../atoms/CardActions'
import LinkButton from '../atoms/LinkButton'
import CardHeader from '../atoms/CardHeader'

const ErrorPage = () => {
    return (
        <Card className="w-[450px]">
            <CardBody>
                <Title>💩</Title>
                <CardHeader className="text-red-700 text-2xl">Oops! Something went wrong</CardHeader>
                <CardActions className="justify-center">
                    <LinkButton
                        label="Back to login"
                        href="/auth/signin"
                    />
                </CardActions>
            </CardBody>
        </Card>
    )
}

export default ErrorPage