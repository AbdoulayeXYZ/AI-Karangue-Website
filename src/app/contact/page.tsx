import { getServerContent } from "@/lib/content-server";
import ContactClient from "@/components/pages/ContactClient";

export default async function ContactPage() {
    const content = await getServerContent();
    return <ContactClient content={content} />;
}
