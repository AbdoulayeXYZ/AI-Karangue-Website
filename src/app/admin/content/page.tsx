"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Save, RotateCcw, ChevronDown, ChevronUp, Image as ImageIcon, Layout, Box, Globe, Briefcase, Info, List, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getContent, saveContent, resetContent, defaultContent, type SiteContent } from "@/lib/content";

export default function ContentPage() {
    const router = useRouter();
    const [content, setContent] = useState<SiteContent>(defaultContent);
    const [activeTab, setActiveTab] = useState("home");
    const [hasChanges, setHasChanges] = useState(false);
    const [loading, setLoading] = useState(true);

    // Expanded state for each tab's sections
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
        hero: true,
        manifesto: true,
        hardware: false,
        software: false,
        tripleImpact: false,
        roiCalculator: false,
        offres: false,
        finalCta: false,
        // Solutions
        solutions_hero: true,
        solutions_value: true,
        solutions_capabilities: false,
        solutions_hardware: false,
        solutions_ecosystem: false,
        solutions_platform: false,
        solutions_cta: false,
        // Industries
        industries_hero: true,
        industries_transport: true,
        industries_sectors: false,
        industries_finalCta: false,
        // Offres
        offres_hero: true,
        offres_packs: true,
        offres_comparison: false,
        offres_services: false,
        offres_finalCta: false,
    });

    useEffect(() => {
        const isAuth = sessionStorage.getItem("adminAuth");
        if (!isAuth) {
            router.push("/admin/login");
        } else {
            const load = async () => {
                const loadedContent = await getContent();
                setContent(loadedContent);
                setLoading(false);
            };
            load();
        }
    }, [router]);

    const handleSave = async () => {
        try {
            await saveContent(content);
            setHasChanges(false);
            // Replace with a custom toast in real impl
            alert("✅ Contenu sauvegardé avec succès !");
        } catch (e) {
            alert("❌ Erreur lors de la sauvegarde : " + e);
        }
    };

    const handleReset = async () => {
        if (confirm("⚠️ Réinitialiser le contenu ? Cette action est irréversible.")) {
            await resetContent();
            setContent(defaultContent);
            setHasChanges(false);
        }
    };

    const updateContent = (path: string[], value: any) => {
        setContent(prev => {
            const newContent = JSON.parse(JSON.stringify(prev));
            let current: any = newContent;
            for (let i = 0; i < path.length - 1; i++) {
                current = current[path[i]];
            }
            current[path[path.length - 1]] = value;
            return newContent;
        });
        setHasChanges(true);
    };

    const toggleSection = (section: string) => {
        setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const tabs = [
        { id: "home", name: "Accueil", icon: Layout },
        { id: "solutions", name: "Solutions", icon: Box },
        { id: "industries", name: "Industries", icon: Briefcase },
        { id: "offres", name: "Offres", icon: Globe },
        { id: "footer", name: "Pied de page", icon: Info },
    ];

    const InputField = ({ label, value, onChange, placeholder = "", multiline = false, rows = 3, hint = "", className = "" }: any) => (
        <div className={`group ${className}`}>
            <label className="block text-[10px] font-black text-navy/40 uppercase tracking-[0.1em] mb-2 group-focus-within:text-teal transition-colors">
                {label}
            </label>
            {multiline ? (
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    rows={rows}
                    placeholder={placeholder}
                    className="w-full px-4 py-3 bg-zinc-50 hover:bg-white border border-transparent hover:border-zinc-200 focus:border-teal rounded-xl text-navy-dark placeholder:text-navy/20 focus:outline-none focus:ring-4 focus:ring-teal/5 transition-all font-medium text-sm resize-y"
                />
            ) : (
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="w-full h-11 px-4 bg-zinc-50 hover:bg-white border border-transparent hover:border-zinc-200 focus:border-teal rounded-xl text-navy-dark placeholder:text-navy/20 focus:outline-none focus:ring-4 focus:ring-teal/5 transition-all font-medium text-sm"
                />
            )}
            {hint && <p className="text-[10px] text-navy/30 mt-1.5 font-bold ml-1">{hint}</p>}
        </div>
    );

    const CollapsibleSection = ({ title, isExpanded, onToggle, children }: any) => (
        <motion.div
            initial={false}
            animate={{ borderColor: isExpanded ? "rgba(0, 128, 128, 0.2)" : "rgba(255, 255, 255, 0.1)" }}
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-zinc-100"
        >
            <button
                onClick={onToggle}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-zinc-50 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isExpanded ? "bg-teal text-white" : "bg-zinc-100 text-navy/40"}`}>
                        <List className="w-4 h-4" />
                    </div>
                    <h3 className={`text-sm font-black ${isExpanded ? "text-navy-dark" : "text-navy/60"}`}>{title}</h3>
                </div>
                <div className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}>
                    <ChevronDown className="w-5 h-5 text-navy/30" />
                </div>
            </button>
            <AnimatePresence initial={false}>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="p-6 border-t border-zinc-100 space-y-6">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );

    if (loading) return null;

    return (
        <div className="pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 sticky top-4 z-40 bg-[#F0F2F5]/80 backdrop-blur-xl p-4 -mx-4 rounded-3xl border border-white/20 shadow-sm">
                <div>
                    <h1 className="text-3xl font-black text-navy-dark tracking-tight">Éditeur de Contenu</h1>
                    <p className="text-navy/50 font-medium text-sm">Gérez tous les textes de votre site.</p>
                </div>
                <div className="flex gap-3">
                    <Button onClick={handleReset} variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 h-10 px-4 text-xs font-black uppercase tracking-wider">
                        <RotateCcw className="w-4 h-4 mr-2" /> Réinitialiser
                    </Button>
                    <Button onClick={handleSave} disabled={!hasChanges} className="bg-teal hover:bg-teal-light text-white h-10 px-6 text-xs font-black uppercase tracking-wider shadow-lg shadow-teal/20 disabled:opacity-50 disabled:cursor-not-allowed">
                        <Save className="w-4 h-4 mr-2" /> Sauvegarder{hasChanges && "*"}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Sidebar Navigation */}
                <div className="lg:col-span-3 lg:sticky lg:top-32 space-y-2">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all duration-200 ${isActive
                                    ? "bg-navy-dark text-white shadow-xl shadow-navy-dark/10"
                                    : "bg-white text-navy/50 hover:bg-white hover:text-navy-dark hover:shadow-md"
                                    }`}
                            >
                                <Icon className={`w-4 h-4 ${isActive ? "text-teal" : "text-current"}`} />
                                {tab.name}
                                {isActive && <ArrowRight className="w-4 h-4 ml-auto text-teal" />}
                            </button>
                        );
                    })}
                </div>

                {/* Content Area */}
                <div className="lg:col-span-9 space-y-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-6"
                        >
                            {/* HOME TAB CONTENT */}
                            {activeTab === "home" && (
                                <>
                                    <CollapsibleSection title="Hero (Haut de page)" isExpanded={expandedSections.hero} onToggle={() => toggleSection("hero")}>
                                        <div className="grid grid-cols-1 gap-6">
                                            <InputField label="Titre Principal" value={content.home.hero.mainTitle1} onChange={(val: string) => updateContent(["home", "hero", "mainTitle1"], val)} rows={2} multiline />
                                            <InputField label="Sous-titre" value={content.home.hero.mainTitle2} onChange={(val: string) => updateContent(["home", "hero", "mainTitle2"], val)} multiline />
                                            <div className="grid grid-cols-2 gap-4">
                                                <InputField label="Texte Bouton Vidéo" value={content.home.hero.videoButtonText} onChange={(val: string) => updateContent(["home", "hero", "videoButtonText"], val)} />
                                            </div>
                                        </div>
                                    </CollapsibleSection>

                                    <CollapsibleSection title="Calculateur ROI" isExpanded={expandedSections.roiCalculator} onToggle={() => toggleSection("roiCalculator")}>
                                        <InputField label="Titre Section" value={content.home.roiCalculator.sectionTitle} onChange={(val: string) => updateContent(["home", "roiCalculator", "sectionTitle"], val)} />
                                        <InputField label="Titre Highlight" value={content.home.roiCalculator.sectionTitleHighlight} onChange={(val: string) => updateContent(["home", "roiCalculator", "sectionTitleHighlight"], val)} />
                                        <InputField label="Description" value={content.home.roiCalculator.sectionDescription} onChange={(val: string) => updateContent(["home", "roiCalculator", "sectionDescription"], val)} multiline />
                                    </CollapsibleSection>

                                    <CollapsibleSection title="Appel à l'Action Final" isExpanded={expandedSections.finalCta} onToggle={() => toggleSection("finalCta")}>
                                        <InputField label="Titre" value={content.home.finalCta.title} onChange={(val: string) => updateContent(["home", "finalCta", "title"], val)} />
                                        <InputField label="Description" value={content.home.finalCta.description} onChange={(val: string) => updateContent(["home", "finalCta", "description"], val)} />
                                        <InputField label="Bouton Primaire" value={content.home.finalCta.ctaPrimary} onChange={(val: string) => updateContent(["home", "finalCta", "ctaPrimary"], val)} />
                                        <InputField label="Bouton Secondaire" value={content.home.finalCta.ctaSecondary} onChange={(val: string) => updateContent(["home", "finalCta", "ctaSecondary"], val)} />
                                    </CollapsibleSection>
                                </>
                            )}

                            {/* SOLUTIONS TAB CONTENT */}
                            {activeTab === "solutions" && (
                                <>
                                    <CollapsibleSection title="Hero Solutions" isExpanded={expandedSections.solutions_hero} onToggle={() => toggleSection("solutions_hero")}>
                                        <InputField label="Titre" value={content.solutions.hero.title} onChange={(val: string) => updateContent(["solutions", "hero", "title"], val)} />
                                        <InputField label="Sous-titre" value={content.solutions.hero.subtitle} onChange={(val: string) => updateContent(["solutions", "hero", "subtitle"], val)} multiline />
                                        <InputField label="CTA Secondaire" value={content.solutions.hero.ctaSecondary} onChange={(val: string) => updateContent(["solutions", "hero", "ctaSecondary"], val)} />
                                    </CollapsibleSection>

                                    <CollapsibleSection title="Détail Plateforme (Features)" isExpanded={expandedSections.solutions_platform} onToggle={() => toggleSection("solutions_platform")}>
                                        <div className="space-y-4">
                                            <h4 className="font-bold text-navy-dark text-sm border-b pb-2">Vidéo Intelligence</h4>
                                            <InputField label="Titre" value={content.solutions.platformDetail.features.video.title} onChange={(val: string) => updateContent(["solutions", "platformDetail", "features", "video", "title"], val)} />
                                            <InputField label="Description" value={content.solutions.platformDetail.features.video.description} onChange={(val: string) => updateContent(["solutions", "platformDetail", "features", "video", "description"], val)} multiline />
                                            <InputField label="Texte CTA" value={content.solutions.platformDetail.features.video.ctaText} onChange={(val: string) => updateContent(["solutions", "platformDetail", "features", "video", "ctaText"], val)} />
                                        </div>
                                    </CollapsibleSection>
                                </>
                            )}

                            {/* INDUSTRIES TAB CONTENT */}
                            {activeTab === "industries" && (
                                <>
                                    <CollapsibleSection title="Hero Industries" isExpanded={expandedSections.industries_hero} onToggle={() => toggleSection("industries_hero")}>
                                        <InputField label="Titre" value={content.industries.hero.title} onChange={(val: string) => updateContent(["industries", "hero", "title"], val)} />
                                        <InputField label="Description" value={content.industries.hero.description} onChange={(val: string) => updateContent(["industries", "hero", "description"], val)} multiline />
                                    </CollapsibleSection>

                                    <CollapsibleSection title="Secteurs Détaillés" isExpanded={expandedSections.industries_sectors} onToggle={() => toggleSection("industries_sectors")}>
                                        <div className="space-y-8">
                                            {content.industries.sectors.map((sector, index) => (
                                                <div key={index} className="bg-zinc-50 p-6 rounded-xl border border-zinc-200 relative">
                                                    <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded text-[10px] font-bold border border-zinc-200">
                                                        {sector.id}
                                                    </div>
                                                    <h4 className="font-bold text-navy-dark mb-4">Secteur #{index + 1}: {sector.title}</h4>

                                                    <div className="space-y-4">
                                                        <InputField
                                                            label="Titre"
                                                            value={sector.title}
                                                            onChange={(val: string) => {
                                                                const newSectors = [...content.industries.sectors];
                                                                newSectors[index].title = val;
                                                                updateContent(["industries", "sectors"], newSectors);
                                                            }}
                                                        />
                                                        <InputField
                                                            label="Description"
                                                            value={sector.description}
                                                            onChange={(val: string) => {
                                                                const newSectors = [...content.industries.sectors];
                                                                newSectors[index].description = val;
                                                                updateContent(["industries", "sectors"], newSectors);
                                                            }}
                                                            multiline
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CollapsibleSection>
                                </>
                            )}

                            {/* OFFRES TAB CONTENT */}
                            {activeTab === "offres" && (
                                <>
                                    <CollapsibleSection title="Hero Offres" isExpanded={expandedSections.offres_hero} onToggle={() => toggleSection("offres_hero")}>
                                        <InputField label="Titre" value={content.offres.hero.title} onChange={(val: string) => updateContent(["offres", "hero", "title"], val)} />
                                        <InputField label="Description" value={content.offres.hero.description} onChange={(val: string) => updateContent(["offres", "hero", "description"], val)} multiline />
                                    </CollapsibleSection>

                                    <CollapsibleSection title="Packs" isExpanded={expandedSections.offres_packs} onToggle={() => toggleSection("offres_packs")}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {content.offres.packs.map((pack, index) => (
                                                <div key={index} className="p-4 bg-zinc-50 rounded-xl border border-zinc-200">
                                                    <h4 className="font-bold text-navy-dark mb-2">{pack.name}</h4>
                                                    <InputField
                                                        label="Nom du Pack"
                                                        value={pack.name}
                                                        onChange={(val: string) => {
                                                            const newPacks = [...content.offres.packs];
                                                            newPacks[index].name = val;
                                                            updateContent(["offres", "packs"], newPacks);
                                                        }}
                                                    />
                                                    <div className="mt-2"></div>
                                                    <InputField
                                                        label="Prix"
                                                        value={pack.price}
                                                        onChange={(val: string) => {
                                                            const newPacks = [...content.offres.packs];
                                                            newPacks[index].price = val;
                                                            updateContent(["offres", "packs"], newPacks);
                                                        }}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </CollapsibleSection>
                                </>
                            )}

                            {/* FOOTER TAB */}
                            {activeTab === "footer" && (
                                <CollapsibleSection title="Contenu Footer" isExpanded={true} onToggle={() => { }}>
                                    <InputField label="Mission (Texte)" value={content.footer.mission} onChange={(val: string) => updateContent(["footer", "mission"], val)} multiline />
                                    <InputField label="Description" value={content.footer.description} onChange={(val: string) => updateContent(["footer", "description"], val)} multiline />
                                    <InputField label="Copyright" value={content.footer.copyright} onChange={(val: string) => updateContent(["footer", "copyright"], val)} />
                                </CollapsibleSection>
                            )}

                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
