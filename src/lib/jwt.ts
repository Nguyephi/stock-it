"use server"

import jwt from 'jsonwebtoken';
const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error('Missing JWT_SECRET environment variable');
}

interface TokenPayload {
    token: string;
}

export const encryptToken = async (token: string): Promise<string> => {
    return jwt.sign({ token }, secret, { expiresIn: '3y' });
};

export const decryptToken = async (token: string): Promise<string> => {
    try {
        const decoded = jwt.verify(token, secret) as TokenPayload;
        return decoded.token;
    } catch (error) {
        throw new Error('Invalid token');
    }
};