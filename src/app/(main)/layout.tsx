import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { getServerContent } from "@/lib/content-server";

export default async function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const content = await getServerContent();

    return (
        <>
            <Navbar content={content.navbar} />
            {children}
            <Footer content={content.footer} />
        </>
    );
}
