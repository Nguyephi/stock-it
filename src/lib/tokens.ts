import { v4 as uuidv4 } from "uuid";

import { db } from "@/lib/db";
import { getVerificationTokenByEmail } from "@/data/verification-token";

export const generateVerificationToken = async (email: string) => {
    const token = uuidv4();
    // expires in 1 hour
    const expires = new Date(new Date().getTime() + 3600 * 1000);
    const exisitngToken = await getVerificationTokenByEmail(email);

    if (exisitngToken) {
        await db.verificationToken.delete({
            where: { id: exisitngToken.id }
        })
    }

    const verificationToken = await db.verificationToken.create({
        data: {
            email,
            token,
            expires
        }
    })

    return verificationToken;
}