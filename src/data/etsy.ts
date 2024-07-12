export async function fetchEtsyUserData(accessToken: string) {
    const response = await fetch('https://api.etsy.com/v3/application/users/me', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user data');
    }

    const data = await response.json();
    return data;
}

export const handleEtsyOauth = async () => {
    try {
        const response = await fetch('/api/auth/etsy/connect');
        const data = await response.json();
        // Redirect the user to the authorization URL
        window.location.href = data.authorizationUrl;
    } catch (error) {
        console.error('Error initiating Etsy OAuth:', error);
    }
}