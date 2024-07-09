import React from 'react';
import * as z from 'zod';

import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
    CardHeader,
    CardFooter
} from '../atoms/card';
import { InputWithButton } from './InputWithButton';
import { InputSchema } from '@/schema';

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
    return (
        <Card className="flex flex-col space-y-0 py-2 w-full justify-between">
            <div className="flex flex-col">
                <CardHeader className="flex flex-col space-y-2">
                    <CardTitle className="text-2xl">{headerLabel}</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription className="text-lg">
                        {description}
                    </CardDescription>
                </CardContent>
            </div>
            <CardFooter className='w-full'>
                {provider === 'printify' && <InputWithButton
                    inputPlaceholder="Enter your access token"
                    onSubmit={handleSubmit}
                    buttonText="Connect"
                />}
            </CardFooter>
        </Card>
    );
};

export default ShopConnectCard;
