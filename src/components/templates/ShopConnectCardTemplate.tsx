import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../atoms/card';
import Skeleton from 'react-loading-skeleton';

const ShopConnectCardTemplate = () => {
    return (
        <Card className="flex flex-col space-y-0 py-2 justify-between">
            <div className="flex flex-col">
                <CardHeader className="flex flex-col space-y-2 w-full">
                    <CardTitle className="text-2xl w-full">
                        <Skeleton width={200} height={28} />
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Skeleton count={1} height={20}/>
                </CardContent>
            </div>
            <CardFooter className='w-full flex flex-col space-y-4'>
                <div className="w-full">
                    <Skeleton height={44} />
                </div>
            </CardFooter>
        </Card>
    );
}

export default ShopConnectCardTemplate;