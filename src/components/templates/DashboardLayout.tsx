import React from 'react';
import AppBar from '../atoms/AppBar';
import Footer from '../atoms/Footer';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => (
    <div className='flex min-h-screen flex-col items-center justify-center bg-sky-400'>
        <AppBar leftComponent={<div>Left Component</div>} rightComponent={<div>Right Component</div>} />
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
);

export default DashboardLayout;