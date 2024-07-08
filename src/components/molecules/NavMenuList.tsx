import React from 'react';
import { useRouter } from 'next/navigation';

import { NavigationMenu, NavigationMenuItem, NavigationMenuLink } from '../atoms/navigation-menu';
import { TfiAngleRight, TfiAngleLeft, TfiUser, TfiSettings, TfiHome } from 'react-icons/tfi';
import { useDrawerStore } from '@/store/nav-drawer';

const NavMenuList: React.FC = () => {
    const router = useRouter();
    const { isOpen, handleOpen, handleClose } = useDrawerStore();

    const menuItems = [
        { icon: TfiHome, name: 'Home', route: '/dashboard' },
        { icon: TfiUser, name: 'Profile', route: '/dashboard/profile' },
        { icon: TfiSettings, name: 'Settings', route: '/dashboard/settings' },
    ];

    const handleNavigation = (route: string) => {
        if (route === '') {
            handleClose()
            return;
        }
        router.push(route);
    };

    return (
        <NavigationMenu className="flex flex-col space-y-2 w-full">
            {
                isOpen &&
                <NavigationMenuItem onClick={handleClose} className="flex items-center space-x-4 cursor-pointer p-4 hover:bg-gray-100 w-full">
                    <NavigationMenuLink asChild className="">
                        <div className="flex items-center w-full">
                            <TfiAngleRight />
                            <span className="text-gray-600 ml-2 flex-1">Close</span>
                        </div>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            }
            {
                !isOpen &&
                <NavigationMenuItem onClick={handleOpen} className="flex items-center space-x-4 cursor-pointer p-4 hover:bg-gray-100">
                    <NavigationMenuLink asChild>
                        <div className="flex items-center">
                            <TfiAngleLeft />
                        </div>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            }
            {menuItems.map((item, index) => (
                <NavigationMenuItem
                    key={index}
                    onClick={() => handleNavigation(item.route)}
                    className="flex items-center space-x-4 cursor-pointer p-4 hover:bg-gray-100 w-full">
                    <NavigationMenuLink asChild>
                        <div className="flex items-center">
                            <item.icon />
                            {isOpen && <span className="text-gray-600 ml-2">{item.name}</span>}
                        </div>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            ))}
        </NavigationMenu>
    );
};

export default NavMenuList;
