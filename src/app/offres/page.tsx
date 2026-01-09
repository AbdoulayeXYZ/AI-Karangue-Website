import { IndustriesClient } from "@/components/pages/IndustriesClient";
import { OffresClient } from "@/components/pages/OffresClient";
import { getServerContent } from "@/lib/content-server";

export default async function OffresPage() {
    const content = await getServerContent();
    return <OffresClient content={content} />;
}
