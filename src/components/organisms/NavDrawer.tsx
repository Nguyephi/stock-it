'use client';

import React from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerFooter,  DrawerTitle } from '../atoms/RightSideDrawer';
import NavMenuList from '../molecules/NavMenuList';
import { useDrawerStore } from '@/store/nav-drawer';

interface SideDrawerProps {
}

const SideDrawer: React.FC<SideDrawerProps> = () => {
    const { isOpen } = useDrawerStore();

    return (
        <Drawer open={true}>
            <DrawerContent open={isOpen}>
                <DrawerHeader className='p-2'>
                    <DrawerTitle />
                    <NavMenuList />
                </DrawerHeader>
            </DrawerContent>
        </Drawer>
    );
};

export default SideDrawer;
