import React from 'react';
import AppBar from '../atoms/AppBar';
import Footer from '../atoms/Footer';
import SignOut from '../molecules/SignOut';
import NavDrawer from '../organisms/NavDrawer';
import { useDrawerStore } from '@/store/nav-drawer';
import { cn } from '@/lib/cn';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    const { isOpen } = useDrawerStore();
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
            <NavDrawer />
            <div className={cn(
                "flex-grow pt-16 pb-16 w-full",
                {
                    'pr-[200px]': isOpen,
                    'pr-16': !isOpen,
                }
            )}>
                <main className="container flex flex-col justify-center items-center">
                    {children}
                </main>
            </div>
            <Footer>
                <div>Footer</div>
            </Footer>
        </div>
    )
};

export default DashboardLayout;