import { getServerContent } from "@/lib/content-server";
import TrackingClient from "@/components/pages/TrackingClient";

export const metadata = {
    title: "Suivi du Personnel & Flottes de Livraison | AI-Karangué",
    description: "Solution de tracking mobile pour vos livreurs et flottes de livraison. Optimisez vos opérations avec Sama Karangué et Karangué221.",
};

export default async function TrackingPage() {
    const content = await getServerContent();

    return <TrackingClient content={content} />;
}
