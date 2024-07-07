import React from 'react';
import AppBar from '../atoms/AppBar';
import Footer from '../atoms/Footer';
import { Button } from '../atoms/button';
import SignOut from '../molecules/SignOut';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
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
                    <SignOut />
                </div>
            } />
        <div className="container flex-grow pt-16 w-full">
            {/* <Sidebar /> */}
            <main className="flex flex-col justify-center items-center">
                {children}
            </main>
        </div>
        <Footer>
            <div>Footer</div>
        </Footer>
    </div>
)};

export default DashboardLayout;