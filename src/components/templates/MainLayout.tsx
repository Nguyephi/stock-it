'use client'

import React from 'react';
import AppBar from '../atoms/AppBar';
import Footer from '../atoms/Footer';
import { Button } from "../atoms/button";
import { useRouter } from 'next/navigation';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
    const router = useRouter();

    const handleSignin = () => {
        router.push("/auth/signin");
    }
    return (
        <div className='flex min-h-screen flex-col items-center justify-center bg-sky-400'>
            <AppBar
                leftComponent={
                    <div>
                        Logo
                    </div>
                }
                rightComponent={
                    <div>
                        <Button type="button" onClick={handleSignin} variant="ghost" size="sm" className="text-md">Sign in</Button>
                    </div>
                } />
            <div className="container flex-grow pt-16 pb-16 w-full">
                <main className="flex flex-col justify-center items-center">
                    {children}
                </main>
            </div>
            <Footer>
                <div>Footer</div>
            </Footer>
        </div>
    )
};

export default MainLayout;