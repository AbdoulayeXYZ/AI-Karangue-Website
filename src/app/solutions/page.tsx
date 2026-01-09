import { getServerContent } from "@/lib/content-server";
import SolutionsClient from "@/components/pages/SolutionsClient";

export default async function SolutionsPage() {
    const content = await getServerContent();
    return <SolutionsClient content={content} />;
}
