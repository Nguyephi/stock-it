"use server"

import { auth } from '@/auth';

export const handleEtsyOauth = async () => {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
        return { error: "User is not authenticated!" }
    }
    try {
        const response = await fetch('/api/auth/etsy/connect');
        const data = await response.json();
        window.location.href = data.authorizationUrl;
    } catch (error) {
        console.error('Error initiating Etsy OAuth:', error);
    }
}