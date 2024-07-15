import React, { useEffect } from 'react';
import * as z from 'zod';
import { FaCheckCircle, FaTrash } from 'react-icons/fa'
import { FiAlertTriangle } from "react-icons/fi";


import {
    Card,
    CardContent,
    CardTitle,
    CardHeader,
    CardFooter
} from '../atoms/card';
import { Alert, AlertDescription } from "../atoms/alert";
import { InputWithButton } from './InputWithButton';
import { InputSchema } from '@/schema';
import useAlertStore from '@/store/alert-message';
import usePrintifyStore from '@/store/printify';
import { Button } from '../atoms/button';

interface ShopConnectCardProps {
    provider?: string;
    headerLabel?: string;
    description?: string;
    handleSubmit?: (value: z.infer<typeof InputSchema>) => Promise<{ error?: string; success?: string } | void>;
    onClick?: () => void;
}

const ShopConnectCard: React.FC<ShopConnectCardProps> = ({
    provider,
    headerLabel,
    description,
    handleSubmit,
    onClick
}) => {
    const { success, clearMessages, provider: alertProvider, error } = useAlertStore();
    const { data: printify, loading: printifyLoading, fetchData: fetchPrintifyData, deleteData: deletePrintifyData } = usePrintifyStore();

    useEffect(() => {
        if (provider === "printify" && success && !printify?.id) {
            /**
             * Once you store access token in the db add it to app state
             *  */
            fetchPrintifyData()
        }
        // return () => {
        //     clearMessages();
        // };
    }, [printify, success]);

    const renderAlert = () => {
        if (error) {
            return (
                <Alert variant="destructive">
                    <div className='flex items-center space-x-2'>
                        <FiAlertTriangle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                    </div>
                </Alert>
            )
        }
        if (success) {
            return (
                <Alert variant="affirmative">
                    <div className='flex items-center space-x-2'>
                        <FaCheckCircle className="h-4 w-4" />
                        <AlertDescription>{success}</AlertDescription>
                    </div>
                </Alert>
            )
        }
        return null
    }

    const renderPrintifyCard = () => {
        if (!printifyLoading) {
            if (!printify?.id) {
                return (
                    <Card className="flex flex-col space-y-0 py-2 justify-between">
                        <div className="flex flex-col">
                            <CardHeader className="flex flex-col space-y-2">
                                <CardTitle className="text-2xl">{headerLabel}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {description}
                            </CardContent>
                        </div>
                        <CardFooter className='w-full flex flex-col space-y-4'>
                            <InputWithButton
                                inputPlaceholder="Enter your access token"
                                onSubmit={handleSubmit}
                                buttonText="Connect"
                                provider={provider}
                            />
                            {provider === alertProvider && (
                                renderAlert()
                            )}
                        </CardFooter>
                    </Card>
                )
            }

            return (
                <Card className="flex flex-col space-y-0 justify-between">
                    <CardHeader className="flex flex-row justify-between items-center">
                        <CardTitle className="flex items-center text-2xl text-green-600">
                            <FaCheckCircle className='mr-2' />
                            Connected to printify!
                        </CardTitle>
                        <Button variant="ghost" size="icon" className=" text-red-600" onClick={deletePrintifyData}>
                            <FaTrash className='text-2xl' />
                        </Button>
                    </CardHeader>
                </Card>
            )
        }
        // TODO: render card template for when its loading, create a separate component for this to use with etsy card
    }

    const renderEtsyCard = () => {
        return (
            <Card className="flex flex-col space-y-0 py-2 justify-between">
                <div className="flex flex-col">
                    <CardHeader className="flex flex-col space-y-2">
                        <CardTitle className="text-2xl">{headerLabel}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {description}
                    </CardContent>
                </div>
                <CardFooter className='w-full flex flex-col space-y-4'>
                    <Button
                        onClick={onClick}
                        className='h-12 w-full'
                        size='lg'
                    >
                        Connect
                    </Button>
                    {provider === alertProvider && (
                        renderAlert()
                    )}
                </CardFooter>
            </Card>
        )
    }

    return (
        <div className='w-full'>
            {provider === 'printify' && renderPrintifyCard()}
            {provider === 'etsy' && renderEtsyCard()}
        </div>
    );
};

export default ShopConnectCard;
