import { IndustriesClient } from "@/components/pages/IndustriesClient";
import { getServerContent } from "@/lib/content-server";

export default async function IndustriesPage() {
    const content = await getServerContent();
    return <IndustriesClient content={content} />;
}
