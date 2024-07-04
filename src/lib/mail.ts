import { Resend } from "resend";

const resend = new Resend(process.env.AUTH_RESEND_KEY);
const from = process.env.RESEND_FROM as string;

export const sendPasswordResetEmail = async (
    email: string, 
    token: string
) => {
    const resetLink = `${process.env.NEXTAUTH_URL}/auth/new-password?token=${token}`;

    await resend.emails.send({
        from: from,
        to: email,
        subject: "Reset your password",
        html: `<p>Click <a href=${resetLink}>here</a> to reset password</p>`
    })
}

export const sendVerificationEmail = async (
    email: string, 
    token: string
) => {
    const confirmLink = `${process.env.NEXTAUTH_URL}/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: from,
        to: email,
        subject: "Confim your email",
        html: `<p>Click <a href=${confirmLink}>here</a> to conform email</p>`
    })
}