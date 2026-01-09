import "server-only";

import fs from "fs/promises";
import path from "path";
import { defaultContent, SiteContent } from "@/lib/content";

const DATA_FILE_PATH = path.join(process.cwd(), "src/data/content.json");

export async function getServerContent(): Promise<SiteContent> {
    try {
        await fs.access(DATA_FILE_PATH);
        const data = await fs.readFile(DATA_FILE_PATH, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.warn("Could not read content file, falling back to default:", error);
        return defaultContent;
    }
}
