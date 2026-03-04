import { getAllBlogPosts } from "@/lib/db";
import { getServerContent } from "@/lib/content-server";
import { BlogGrid } from "@/components/blog/BlogGrid";
import { cookies } from "next/headers";

export const metadata = {
    title: "Blog | AI-Karangué - Intelligence Artificielle et Sécurité Routière",
    description: "Découvrez nos derniers articles sur l'IA, l'IoT et le futur de la mobilité intelligente en Afrique."
};

export default async function BlogPage() {
    // Fetch data directly on the server for maximum speed
    const cookieStore = await cookies();
    const lang = cookieStore.get("app-lang")?.value || "fr";

    const [posts, content] = await Promise.all([
        getAllBlogPosts(true),
        getServerContent()
    ]);

    return (
        <main className="min-h-screen bg-navy text-white selection:bg-teal selection:text-white">
            {/* Hero Section - Professional & Minimalist */}
            <header className="relative pt-48 pb-24 overflow-hidden">
                <div className="absolute inset-0 bg-navy-dark pointer-events-none" />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal/20 to-transparent" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl">
                        <div className="flex items-center gap-4 mb-8">
                            <span className="w-12 h-px bg-teal" />
                            <span className="text-teal font-black text-[10px] uppercase tracking-[0.4em]">{content.blog.hero.label}</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black mb-10 leading-[0.9] tracking-tighter">
                            {content.blog.hero.title} <br />
                            <span className="text-teal">{content.blog.hero.highlight}</span>
                        </h1>
                        <p className="text-xl text-white/50 max-w-2xl leading-relaxed font-medium">
                            {content.blog.hero.description}
                        </p>
                    </div>
                </div>

                {/* Atmospheric elements */}
                <div className="absolute -right-24 top-1/4 w-96 h-96 bg-teal/10 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute -left-24 bottom-0 w-72 h-72 bg-navy-light/20 blur-[100px] rounded-full pointer-events-none" />
            </header>

            {/* Main Content Component (Client-side for interactivity) */}
            <BlogGrid initialPosts={JSON.parse(JSON.stringify(posts))} lang={lang} />
        </main>
    );
}
