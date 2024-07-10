import React, { useEffect } from 'react';
import * as z from 'zod';
import { FaCheckCircle, FaTrash } from 'react-icons/fa'


import {
    Card,
    CardContent,
    CardTitle,
    CardHeader,
    CardFooter
} from '../atoms/card';
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
}

const ShopConnectCard: React.FC<ShopConnectCardProps> = ({
    provider,
    headerLabel,
    description,
    handleSubmit
}) => {
    const { success, clearMessages } = useAlertStore();
    const { data: printify, loading: printifyLoading, fetchData: fetchPrintifyData, deleteData: deletePrintifyData } = usePrintifyStore();

    useEffect(() => {
        if (success && !printify?.id) {
            fetchPrintifyData()
        }
        return () => {
            clearMessages();
        };
    }, [printify, success]);

    return (
        <div className='w-full'>
            {provider === 'printify' && !printify?.id && !printifyLoading && (
                <Card className="flex flex-col space-y-0 py-2 justify-between">
                    <div className="flex flex-col">
                        <CardHeader className="flex flex-col space-y-2">
                            <CardTitle className="text-2xl">{headerLabel}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {description}
                        </CardContent>
                    </div>
                    <CardFooter className='w-full'>
                        <InputWithButton
                            inputPlaceholder="Enter your access token"
                            onSubmit={handleSubmit}
                            buttonText="Connect"
                        />
                    </CardFooter>
                </Card>
            )}
            {provider === 'printify' && printify?.id && (
                <Card className="flex flex-col space-y-0 py-2 justify-between">
                    <CardHeader className="flex flex-row justify-between items-center">
                        <CardTitle className="flex items-center text-2xl text-green-600">
                            <FaCheckCircle className='mr-2' />
                            Connected!
                        </CardTitle>
                        <Button variant="ghost" className="text-lg text-red-600" onClick={deletePrintifyData}>
                            <FaTrash className='text-xl' />
                        </Button>
                    </CardHeader>
                </Card>
            )}

        </div>
    );
};

export default ShopConnectCard;
