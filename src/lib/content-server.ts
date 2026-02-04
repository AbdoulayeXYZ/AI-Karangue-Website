import "server-only";

import fs from "fs/promises";
import path from "path";
import { cookies } from "next/headers";
import { defaultContent, SiteContent } from "@/lib/content";

const cache: Record<string, SiteContent> = {};

export async function getServerContent(): Promise<SiteContent> {
    const cookieStore = await cookies();
    const lang = cookieStore.get("app-lang")?.value || "fr";

    if (cache[lang]) {
        return cache[lang];
    }

    const DATA_FILE_PATH = path.join(process.cwd(), `src/data/content_${lang}.json`);
    try {
        await fs.access(DATA_FILE_PATH);
        const data = await fs.readFile(DATA_FILE_PATH, "utf-8");
        const content = JSON.parse(data);
        cache[lang] = content;
        return content;
    } catch (error) {
        console.warn("Could not read content file, falling back to default:", error);
        return defaultContent;
    }
}
