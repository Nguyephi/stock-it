export default function AuthLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="flex h-full flex-col items-center justify-center bg-sky-400">
            {children}
        </main>
    )
}