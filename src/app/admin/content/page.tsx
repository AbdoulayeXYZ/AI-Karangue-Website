"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Save, RotateCcw, ChevronDown, ChevronUp, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getContent, saveContent, resetContent, defaultContent, type SiteContent } from "@/lib/content";

export default function ContentPage() {
    const router = useRouter();
    const [content, setContent] = useState<SiteContent>(defaultContent);
    const [activeSection, setActiveSection] = useState("home");
    const [hasChanges, setHasChanges] = useState(false);
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
        hero: true,
        manifesto: false,
        hardware: false,
        software: false,
        tripleImpact: false,
        roiCalculator: false,
        offres: false,
        finalCta: false,
        solutions_hero: true,
        solutions_value: false,
        solutions_capabilities: false,
        solutions_hardware: false,
        solutions_ecosystem: false,
        solutions_platform: false,
        solutions_cta: false,
        industries_hero: true,
        industries_sectors: false,
        industries_other: false,
        industries_finalCta: false,
        offres_hero: true,
        offres_packs: false,
        offres_comparison: false,
        offres_services: false,
        offres_finalCta: false,
    });

    useEffect(() => {
        const isAuth = localStorage.getItem("adminAuth");
        if (!isAuth) {
            router.push("/admin/login");
        } else {
            // Load content asynchronously
            const load = async () => {
                const loadedContent = await getContent();
                setContent(loadedContent);
            };
            load();
        }
    }, [router]);

    const handleSave = async () => {
        try {
            await saveContent(content);
            setHasChanges(false);
            alert("✅ Contenu sauvegardé avec succès !");
        } catch (e) {
            alert("❌ Erreur lors de la sauvegarde : " + e);
        }
    };

    const handleReset = async () => {
        if (confirm("⚠️ Êtes-vous sûr de vouloir réinitialiser tout le contenu ? Cette action est irréversible.")) {
            await resetContent();
            setContent(defaultContent);
            setHasChanges(false);
            alert("✅ Contenu réinitialisé !");
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
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };
    const sections = [
        { id: "home", name: "Accueil" },
        { id: "solutions", name: "Solutions" },
        { id: "industries", name: "Industries" },
        { id: "offres", name: "Offres" },
        { id: "footer", name: "Footer" },
    ];

    const InputField = ({ label, value, onChange, placeholder = "", multiline = false, rows = 3, hint = "" }: {
        label: string;
        value: string;
        onChange: (value: string) => void;
        placeholder?: string;
        multiline?: boolean;
        rows?: number;
        hint?: string;
    }) => (
        <div className="group">
            <label className="block text-xs font-black text-navy/60 uppercase tracking-wider mb-2 group-focus-within:text-teal transition-colors">
                {label}
            </label>
            {multiline ? (
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    rows={rows}
                    placeholder={placeholder}
                    className="w-full px-5 py-4 bg-zinc-50 hover:bg-zinc-100 border-2 border-transparent focus:border-teal rounded-2xl text-navy-dark placeholder:text-navy/20 focus:outline-none focus:ring-4 focus:ring-teal/10 transition-all font-medium text-base resize-y min-h-[100px]"
                />
            ) : (
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="w-full h-14 px-5 bg-zinc-50 hover:bg-zinc-100 border-2 border-transparent focus:border-teal rounded-2xl text-navy-dark placeholder:text-navy/20 focus:outline-none focus:ring-4 focus:ring-teal/10 transition-all font-medium text-base"
                />
            )}
            {hint && <p className="text-xs text-navy/40 mt-2 font-medium ml-1">{hint}</p>}
        </div>
    );

    const CollapsibleSection = ({ title, isExpanded, onToggle, children }: {
        title: string;
        isExpanded: boolean;
        onToggle: () => void;
        children: React.ReactNode;
    }) => (
        <div className="border border-zinc-200 rounded-xl overflow-hidden">
            <button
                onClick={onToggle}
                className="w-full px-6 py-4 bg-zinc-50 hover:bg-zinc-100 transition-colors flex items-center justify-between"
            >
                <h3 className="text-lg font-black text-navy-dark">{title}</h3>
                {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-navy/60" />
                ) : (
                    <ChevronDown className="w-5 h-5 text-navy/60" />
                )}
            </button>
            {isExpanded && (
                <div className="p-6 space-y-6 bg-white">
                    {children}
                </div>
            )}
        </div>
    );

    return (
        <div className="p-6 lg:p-10">
            {/* Header */}
            <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black text-navy-dark mb-2 tracking-tight">Gestion du Contenu</h1>
                    <p className="text-navy/60 font-medium">Modifiez 100% du contenu du site en temps réel</p>
                </div>

                <div className="flex gap-3">
                    <Button
                        onClick={handleReset}
                        className="h-12 px-6 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold flex items-center gap-2"
                    >
                        <RotateCcw className="w-5 h-5" />
                        Réinitialiser
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={!hasChanges}
                        className="h-12 px-6 bg-teal hover:bg-teal-light text-white rounded-xl font-bold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-teal/20"
                    >
                        <Save className="w-5 h-5" />
                        Sauvegarder{hasChanges && " *"}
                    </Button>
                </div>
            </div>

            {hasChanges && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 bg-orange-50 border-l-4 border-orange-500 rounded-r-xl p-4"
                >
                    <p className="text-orange-900 font-bold">⚠️ Vous avez des modifications non sauvegardées</p>
                </motion.div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl border border-zinc-200 p-4 sticky top-6">
                        <h3 className="text-xs font-black text-navy/60 uppercase tracking-wider mb-4 px-4">Pages</h3>
                        <div className="space-y-1">
                            {sections.map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => setActiveSection(section.id)}
                                    className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeSection === section.id
                                        ? "bg-teal text-white shadow-lg shadow-teal/20"
                                        : "text-navy/60 hover:bg-zinc-50 hover:text-navy-dark"
                                        }`}
                                >
                                    {section.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Content Editor */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Home Section */}
                    {activeSection === "home" && (
                        <>
                            {/* Hero Section */}
                            <CollapsibleSection
                                title="Section Hero"
                                isExpanded={expandedSections.hero}
                                onToggle={() => toggleSection("hero")}
                            >
                                <InputField
                                    label="Titre Principal Ligne 1"
                                    value={content.home.hero.mainTitle1}
                                    onChange={(val) => updateContent(["home", "hero", "mainTitle1"], val)}
                                    placeholder="Tranquillité"
                                />
                                <InputField
                                    label="Titre Principal Ligne 2"
                                    value={content.home.hero.mainTitle2}
                                    onChange={(val) => updateContent(["home", "hero", "mainTitle2"], val)}
                                    placeholder="d'esprit."
                                />
                                <InputField
                                    label="Texte Bouton Vidéo"
                                    value={content.home.hero.videoButtonText}
                                    onChange={(val) => updateContent(["home", "hero", "videoButtonText"], val)}
                                    placeholder="Le Film Vision"
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <InputField
                                        label="Vidéo Hero (chemin)"
                                        value={content.home.hero.heroVideoPath}
                                        onChange={(val) => updateContent(["home", "hero", "heroVideoPath"], val)}
                                        placeholder="/hero.mp4"
                                        hint="Chemin vers la vidéo de fond"
                                    />
                                    <InputField
                                        label="Vidéo Présentation (chemin)"
                                        value={content.home.hero.presentationVideoPath}
                                        onChange={(val) => updateContent(["home", "hero", "presentationVideoPath"], val)}
                                        placeholder="/presentation.mp4"
                                        hint="Vidéo du modal"
                                    />
                                </div>
                            </CollapsibleSection>

                            {/* Manifesto Section */}
                            <CollapsibleSection
                                title="Section Manifesto"
                                isExpanded={expandedSections.manifesto}
                                onToggle={() => toggleSection("manifesto")}
                            >
                                <InputField
                                    label="Titre"
                                    value={content.home.manifesto.title}
                                    onChange={(val) => updateContent(["home", "manifesto", "title"], val)}
                                    multiline
                                    rows={2}
                                    hint="Utilisez <span class='text-teal'> pour le texte en couleur teal"
                                />
                                <InputField
                                    label="Description"
                                    value={content.home.manifesto.description}
                                    onChange={(val) => updateContent(["home", "manifesto", "description"], val)}
                                    multiline
                                    rows={3}
                                />
                            </CollapsibleSection>

                            {/* Hardware Section */}
                            <CollapsibleSection
                                title="Section Matériel (Hardware)"
                                isExpanded={expandedSections.hardware}
                                onToggle={() => toggleSection("hardware")}
                            >
                                <InputField
                                    label="Label Section"
                                    value={content.home.hardware.sectionLabel}
                                    onChange={(val) => updateContent(["home", "hardware", "sectionLabel"], val)}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <InputField
                                        label="Titre Section"
                                        value={content.home.hardware.sectionTitle}
                                        onChange={(val) => updateContent(["home", "hardware", "sectionTitle"], val)}
                                    />
                                    <InputField
                                        label="Titre Highlight"
                                        value={content.home.hardware.sectionTitleHighlight}
                                        onChange={(val) => updateContent(["home", "hardware", "sectionTitleHighlight"], val)}
                                    />
                                </div>
                                <InputField
                                    label="Texte Bouton CTA"
                                    value={content.home.hardware.ctaButton}
                                    onChange={(val) => updateContent(["home", "hardware", "ctaButton"], val)}
                                />

                                <hr className="border-zinc-200 my-6" />
                                <h4 className="font-black text-navy-dark text-lg mb-4">Produits Hardware</h4>

                                {content.home.hardware.products.map((product, index) => (
                                    <div key={product.id} className="border border-zinc-200 rounded-xl p-6 space-y-4 bg-zinc-50">
                                        <h5 className="font-black text-teal">Produit {index + 1}: {product.id.toUpperCase()}</h5>
                                        <InputField
                                            label="Nom"
                                            value={product.name}
                                            onChange={(val) => {
                                                const newProducts = [...content.home.hardware.products];
                                                newProducts[index] = { ...newProducts[index], name: val };
                                                updateContent(["home", "hardware", "products"], newProducts);
                                            }}
                                        />
                                        <InputField
                                            label="Rôle"
                                            value={product.role}
                                            onChange={(val) => {
                                                const newProducts = [...content.home.hardware.products];
                                                newProducts[index] = { ...newProducts[index], role: val };
                                                updateContent(["home", "hardware", "products"], newProducts);
                                            }}
                                        />
                                        <InputField
                                            label="Target"
                                            value={product.target}
                                            onChange={(val) => {
                                                const newProducts = [...content.home.hardware.products];
                                                newProducts[index] = { ...newProducts[index], target: val };
                                                updateContent(["home", "hardware", "products"], newProducts);
                                            }}
                                            multiline
                                            rows={2}
                                        />
                                        <InputField
                                            label="Description"
                                            value={product.description}
                                            onChange={(val) => {
                                                const newProducts = [...content.home.hardware.products];
                                                newProducts[index] = { ...newProducts[index], description: val };
                                                updateContent(["home", "hardware", "products"], newProducts);
                                            }}
                                            multiline
                                            rows={3}
                                        />
                                        <div>
                                            <label className="block text-xs font-black text-navy/70 uppercase tracking-wider mb-2">
                                                Features (une par ligne)
                                            </label>
                                            <textarea
                                                value={product.features.join("\n")}
                                                onChange={(e) => {
                                                    const newProducts = [...content.home.hardware.products];
                                                    newProducts[index] = { ...newProducts[index], features: e.target.value.split("\n") };
                                                    updateContent(["home", "hardware", "products"], newProducts);
                                                }}
                                                rows={5}
                                                className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl text-navy-dark focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal transition-all font-medium resize-none"
                                            />
                                        </div>
                                        <InputField
                                            label="Chemin Image"
                                            value={product.imagePath}
                                            onChange={(val) => {
                                                const newProducts = [...content.home.hardware.products];
                                                newProducts[index] = { ...newProducts[index], imagePath: val };
                                                updateContent(["home", "hardware", "products"], newProducts);
                                            }}
                                            hint="Ex: /dsm.png"
                                        />
                                    </div>
                                ))}
                            </CollapsibleSection>

                            {/* Software Section */}
                            <CollapsibleSection
                                title="Section Logiciel (Software)"
                                isExpanded={expandedSections.software}
                                onToggle={() => toggleSection("software")}
                            >
                                <InputField
                                    label="Label Section"
                                    value={content.home.software.sectionLabel}
                                    onChange={(val) => updateContent(["home", "software", "sectionLabel"], val)}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <InputField
                                        label="Titre Section"
                                        value={content.home.software.sectionTitle}
                                        onChange={(val) => updateContent(["home", "software", "sectionTitle"], val)}
                                    />
                                    <InputField
                                        label="Titre Highlight"
                                        value={content.home.software.sectionTitleHighlight}
                                        onChange={(val) => updateContent(["home", "software", "sectionTitleHighlight"], val)}
                                    />
                                </div>
                                <InputField
                                    label="Texte Hook Bas"
                                    value={content.home.software.bottomHook}
                                    onChange={(val) => updateContent(["home", "software", "bottomHook"], val)}
                                    multiline
                                    rows={2}
                                />
                                <InputField
                                    label="Lien Bas"
                                    value={content.home.software.bottomLink}
                                    onChange={(val) => updateContent(["home", "software", "bottomLink"], val)}
                                />

                                <hr className="border-zinc-200 my-6" />
                                <h4 className="font-black text-navy-dark text-lg mb-4">Features Software</h4>

                                {content.home.software.features.map((feature, index) => (
                                    <div key={feature.id} className="border border-zinc-200 rounded-xl p-6 space-y-4 bg-zinc-50">
                                        <h5 className="font-black text-teal">Feature {index + 1}: {feature.id}</h5>
                                        <InputField
                                            label="Titre"
                                            value={feature.title}
                                            onChange={(val) => {
                                                const newFeatures = [...content.home.software.features];
                                                newFeatures[index] = { ...newFeatures[index], title: val };
                                                updateContent(["home", "software", "features"], newFeatures);
                                            }}
                                        />
                                        <InputField
                                            label="Rôle"
                                            value={feature.role}
                                            onChange={(val) => {
                                                const newFeatures = [...content.home.software.features];
                                                newFeatures[index] = { ...newFeatures[index], role: val };
                                                updateContent(["home", "software", "features"], newFeatures);
                                            }}
                                        />
                                        <InputField
                                            label="Description"
                                            value={feature.description}
                                            onChange={(val) => {
                                                const newFeatures = [...content.home.software.features];
                                                newFeatures[index] = { ...newFeatures[index], description: val };
                                                updateContent(["home", "software", "features"], newFeatures);
                                            }}
                                            multiline
                                            rows={3}
                                        />
                                        <InputField
                                            label="Chemin Image"
                                            value={feature.imagePath}
                                            onChange={(val) => {
                                                const newFeatures = [...content.home.software.features];
                                                newFeatures[index] = { ...newFeatures[index], imagePath: val };
                                                updateContent(["home", "software", "features"], newFeatures);
                                            }}
                                        />
                                        <InputField
                                            label="Texte Lien"
                                            value={feature.linkText}
                                            onChange={(val) => {
                                                const newFeatures = [...content.home.software.features];
                                                newFeatures[index] = { ...newFeatures[index], linkText: val };
                                                updateContent(["home", "software", "features"], newFeatures);
                                            }}
                                        />
                                    </div>
                                ))}
                            </CollapsibleSection>

                            {/* Triple Impact Section */}
                            <CollapsibleSection
                                title="Section Triple Impact"
                                isExpanded={expandedSections.tripleImpact}
                                onToggle={() => toggleSection("tripleImpact")}
                            >
                                <InputField
                                    label="Label Section"
                                    value={content.home.tripleImpact.sectionLabel}
                                    onChange={(val) => updateContent(["home", "tripleImpact", "sectionLabel"], val)}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <InputField
                                        label="Titre Section"
                                        value={content.home.tripleImpact.sectionTitle}
                                        onChange={(val) => updateContent(["home", "tripleImpact", "sectionTitle"], val)}
                                    />
                                    <InputField
                                        label="Titre Highlight"
                                        value={content.home.tripleImpact.sectionTitleHighlight}
                                        onChange={(val) => updateContent(["home", "tripleImpact", "sectionTitleHighlight"], val)}
                                    />
                                </div>
                                <InputField
                                    label="Description Section"
                                    value={content.home.tripleImpact.sectionDescription}
                                    onChange={(val) => updateContent(["home", "tripleImpact", "sectionDescription"], val)}
                                    multiline
                                    rows={2}
                                />

                                <hr className="border-zinc-200 my-6" />
                                <h4 className="font-black text-navy-dark text-lg mb-4">Piliers</h4>

                                {content.home.tripleImpact.pillars.map((pillar, index) => (
                                    <div key={index} className="border border-zinc-200 rounded-xl p-6 space-y-4 bg-zinc-50">
                                        <h5 className="font-black text-teal">Pilier {index + 1}</h5>
                                        <InputField
                                            label="Titre"
                                            value={pillar.title}
                                            onChange={(val) => {
                                                const newPillars = [...content.home.tripleImpact.pillars];
                                                newPillars[index] = { ...newPillars[index], title: val };
                                                updateContent(["home", "tripleImpact", "pillars"], newPillars);
                                            }}
                                        />
                                        <InputField
                                            label="Sous-titre"
                                            value={pillar.subtitle}
                                            onChange={(val) => {
                                                const newPillars = [...content.home.tripleImpact.pillars];
                                                newPillars[index] = { ...newPillars[index], subtitle: val };
                                                updateContent(["home", "tripleImpact", "pillars"], newPillars);
                                            }}
                                        />
                                        <InputField
                                            label="Description"
                                            value={pillar.description}
                                            onChange={(val) => {
                                                const newPillars = [...content.home.tripleImpact.pillars];
                                                newPillars[index] = { ...newPillars[index], description: val };
                                                updateContent(["home", "tripleImpact", "pillars"], newPillars);
                                            }}
                                            multiline
                                            rows={3}
                                        />
                                        <div>
                                            <label className="block text-xs font-black text-navy/70 uppercase tracking-wider mb-2">
                                                Bénéfices (un par ligne)
                                            </label>
                                            <textarea
                                                value={pillar.benefits.join("\n")}
                                                onChange={(e) => {
                                                    const newPillars = [...content.home.tripleImpact.pillars];
                                                    newPillars[index] = { ...newPillars[index], benefits: e.target.value.split("\n") };
                                                    updateContent(["home", "tripleImpact", "pillars"], newPillars);
                                                }}
                                                rows={3}
                                                className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl text-navy-dark focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal transition-all font-medium resize-none"
                                            />
                                        </div>
                                        <InputField
                                            label="Chemin Image"
                                            value={pillar.imagePath}
                                            onChange={(val) => {
                                                const newPillars = [...content.home.tripleImpact.pillars];
                                                newPillars[index] = { ...newPillars[index], imagePath: val };
                                                updateContent(["home", "tripleImpact", "pillars"], newPillars);
                                            }}
                                        />
                                    </div>
                                ))}
                            </CollapsibleSection>

                            {/* ROI Calculator Section */}
                            <CollapsibleSection
                                title="Section ROI Calculator"
                                isExpanded={expandedSections.roiCalculator}
                                onToggle={() => toggleSection("roiCalculator")}
                            >
                                <InputField
                                    label="Label Section"
                                    value={content.home.roiCalculator.sectionLabel}
                                    onChange={(val) => updateContent(["home", "roiCalculator", "sectionLabel"], val)}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <InputField
                                        label="Titre Section"
                                        value={content.home.roiCalculator.sectionTitle}
                                        onChange={(val) => updateContent(["home", "roiCalculator", "sectionTitle"], val)}
                                    />
                                    <InputField
                                        label="Titre Highlight"
                                        value={content.home.roiCalculator.sectionTitleHighlight}
                                        onChange={(val) => updateContent(["home", "roiCalculator", "sectionTitleHighlight"], val)}
                                    />
                                </div>
                                <InputField
                                    label="Description Section"
                                    value={content.home.roiCalculator.sectionDescription}
                                    onChange={(val) => updateContent(["home", "roiCalculator", "sectionDescription"], val)}
                                    multiline
                                    rows={2}
                                />

                                <hr className="border-zinc-200 my-6" />
                                <h4 className="font-black text-navy-dark text-lg mb-4">Labels Formulaire</h4>

                                <div className="grid grid-cols-2 gap-4">
                                    {Object.entries(content.home.roiCalculator.labels).map(([key, value]) => (
                                        <InputField
                                            key={key}
                                            label={key}
                                            value={value}
                                            onChange={(val) => {
                                                const newLabels = { ...content.home.roiCalculator.labels, [key]: val };
                                                updateContent(["home", "roiCalculator", "labels"], newLabels);
                                            }}
                                        />
                                    ))}
                                </div>

                                <hr className="border-zinc-200 my-6" />
                                <div>
                                    <label className="block text-xs font-black text-navy/70 uppercase tracking-wider mb-2">
                                        Secteurs (un par ligne)
                                    </label>
                                    <textarea
                                        value={content.home.roiCalculator.sectors.join("\n")}
                                        onChange={(e) => updateContent(["home", "roiCalculator", "sectors"], e.target.value.split("\n"))}
                                        rows={5}
                                        className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-navy-dark focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal transition-all font-medium resize-none"
                                    />
                                </div>
                            </CollapsibleSection>

                            {/* Offres Section */}
                            <CollapsibleSection
                                title="Section Offres (Pricing)"
                                isExpanded={expandedSections.offres}
                                onToggle={() => toggleSection("offres")}
                            >
                                <InputField
                                    label="Label Section"
                                    value={content.home.offres.sectionLabel}
                                    onChange={(val) => updateContent(["home", "offres", "sectionLabel"], val)}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <InputField
                                        label="Titre Section"
                                        value={content.home.offres.sectionTitle}
                                        onChange={(val) => updateContent(["home", "offres", "sectionTitle"], val)}
                                    />
                                    <InputField
                                        label="Titre Highlight"
                                        value={content.home.offres.sectionTitleHighlight}
                                        onChange={(val) => updateContent(["home", "offres", "sectionTitleHighlight"], val)}
                                    />
                                </div>
                                <InputField
                                    label="Description Section"
                                    value={content.home.offres.sectionDescription}
                                    onChange={(val) => updateContent(["home", "offres", "sectionDescription"], val)}
                                    multiline
                                    rows={2}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <InputField
                                        label="Texte Bouton CTA"
                                        value={content.home.offres.ctaButton}
                                        onChange={(val) => updateContent(["home", "offres", "ctaButton"], val)}
                                    />
                                    <InputField
                                        label="Texte Bas de Page"
                                        value={content.home.offres.bottomText}
                                        onChange={(val) => updateContent(["home", "offres", "bottomText"], val)}
                                    />
                                </div>
                                <InputField
                                    label="Lien Bas de Page"
                                    value={content.home.offres.bottomLink}
                                    onChange={(val) => updateContent(["home", "offres", "bottomLink"], val)}
                                />

                                <hr className="border-zinc-200 my-6" />
                                <h4 className="font-black text-navy-dark text-lg mb-4">Packs de Pricing</h4>
                                <p className="text-sm text-navy/60 mb-4">⚠️ Ordre: Basic, Tranquillité (centre), Standard</p>

                                {content.home.offres.packs.map((pack, index) => (
                                    <div key={index} className="border border-zinc-200 rounded-xl p-6 space-y-4 bg-zinc-50">
                                        <div className="flex items-center justify-between">
                                            <h5 className="font-black text-teal">Pack {index + 1}: {pack.name}</h5>
                                            {pack.popular && (
                                                <span className="bg-teal text-white px-3 py-1 rounded-full text-xs font-black">
                                                    RECOMMANDÉ
                                                </span>
                                            )}
                                        </div>
                                        <InputField
                                            label="Nom du Pack"
                                            value={pack.name}
                                            onChange={(val) => {
                                                const newPacks = [...content.home.offres.packs];
                                                newPacks[index] = { ...newPacks[index], name: val };
                                                updateContent(["home", "offres", "packs"], newPacks);
                                            }}
                                        />
                                        <InputField
                                            label="Tagline"
                                            value={pack.tagline}
                                            onChange={(val) => {
                                                const newPacks = [...content.home.offres.packs];
                                                newPacks[index] = { ...newPacks[index], tagline: val };
                                                updateContent(["home", "offres", "packs"], newPacks);
                                            }}
                                        />
                                        <div>
                                            <label className="block text-xs font-black text-navy/70 uppercase tracking-wider mb-2">
                                                Features (une par ligne)
                                            </label>
                                            <textarea
                                                value={pack.features.join("\n")}
                                                onChange={(e) => {
                                                    const newPacks = [...content.home.offres.packs];
                                                    newPacks[index] = { ...newPacks[index], features: e.target.value.split("\n") };
                                                    updateContent(["home", "offres", "packs"], newPacks);
                                                }}
                                                rows={pack.features.length}
                                                className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl text-navy-dark focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal transition-all font-medium resize-none"
                                            />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={pack.popular}
                                                onChange={(e) => {
                                                    const newPacks = [...content.home.offres.packs];
                                                    newPacks[index] = { ...newPacks[index], popular: e.target.checked };
                                                    updateContent(["home", "offres", "packs"], newPacks);
                                                }}
                                                className="w-5 h-5 rounded border-zinc-300 text-teal focus:ring-teal"
                                            />
                                            <label className="text-sm font-bold text-navy-dark">
                                                Marquer comme Recommandé (Popular)
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </CollapsibleSection>

                            {/* Final CTA Section */}
                            <CollapsibleSection
                                title="Section CTA Final"
                                isExpanded={expandedSections.finalCta}
                                onToggle={() => toggleSection("finalCta")}
                            >
                                <InputField
                                    label="Titre"
                                    value={content.home.finalCta.title}
                                    onChange={(val) => updateContent(["home", "finalCta", "title"], val)}
                                    multiline
                                    rows={2}
                                    hint="Utilisez <br /> pour les sauts de ligne et <span class='text-teal'> pour la couleur"
                                />
                                <InputField
                                    label="Description"
                                    value={content.home.finalCta.description}
                                    onChange={(val) => updateContent(["home", "finalCta", "description"], val)}
                                    multiline
                                    rows={2}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <InputField
                                        label="Bouton Primaire"
                                        value={content.home.finalCta.ctaPrimary}
                                        onChange={(val) => updateContent(["home", "finalCta", "ctaPrimary"], val)}
                                    />
                                    <InputField
                                        label="Bouton Secondaire"
                                        value={content.home.finalCta.ctaSecondary}
                                        onChange={(val) => updateContent(["home", "finalCta", "ctaSecondary"], val)}
                                    />
                                </div>
                            </CollapsibleSection>
                        </>
                    )}

                    {/* Solutions Section */}
                    {activeSection === "solutions" && (
                        <>
                            {/* Hero Section */}
                            <CollapsibleSection
                                title="Section Hero"
                                isExpanded={expandedSections.solutions_hero}
                                onToggle={() => toggleSection("solutions_hero")}
                            >
                                <div className="grid grid-cols-2 gap-4">
                                    <InputField
                                        label="Titre Principal"
                                        value={content.solutions.hero.title}
                                        onChange={(val) => updateContent(["solutions", "hero", "title"], val)}
                                    />
                                    <InputField
                                        label="Titre Highlight"
                                        value={content.solutions.hero.titleHighlight}
                                        onChange={(val) => updateContent(["solutions", "hero", "titleHighlight"], val)}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <InputField
                                        label="Sous-titre"
                                        value={content.solutions.hero.subtitle}
                                        onChange={(val) => updateContent(["solutions", "hero", "subtitle"], val)}
                                    />
                                    <InputField
                                        label="Sous-titre Highlight"
                                        value={content.solutions.hero.subtitleHighlight}
                                        onChange={(val) => updateContent(["solutions", "hero", "subtitleHighlight"], val)}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <InputField
                                        label="Bouton Primaire"
                                        value={content.solutions.hero.ctaPrimary}
                                        onChange={(val) => updateContent(["solutions", "hero", "ctaPrimary"], val)}
                                    />
                                    <InputField
                                        label="Bouton Secondaire"
                                        value={content.solutions.hero.ctaSecondary}
                                        onChange={(val) => updateContent(["solutions", "hero", "ctaSecondary"], val)}
                                    />
                                </div>
                                <InputField
                                    label="Chemin Vidéo"
                                    value={content.solutions.hero.videoPath}
                                    onChange={(val) => updateContent(["solutions", "hero", "videoPath"], val)}
                                />
                            </CollapsibleSection>

                            {/* Value Section */}
                            <CollapsibleSection
                                title="Section Valeur (Value)"
                                isExpanded={expandedSections.solutions_value}
                                onToggle={() => toggleSection("solutions_value")}
                            >
                                <InputField
                                    label="Label Section"
                                    value={content.solutions.value.sectionLabel}
                                    onChange={(val) => updateContent(["solutions", "value", "sectionLabel"], val)}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <InputField
                                        label="Titre Section"
                                        value={content.solutions.value.sectionTitle}
                                        onChange={(val) => updateContent(["solutions", "value", "sectionTitle"], val)}
                                    />
                                    <InputField
                                        label="Titre Highlight"
                                        value={content.solutions.value.sectionTitleHighlight}
                                        onChange={(val) => updateContent(["solutions", "value", "sectionTitleHighlight"], val)}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <InputField
                                        label="Description Section"
                                        value={content.solutions.value.sectionDescription}
                                        onChange={(val) => updateContent(["solutions", "value", "sectionDescription"], val)}
                                    />
                                    <InputField
                                        label="Description Highlight"
                                        value={content.solutions.value.sectionDescriptionHighlight}
                                        onChange={(val) => updateContent(["solutions", "value", "sectionDescriptionHighlight"], val)}
                                    />
                                </div>

                                <hr className="border-zinc-200 my-6" />
                                <h4 className="font-black text-navy-dark text-lg mb-4">Cartes Valeur</h4>

                                {content.solutions.value.cards.map((card, index) => (
                                    <div key={index} className="border border-zinc-200 rounded-xl p-6 space-y-4 bg-zinc-50">
                                        <h5 className="font-black text-teal">Carte {index + 1}: {card.title}</h5>
                                        <InputField
                                            label="Titre"
                                            value={card.title}
                                            onChange={(val) => {
                                                const newCards = [...content.solutions.value.cards];
                                                newCards[index] = { ...newCards[index], title: val };
                                                updateContent(["solutions", "value", "cards"], newCards);
                                            }}
                                        />
                                        <InputField
                                            label="Icône"
                                            value={card.icon}
                                            onChange={(val) => {
                                                const newCards = [...content.solutions.value.cards];
                                                newCards[index] = { ...newCards[index], icon: val };
                                                updateContent(["solutions", "value", "cards"], newCards);
                                            }}
                                        />
                                        <div className="grid grid-cols-2 gap-4">
                                            <InputField
                                                label="Problème"
                                                value={card.problem}
                                                onChange={(val) => {
                                                    const newCards = [...content.solutions.value.cards];
                                                    newCards[index] = { ...newCards[index], problem: val };
                                                    updateContent(["solutions", "value", "cards"], newCards);
                                                }}
                                                multiline
                                                rows={2}
                                            />
                                            <InputField
                                                label="Highlight Problème"
                                                value={card.problemHighlight}
                                                onChange={(val) => {
                                                    const newCards = [...content.solutions.value.cards];
                                                    newCards[index] = { ...newCards[index], problemHighlight: val };
                                                    updateContent(["solutions", "value", "cards"], newCards);
                                                }}
                                                multiline
                                                rows={2}
                                            />
                                        </div>
                                        <InputField
                                            label="Label Solution"
                                            value={card.solutionLabel}
                                            onChange={(val) => {
                                                const newCards = [...content.solutions.value.cards];
                                                newCards[index] = { ...newCards[index], solutionLabel: val };
                                                updateContent(["solutions", "value", "cards"], newCards);
                                            }}
                                        />
                                        <div>
                                            <label className="block text-xs font-black text-navy/70 uppercase tracking-wider mb-2">
                                                Bénéfices (un par ligne)
                                            </label>
                                            <textarea
                                                value={card.benefits.join("\n")}
                                                onChange={(e) => {
                                                    const newCards = [...content.solutions.value.cards];
                                                    newCards[index] = { ...newCards[index], benefits: e.target.value.split("\n") };
                                                    updateContent(["solutions", "value", "cards"], newCards);
                                                }}
                                                rows={4}
                                                className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl text-navy-dark focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal transition-all font-medium resize-none"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <InputField
                                                label="Valeur Stat"
                                                value={card.statValue}
                                                onChange={(val) => {
                                                    const newCards = [...content.solutions.value.cards];
                                                    newCards[index] = { ...newCards[index], statValue: val };
                                                    updateContent(["solutions", "value", "cards"], newCards);
                                                }}
                                            />
                                            <InputField
                                                label="Label Stat"
                                                value={card.statLabel}
                                                onChange={(val) => {
                                                    const newCards = [...content.solutions.value.cards];
                                                    newCards[index] = { ...newCards[index], statLabel: val };
                                                    updateContent(["solutions", "value", "cards"], newCards);
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </CollapsibleSection>

                            {/* Capabilities Section */}
                            <CollapsibleSection
                                title="Section Capacités (Capabilities)"
                                isExpanded={expandedSections.solutions_capabilities}
                                onToggle={() => toggleSection("solutions_capabilities")}
                            >
                                <InputField
                                    label="Label Section"
                                    value={content.solutions.capabilities.sectionLabel}
                                    onChange={(val) => updateContent(["solutions", "capabilities", "sectionLabel"], val)}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <InputField
                                        label="Titre Section"
                                        value={content.solutions.capabilities.sectionTitle}
                                        onChange={(val) => updateContent(["solutions", "capabilities", "sectionTitle"], val)}
                                    />
                                    <InputField
                                        label="Titre Highlight"
                                        value={content.solutions.capabilities.sectionTitleHighlight}
                                        onChange={(val) => updateContent(["solutions", "capabilities", "sectionTitleHighlight"], val)}
                                    />
                                </div>
                                <InputField
                                    label="Description Section"
                                    value={content.solutions.capabilities.sectionDescription}
                                    onChange={(val) => updateContent(["solutions", "capabilities", "sectionDescription"], val)}
                                    multiline
                                    rows={2}
                                />

                                <hr className="border-zinc-200 my-6" />
                                <h4 className="font-black text-navy-dark text-lg mb-4">Modules</h4>

                                {content.solutions.capabilities.modules.map((module, index) => (
                                    <div key={index} className="border border-zinc-200 rounded-xl p-6 space-y-4 bg-zinc-50">
                                        <h5 className="font-black text-teal">Module {index + 1}: {module.title}</h5>
                                        <InputField
                                            label="Titre"
                                            value={module.title}
                                            onChange={(val) => {
                                                const newModules = [...content.solutions.capabilities.modules];
                                                newModules[index] = { ...newModules[index], title: val };
                                                updateContent(["solutions", "capabilities", "modules"], newModules);
                                            }}
                                        />
                                        <InputField
                                            label="Impact"
                                            value={module.impact}
                                            onChange={(val) => {
                                                const newModules = [...content.solutions.capabilities.modules];
                                                newModules[index] = { ...newModules[index], impact: val };
                                                updateContent(["solutions", "capabilities", "modules"], newModules);
                                            }}
                                        />
                                        <div>
                                            <label className="block text-xs font-black text-navy/70 uppercase tracking-wider mb-2">
                                                Features (une par ligne)
                                            </label>
                                            <textarea
                                                value={module.features.join("\n")}
                                                onChange={(e) => {
                                                    const newModules = [...content.solutions.capabilities.modules];
                                                    newModules[index] = { ...newModules[index], features: e.target.value.split("\n") };
                                                    updateContent(["solutions", "capabilities", "modules"], newModules);
                                                }}
                                                rows={4}
                                                className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl text-navy-dark focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal transition-all font-medium resize-none"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </CollapsibleSection>

                            {/* Hardware Section */}
                            <CollapsibleSection
                                title="Section Hardware"
                                isExpanded={expandedSections.solutions_hardware}
                                onToggle={() => toggleSection("solutions_hardware")}
                            >
                                <InputField
                                    label="Label Section"
                                    value={content.solutions.hardware.sectionLabel}
                                    onChange={(val) => updateContent(["solutions", "hardware", "sectionLabel"], val)}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <InputField
                                        label="Titre Section"
                                        value={content.solutions.hardware.sectionTitle}
                                        onChange={(val) => updateContent(["solutions", "hardware", "sectionTitle"], val)}
                                    />
                                    <InputField
                                        label="Titre Highlight"
                                        value={content.solutions.hardware.sectionTitleHighlight}
                                        onChange={(val) => updateContent(["solutions", "hardware", "sectionTitleHighlight"], val)}
                                    />
                                </div>
                                <InputField
                                    label="Description Section"
                                    value={content.solutions.hardware.sectionDescription}
                                    onChange={(val) => updateContent(["solutions", "hardware", "sectionDescription"], val)}
                                    multiline
                                    rows={2}
                                />

                                <hr className="border-zinc-200 my-6" />
                                <h4 className="font-black text-navy-dark text-lg mb-4">Items Hardware</h4>

                                {content.solutions.hardware.items.map((item, index) => (
                                    <div key={item.id} className="border border-zinc-200 rounded-xl p-6 space-y-4 bg-zinc-50">
                                        <h5 className="font-black text-teal">Item {index + 1}: {item.title}</h5>
                                        <InputField
                                            label="Label"
                                            value={item.label}
                                            onChange={(val) => {
                                                const newItems = [...content.solutions.hardware.items];
                                                newItems[index] = { ...newItems[index], label: val };
                                                updateContent(["solutions", "hardware", "items"], newItems);
                                            }}
                                        />
                                        <InputField
                                            label="Titre"
                                            value={item.title}
                                            onChange={(val) => {
                                                const newItems = [...content.solutions.hardware.items];
                                                newItems[index] = { ...newItems[index], title: val };
                                                updateContent(["solutions", "hardware", "items"], newItems);
                                            }}
                                        />
                                        <InputField
                                            label="Description"
                                            value={item.description}
                                            onChange={(val) => {
                                                const newItems = [...content.solutions.hardware.items];
                                                newItems[index] = { ...newItems[index], description: val };
                                                updateContent(["solutions", "hardware", "items"], newItems);
                                            }}
                                            multiline
                                            rows={3}
                                        />
                                        <div className="grid grid-cols-2 gap-4">
                                            <InputField
                                                label="Highlight 1"
                                                value={item.highlight1}
                                                onChange={(val) => {
                                                    const newItems = [...content.solutions.hardware.items];
                                                    newItems[index] = { ...newItems[index], highlight1: val };
                                                    updateContent(["solutions", "hardware", "items"], newItems);
                                                }}
                                            />
                                            <InputField
                                                label="Highlight 2"
                                                value={item.highlight2}
                                                onChange={(val) => {
                                                    const newItems = [...content.solutions.hardware.items];
                                                    newItems[index] = { ...newItems[index], highlight2: val };
                                                    updateContent(["solutions", "hardware", "items"], newItems);
                                                }}
                                            />
                                        </div>
                                        <InputField
                                            label="Label Bénéfices"
                                            value={item.benefitsLabel}
                                            onChange={(val) => {
                                                const newItems = [...content.solutions.hardware.items];
                                                newItems[index] = { ...newItems[index], benefitsLabel: val };
                                                updateContent(["solutions", "hardware", "items"], newItems);
                                            }}
                                        />
                                        <div>
                                            <label className="block text-xs font-black text-navy/70 uppercase tracking-wider mb-2">
                                                Bénéfices (un par ligne)
                                            </label>
                                            <textarea
                                                value={item.benefits.join("\n")}
                                                onChange={(e) => {
                                                    const newItems = [...content.solutions.hardware.items];
                                                    newItems[index] = { ...newItems[index], benefits: e.target.value.split("\n") };
                                                    updateContent(["solutions", "hardware", "items"], newItems);
                                                }}
                                                rows={4}
                                                className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl text-navy-dark focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal transition-all font-medium resize-none"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <InputField
                                                label="Texte CTA"
                                                value={item.ctaText}
                                                onChange={(val) => {
                                                    const newItems = [...content.solutions.hardware.items];
                                                    newItems[index] = { ...newItems[index], ctaText: val };
                                                    updateContent(["solutions", "hardware", "items"], newItems);
                                                }}
                                            />
                                            <InputField
                                                label="Chemin Image"
                                                value={item.imagePath}
                                                onChange={(val) => {
                                                    const newItems = [...content.solutions.hardware.items];
                                                    newItems[index] = { ...newItems[index], imagePath: val };
                                                    updateContent(["solutions", "hardware", "items"], newItems);
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </CollapsibleSection>

                            {/* Ecosystem Section */}
                            <CollapsibleSection
                                title="Section Écosystème"
                                isExpanded={expandedSections.solutions_ecosystem}
                                onToggle={() => toggleSection("solutions_ecosystem")}
                            >
                                <InputField
                                    label="Titre"
                                    value={content.solutions.ecosystem.title}
                                    onChange={(val) => updateContent(["solutions", "ecosystem", "title"], val)}
                                />
                                {content.solutions.ecosystem.items.map((item, index) => (
                                    <div key={index} className="border border-zinc-200 rounded-xl p-6 space-y-4 bg-zinc-50 mt-4">
                                        <h5 className="font-black text-teal">Item {index + 1}</h5>
                                        <InputField
                                            label="Titre"
                                            value={item.title}
                                            onChange={(val) => {
                                                const newItems = [...content.solutions.ecosystem.items];
                                                newItems[index] = { ...newItems[index], title: val };
                                                updateContent(["solutions", "ecosystem", "items"], newItems);
                                            }}
                                        />
                                        <InputField
                                            label="Description"
                                            value={item.description}
                                            onChange={(val) => {
                                                const newItems = [...content.solutions.ecosystem.items];
                                                newItems[index] = { ...newItems[index], description: val };
                                                updateContent(["solutions", "ecosystem", "items"], newItems);
                                            }}
                                            multiline
                                            rows={2}
                                        />
                                    </div>
                                ))}
                            </CollapsibleSection>

                            {/* Platform Detail Section */}
                            <CollapsibleSection
                                title="Section Détail Plateforme"
                                isExpanded={expandedSections.solutions_platform}
                                onToggle={() => toggleSection("solutions_platform")}
                            >
                                <InputField
                                    label="Label Section"
                                    value={content.solutions.platformDetail.sectionLabel}
                                    onChange={(val) => updateContent(["solutions", "platformDetail", "sectionLabel"], val)}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <InputField
                                        label="Titre Section"
                                        value={content.solutions.platformDetail.sectionTitle}
                                        onChange={(val) => updateContent(["solutions", "platformDetail", "sectionTitle"], val)}
                                    />
                                    <InputField
                                        label="Titre Highlight"
                                        value={content.solutions.platformDetail.sectionTitleHighlight}
                                        onChange={(val) => updateContent(["solutions", "platformDetail", "sectionTitleHighlight"], val)}
                                    />
                                </div>
                                <InputField
                                    label="Description Section"
                                    value={content.solutions.platformDetail.sectionDescription}
                                    onChange={(val) => updateContent(["solutions", "platformDetail", "sectionDescription"], val)}
                                    multiline
                                    rows={2}
                                />

                                <hr className="border-zinc-200 my-6" />
                                <h4 className="font-black text-navy-dark text-lg mb-4">Features</h4>

                                {/* Tracking */}
                                <div className="border border-zinc-200 rounded-xl p-6 space-y-4 bg-zinc-50 mb-4">
                                    <h5 className="font-black text-teal">Tracking</h5>
                                    <InputField
                                        label="Titre"
                                        value={content.solutions.platformDetail.features.tracking.title}
                                        onChange={(val) => updateContent(["solutions", "platformDetail", "features", "tracking", "title"], val)}
                                    />
                                    <InputField
                                        label="Description"
                                        value={content.solutions.platformDetail.features.tracking.description}
                                        onChange={(val) => updateContent(["solutions", "platformDetail", "features", "tracking", "description"], val)}
                                        multiline
                                        rows={3}
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <InputField
                                            label="Label Statut"
                                            value={content.solutions.platformDetail.features.tracking.statusLabel}
                                            onChange={(val) => updateContent(["solutions", "platformDetail", "features", "tracking", "statusLabel"], val)}
                                        />
                                        <InputField
                                            label="Valeur Statut"
                                            value={content.solutions.platformDetail.features.tracking.statusValue}
                                            onChange={(val) => updateContent(["solutions", "platformDetail", "features", "tracking", "statusValue"], val)}
                                        />
                                    </div>
                                </div>

                                {/* Dashboard */}
                                <div className="border border-zinc-200 rounded-xl p-6 space-y-4 bg-zinc-50 mb-4">
                                    <h5 className="font-black text-teal">Dashboard</h5>
                                    <InputField
                                        label="Titre"
                                        value={content.solutions.platformDetail.features.dashboard.title}
                                        onChange={(val) => updateContent(["solutions", "platformDetail", "features", "dashboard", "title"], val)}
                                    />
                                    <InputField
                                        label="Description"
                                        value={content.solutions.platformDetail.features.dashboard.description}
                                        onChange={(val) => updateContent(["solutions", "platformDetail", "features", "dashboard", "description"], val)}
                                        multiline
                                        rows={3}
                                    />
                                </div>

                                {/* Video */}
                                <div className="border border-zinc-200 rounded-xl p-6 space-y-4 bg-zinc-50 mb-4">
                                    <h5 className="font-black text-teal">Vidéo</h5>
                                    <InputField
                                        label="Titre"
                                        value={content.solutions.platformDetail.features.video.title}
                                        onChange={(val) => updateContent(["solutions", "platformDetail", "features", "video", "title"], val)}
                                    />
                                    <InputField
                                        label="Description"
                                        value={content.solutions.platformDetail.features.video.description}
                                        onChange={(val) => updateContent(["solutions", "platformDetail", "features", "video", "description"], val)}
                                        multiline
                                        rows={3}
                                    />
                                    <InputField
                                        label="Texte CTA"
                                        value={content.solutions.platformDetail.features.video.ctaText}
                                        onChange={(val) => updateContent(["solutions", "platformDetail", "features", "video", "ctaText"], val)}
                                    />
                                </div>

                                {/* Geofencing */}
                                <div className="border border-zinc-200 rounded-xl p-6 space-y-4 bg-zinc-50 mb-4">
                                    <h5 className="font-black text-teal">Geofencing</h5>
                                    <InputField
                                        label="Titre"
                                        value={content.solutions.platformDetail.features.geofencing.title}
                                        onChange={(val) => updateContent(["solutions", "platformDetail", "features", "geofencing", "title"], val)}
                                    />
                                    <InputField
                                        label="Description"
                                        value={content.solutions.platformDetail.features.geofencing.description}
                                        onChange={(val) => updateContent(["solutions", "platformDetail", "features", "geofencing", "description"], val)}
                                        multiline
                                        rows={3}
                                    />
                                    <InputField
                                        label="Label Alerte"
                                        value={content.solutions.platformDetail.features.geofencing.alertLabel}
                                        onChange={(val) => updateContent(["solutions", "platformDetail", "features", "geofencing", "alertLabel"], val)}
                                    />
                                </div>
                            </CollapsibleSection>

                            {/* Final CTA Section */}
                            <CollapsibleSection
                                title="Section CTA Final"
                                isExpanded={expandedSections.solutions_cta}
                                onToggle={() => toggleSection("solutions_cta")}
                            >
                                <div className="grid grid-cols-2 gap-4">
                                    <InputField
                                        label="Titre"
                                        value={content.solutions.finalCta.title}
                                        onChange={(val) => updateContent(["solutions", "finalCta", "title"], val)}
                                    />
                                    <InputField
                                        label="Titre Highlight"
                                        value={content.solutions.finalCta.titleHighlight}
                                        onChange={(val) => updateContent(["solutions", "finalCta", "titleHighlight"], val)}
                                    />
                                </div>
                                <InputField
                                    label="Description"
                                    value={content.solutions.finalCta.description}
                                    onChange={(val) => updateContent(["solutions", "finalCta", "description"], val)}
                                    multiline
                                    rows={2}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <InputField
                                        label="Bouton Primaire"
                                        value={content.solutions.finalCta.ctaPrimary}
                                        onChange={(val) => updateContent(["solutions", "finalCta", "ctaPrimary"], val)}
                                    />
                                    <InputField
                                        label="Bouton Secondaire"
                                        value={content.solutions.finalCta.ctaSecondary}
                                        onChange={(val) => updateContent(["solutions", "finalCta", "ctaSecondary"], val)}
                                    />
                                </div>
                            </CollapsibleSection>
                        </>
                    )}

                    {/* Industries Section */}
                    {activeSection === "industries" && content.industries && (
                        <>
                            <CollapsibleSection
                                title="Hero Section"
                                isExpanded={expandedSections.industries_hero}
                                onToggle={() => toggleSection("industries_hero")}
                            >
                                <InputField
                                    label="Label (Petit Titre)"
                                    value={content.industries.hero.label}
                                    onChange={(val) => updateContent(["industries", "hero", "label"], val)}
                                />
                                <InputField
                                    label="Titre Principal"
                                    value={content.industries.hero.title}
                                    onChange={(val) => updateContent(["industries", "hero", "title"], val)}
                                />
                                <InputField
                                    label="Titre Surligné (Teal)"
                                    value={content.industries.hero.titleHighlight}
                                    onChange={(val) => updateContent(["industries", "hero", "titleHighlight"], val)}
                                />
                                <InputField
                                    label="Description"
                                    value={content.industries.hero.description}
                                    onChange={(val) => updateContent(["industries", "hero", "description"], val)}
                                    multiline
                                />
                            </CollapsibleSection>

                            <CollapsibleSection
                                title="Secteurs Détaillés"
                                isExpanded={expandedSections.industries_sectors}
                                onToggle={() => toggleSection("industries_sectors")}
                            >
                                {content.industries.sectors.map((sector, index) => (
                                    <div key={index} className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 mb-4">
                                        <h4 className="font-bold text-navy-dark mb-4 border-b border-zinc-200 pb-2">Secteur {index + 1} ({sector.title})</h4>
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <InputField
                                                    label="Titre"
                                                    value={sector.title}
                                                    onChange={(val) => {
                                                        const newSectors = [...content.industries.sectors];
                                                        newSectors[index].title = val;
                                                        updateContent(["industries", "sectors"], newSectors);
                                                    }}
                                                />
                                                <InputField
                                                    label="Highlight"
                                                    value={sector.highlight}
                                                    onChange={(val) => {
                                                        const newSectors = [...content.industries.sectors];
                                                        newSectors[index].highlight = val;
                                                        updateContent(["industries", "sectors"], newSectors);
                                                    }}
                                                />
                                            </div>
                                            <InputField
                                                label="Description"
                                                value={sector.description}
                                                onChange={(val) => {
                                                    const newSectors = [...content.industries.sectors];
                                                    newSectors[index].description = val;
                                                    updateContent(["industries", "sectors"], newSectors);
                                                }}
                                                multiline
                                            />
                                            <InputField
                                                label="Texte Bouton CTA"
                                                value={sector.ctaText}
                                                onChange={(val) => {
                                                    const newSectors = [...content.industries.sectors];
                                                    newSectors[index].ctaText = val;
                                                    updateContent(["industries", "sectors"], newSectors);
                                                }}
                                            />
                                            <InputField
                                                label="Chemin Image"
                                                value={sector.imagePath}
                                                onChange={(val) => {
                                                    const newSectors = [...content.industries.sectors];
                                                    newSectors[index].imagePath = val;
                                                    updateContent(["industries", "sectors"], newSectors);
                                                }}
                                            />

                                            {/* Dynamic Stats/Features Editing could be complex, simple fix for now is manual editing of raw array or simplified fields. 
                                                Lets implement simpler direct access for stats if they exist.
                                            */}
                                            {sector.type === 'stats' && (
                                                <div className="space-y-2">
                                                    <label className="text-xs font-black uppercase tracking-wider">Statistiques (Label : Valeur)</label>
                                                    {sector.stats.map((stat, sIndex) => (
                                                        <div key={sIndex} className="grid grid-cols-2 gap-2">
                                                            <input
                                                                type="text"
                                                                value={stat.label}
                                                                onChange={(e) => {
                                                                    const newSectors = [...content.industries.sectors];
                                                                    newSectors[index].stats[sIndex].label = e.target.value;
                                                                    updateContent(["industries", "sectors"], newSectors);
                                                                }}
                                                                className="px-3 py-2 rounded-lg border border-zinc-200 text-sm"
                                                                placeholder="Label"
                                                            />
                                                            <input
                                                                type="text"
                                                                value={stat.value}
                                                                onChange={(e) => {
                                                                    const newSectors = [...content.industries.sectors];
                                                                    newSectors[index].stats[sIndex].value = e.target.value;
                                                                    updateContent(["industries", "sectors"], newSectors);
                                                                }}
                                                                className="px-3 py-2 rounded-lg border border-zinc-200 text-sm"
                                                                placeholder="Valeur"
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {sector.type === 'list' && (
                                                <div className="space-y-2">
                                                    <label className="text-xs font-black uppercase tracking-wider">Fonctionnalités</label>
                                                    {sector.features.map((feat, fIndex) => (
                                                        <input
                                                            key={fIndex}
                                                            type="text"
                                                            value={feat}
                                                            onChange={(e) => {
                                                                const newSectors = [...content.industries.sectors];
                                                                newSectors[index].features[fIndex] = e.target.value;
                                                                updateContent(["industries", "sectors"], newSectors);
                                                            }}
                                                            className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-sm mb-1"
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </CollapsibleSection>

                            <CollapsibleSection
                                title="Autres Secteurs (Grille)"
                                isExpanded={expandedSections.industries_other}
                                onToggle={() => toggleSection("industries_other")}
                            >
                                {content.industries.otherSectors.map((other, index) => (
                                    <div key={index} className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 mb-4">
                                        <div className="space-y-4">
                                            <InputField
                                                label="Titre"
                                                value={other.title}
                                                onChange={(val) => {
                                                    const newOthers = [...content.industries.otherSectors];
                                                    newOthers[index].title = val;
                                                    updateContent(["industries", "otherSectors"], newOthers);
                                                }}
                                            />
                                            <InputField
                                                label="Description"
                                                value={other.description}
                                                onChange={(val) => {
                                                    const newOthers = [...content.industries.otherSectors];
                                                    newOthers[index].description = val;
                                                    updateContent(["industries", "otherSectors"], newOthers);
                                                }}
                                                multiline
                                            />
                                        </div>
                                    </div>
                                ))}
                            </CollapsibleSection>

                            <CollapsibleSection
                                title="Appel à l'Action Final"
                                isExpanded={expandedSections.industries_finalCta}
                                onToggle={() => toggleSection("industries_finalCta")}
                            >
                                <InputField
                                    label="TitreLigne 1"
                                    value={content.industries.finalCta.title}
                                    onChange={(val) => updateContent(["industries", "finalCta", "title"], val)}
                                />
                                <InputField
                                    label="Titre Ligne 2 (Teal)"
                                    value={content.industries.finalCta.titleHighlight}
                                    onChange={(val) => updateContent(["industries", "finalCta", "titleHighlight"], val)}
                                />
                                <InputField
                                    label="Description"
                                    value={content.industries.finalCta.description}
                                    onChange={(val) => updateContent(["industries", "finalCta", "description"], val)}
                                    multiline
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <InputField
                                        label="Bouton Primaire"
                                        value={content.industries.finalCta.ctaPrimary}
                                        onChange={(val) => updateContent(["industries", "finalCta", "ctaPrimary"], val)}
                                    />
                                    <InputField
                                        label="Bouton Secondaire"
                                        value={content.industries.finalCta.ctaSecondary}
                                        onChange={(val) => updateContent(["industries", "finalCta", "ctaSecondary"], val)}
                                    />
                                </div>
                            </CollapsibleSection>
                        </>
                    )}

                    {/* Offres Section */}
                    {activeSection === "offres" && content.offres && (
                        <>
                            <CollapsibleSection
                                title="Hero Section"
                                isExpanded={expandedSections.offres_hero}
                                onToggle={() => toggleSection("offres_hero")}
                            >
                                <InputField
                                    label="Label (Petit Titre)"
                                    value={content.offres.hero.label}
                                    onChange={(val) => updateContent(["offres", "hero", "label"], val)}
                                />
                                <InputField
                                    label="Titre Principal"
                                    value={content.offres.hero.title}
                                    onChange={(val) => updateContent(["offres", "hero", "title"], val)}
                                />
                                <InputField
                                    label="Titre Surligné (Teal)"
                                    value={content.offres.hero.highlight}
                                    onChange={(val) => updateContent(["offres", "hero", "highlight"], val)}
                                />
                                <InputField
                                    label="Description"
                                    value={content.offres.hero.description}
                                    onChange={(val) => updateContent(["offres", "hero", "description"], val)}
                                    multiline
                                />
                            </CollapsibleSection>

                            <CollapsibleSection
                                title="Packs de Prix"
                                isExpanded={expandedSections.offres_packs}
                                onToggle={() => toggleSection("offres_packs")}
                            >
                                {content.offres.packs.map((pack, index) => (
                                    <div key={index} className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 mb-4">
                                        <h4 className="font-bold text-navy-dark mb-4 border-b border-zinc-200 pb-2">Pack {index + 1} ({pack.name})</h4>
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <InputField
                                                    label="Nom du Pack"
                                                    value={pack.name}
                                                    onChange={(val) => {
                                                        const newPacks = [...content.offres.packs];
                                                        newPacks[index].name = val;
                                                        updateContent(["offres", "packs"], newPacks);
                                                    }}
                                                />
                                                <InputField
                                                    label="Prix / Niveau"
                                                    value={pack.price}
                                                    onChange={(val) => {
                                                        const newPacks = [...content.offres.packs];
                                                        newPacks[index].price = val;
                                                        updateContent(["offres", "packs"], newPacks);
                                                    }}
                                                />
                                            </div>
                                            <InputField
                                                label="Tagline"
                                                value={pack.tagline}
                                                onChange={(val) => {
                                                    const newPacks = [...content.offres.packs];
                                                    newPacks[index].tagline = val;
                                                    updateContent(["offres", "packs"], newPacks);
                                                }}
                                            />
                                            <div className="mb-2">
                                                <label className="text-xs font-black uppercase tracking-wider block mb-2">Fonctionnalités</label>
                                                {pack.features.map((feat, fIndex) => (
                                                    <input
                                                        key={fIndex}
                                                        type="text"
                                                        value={feat}
                                                        onChange={(e) => {
                                                            const newPacks = [...content.offres.packs];
                                                            newPacks[index].features[fIndex] = e.target.value;
                                                            updateContent(["offres", "packs"], newPacks);
                                                        }}
                                                        className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-sm mb-1"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </CollapsibleSection>

                            <CollapsibleSection
                                title="Comparaison Détaillée"
                                isExpanded={expandedSections.offres_comparison}
                                onToggle={() => toggleSection("offres_comparison")}
                            >
                                <InputField
                                    label="Titre"
                                    value={content.offres.comparison.title}
                                    onChange={(val) => updateContent(["offres", "comparison", "title"], val)}
                                />
                                <InputField
                                    label="Highlight"
                                    value={content.offres.comparison.highlight}
                                    onChange={(val) => updateContent(["offres", "comparison", "highlight"], val)}
                                />
                                <InputField
                                    label="Description"
                                    value={content.offres.comparison.description}
                                    onChange={(val) => updateContent(["offres", "comparison", "description"], val)}
                                />

                                <div className="mt-6">
                                    <h4 className="font-bold text-navy-dark mb-4">Lignes du Tableau</h4>
                                    {content.offres.comparison.rows.map((row, rIndex) => (
                                        <div key={rIndex} className="grid grid-cols-4 gap-2 mb-2 p-2 bg-zinc-50 rounded border border-zinc-200">
                                            <input
                                                type="text"
                                                value={row[0] as string}
                                                onChange={(e) => {
                                                    const newRows = [...content.offres.comparison.rows];
                                                    newRows[rIndex][0] = e.target.value;
                                                    updateContent(["offres", "comparison", "rows"], newRows);
                                                }}
                                                className="col-span-1 px-2 py-1 text-xs border rounded"
                                                placeholder="Feature"
                                            />
                                            {[1, 2, 3].map((colIndex) => (
                                                <input
                                                    key={colIndex}
                                                    type="text"
                                                    value={String(row[colIndex])}
                                                    onChange={(e) => {
                                                        const newVal = e.target.value === "true" ? true : e.target.value === "false" ? false : e.target.value;
                                                        const newRows = [...content.offres.comparison.rows];
                                                        newRows[rIndex][colIndex] = newVal;
                                                        updateContent(["offres", "comparison", "rows"], newRows);
                                                    }}
                                                    className="col-span-1 px-2 py-1 text-xs border rounded"
                                                    placeholder="Val"
                                                />
                                            ))}
                                        </div>
                                    ))}
                                    <p className="text-xs text-zinc-500 mt-2">Note: Utilisez "true" pour une coche verte, "false" pour vide.</p>
                                </div>
                            </CollapsibleSection>

                            <CollapsibleSection
                                title="Services (Bento Grid)"
                                isExpanded={expandedSections.offres_services}
                                onToggle={() => toggleSection("offres_services")}
                            >
                                <div className="space-y-6">
                                    <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl">
                                        <h4 className="font-bold text-navy-dark mb-2">Support Block</h4>
                                        <InputField
                                            label="Titre"
                                            value={content.offres.services.support.title}
                                            onChange={(val) => updateContent(["offres", "services", "support", "title"], val)}
                                        />
                                        <InputField
                                            label="Description"
                                            value={content.offres.services.support.description}
                                            onChange={(val) => updateContent(["offres", "services", "support", "description"], val)}
                                            multiline
                                        />
                                        <InputField
                                            label="Label Équipe"
                                            value={content.offres.services.support.label}
                                            onChange={(val) => updateContent(["offres", "services", "support", "label"], val)}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl">
                                            <h4 className="font-bold text-navy-dark mb-2">Installation</h4>
                                            <InputField
                                                label="Titre"
                                                value={content.offres.services.installation.title}
                                                onChange={(val) => updateContent(["offres", "services", "installation", "title"], val)}
                                            />
                                            <InputField
                                                label="Description"
                                                value={content.offres.services.installation.description}
                                                onChange={(val) => updateContent(["offres", "services", "installation", "description"], val)}
                                                multiline
                                            />
                                        </div>
                                        <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl">
                                            <h4 className="font-bold text-navy-dark mb-2">Mises à jour (Updates)</h4>
                                            <InputField
                                                label="Titre"
                                                value={content.offres.services.updates.title}
                                                onChange={(val) => updateContent(["offres", "services", "updates", "title"], val)}
                                            />
                                            <InputField
                                                label="Description"
                                                value={content.offres.services.updates.description}
                                                onChange={(val) => updateContent(["offres", "services", "updates", "description"], val)}
                                                multiline
                                            />
                                        </div>
                                    </div>

                                    <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl">
                                        <h4 className="font-bold text-navy-dark mb-2">Formation</h4>
                                        <InputField
                                            label="Titre"
                                            value={content.offres.services.training.title}
                                            onChange={(val) => updateContent(["offres", "services", "training", "title"], val)}
                                        />
                                        <InputField
                                            label="Description"
                                            value={content.offres.services.training.description}
                                            onChange={(val) => updateContent(["offres", "services", "training", "description"], val)}
                                            multiline
                                        />
                                    </div>
                                </div>
                            </CollapsibleSection>

                            <CollapsibleSection
                                title="Appel à l'Action Final"
                                isExpanded={expandedSections.offres_finalCta}
                                onToggle={() => toggleSection("offres_finalCta")}
                            >
                                <InputField
                                    label="Titre Ligne 1"
                                    value={content.offres.finalCta.title}
                                    onChange={(val) => updateContent(["offres", "finalCta", "title"], val)}
                                />
                                <InputField
                                    label="Titre Ligne 2 (Teal)"
                                    value={content.offres.finalCta.highlight}
                                    onChange={(val) => updateContent(["offres", "finalCta", "highlight"], val)}
                                />
                                <InputField
                                    label="Description"
                                    value={content.offres.finalCta.description}
                                    onChange={(val) => updateContent(["offres", "finalCta", "description"], val)}
                                    multiline
                                />
                                <InputField
                                    label="Bouton Primaire"
                                    value={content.offres.finalCta.ctaPrimary}
                                    onChange={(val) => updateContent(["offres", "finalCta", "ctaPrimary"], val)}
                                />
                            </CollapsibleSection>
                        </>
                    )}

                    {/* Footer Section */}
                    {activeSection === "footer" && (
                        <div className="space-y-6">
                            <div className="bg-white rounded-2xl border border-zinc-200 p-8 space-y-6">
                                <h2 className="text-2xl font-black text-navy-dark mb-6">Footer - Contenu Principal</h2>

                                <InputField
                                    label="Mission"
                                    value={content.footer.mission}
                                    onChange={(val) => updateContent(["footer", "mission"], val)}
                                    multiline
                                    rows={2}
                                    hint="Utilisez <span> pour le texte en couleur"
                                />
                                <InputField
                                    label="Description"
                                    value={content.footer.description}
                                    onChange={(val) => updateContent(["footer", "description"], val)}
                                    multiline
                                    rows={3}
                                    hint="Utilisez <span> pour le texte en gras"
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <InputField
                                        label="Téléphone"
                                        value={content.footer.phone}
                                        onChange={(val) => updateContent(["footer", "phone"], val)}
                                    />
                                    <InputField
                                        label="Adresse"
                                        value={content.footer.address}
                                        onChange={(val) => updateContent(["footer", "address"], val)}
                                        hint="Utilisez <br /> pour les sauts de ligne"
                                    />
                                </div>
                                <InputField
                                    label="Copyright"
                                    value={content.footer.copyright}
                                    onChange={(val) => updateContent(["footer", "copyright"], val)}
                                />
                                <InputField
                                    label="Marque Déposée"
                                    value={content.footer.trademark}
                                    onChange={(val) => updateContent(["footer", "trademark"], val)}
                                />
                            </div>

                            <div className="bg-white rounded-2xl border border-zinc-200 p-8 space-y-6">
                                <h2 className="text-2xl font-black text-navy-dark mb-6">Newsletter</h2>

                                <div className="grid grid-cols-2 gap-4">
                                    <InputField
                                        label="Placeholder Email"
                                        value={content.footer.newsletter.placeholder}
                                        onChange={(val) => updateContent(["footer", "newsletter", "placeholder"], val)}
                                    />
                                    <InputField
                                        label="Texte Bouton"
                                        value={content.footer.newsletter.buttonText}
                                        onChange={(val) => updateContent(["footer", "newsletter", "buttonText"], val)}
                                    />
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl border border-zinc-200 p-8 space-y-6">
                                <h2 className="text-2xl font-black text-navy-dark mb-6">Navigation Footer</h2>

                                <div className="space-y-6">
                                    <div className="border border-zinc-200 rounded-xl p-6 bg-zinc-50">
                                        <h3 className="font-black text-navy-dark mb-4">Colonne Technologie</h3>
                                        <InputField
                                            label="Titre Colonne"
                                            value={content.footer.navigation.technology.title}
                                            onChange={(val) => updateContent(["footer", "navigation", "technology", "title"], val)}
                                        />
                                        <div className="mt-4">
                                            <label className="block text-xs font-black text-navy/70 uppercase tracking-wider mb-2">
                                                Liens (un par ligne)
                                            </label>
                                            <textarea
                                                value={content.footer.navigation.technology.links.join("\n")}
                                                onChange={(e) => updateContent(["footer", "navigation", "technology", "links"], e.target.value.split("\n"))}
                                                rows={4}
                                                className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl text-navy-dark focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal transition-all font-medium resize-none"
                                            />
                                        </div>
                                    </div>

                                    <div className="border border-zinc-200 rounded-xl p-6 bg-zinc-50">
                                        <h3 className="font-black text-navy-dark mb-4">Colonne Secteurs</h3>
                                        <InputField
                                            label="Titre Colonne"
                                            value={content.footer.navigation.sectors.title}
                                            onChange={(val) => updateContent(["footer", "navigation", "sectors", "title"], val)}
                                        />
                                        <div className="mt-4">
                                            <label className="block text-xs font-black text-navy/70 uppercase tracking-wider mb-2">
                                                Liens (un par ligne)
                                            </label>
                                            <textarea
                                                value={content.footer.navigation.sectors.links.join("\n")}
                                                onChange={(e) => updateContent(["footer", "navigation", "sectors", "links"], e.target.value.split("\n"))}
                                                rows={3}
                                                className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl text-navy-dark focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal transition-all font-medium resize-none"
                                            />
                                        </div>
                                    </div>

                                    <div className="border border-zinc-200 rounded-xl p-6 bg-zinc-50">
                                        <h3 className="font-black text-navy-dark mb-4">Colonne Entreprise</h3>
                                        <InputField
                                            label="Titre Colonne"
                                            value={content.footer.navigation.company.title}
                                            onChange={(val) => updateContent(["footer", "navigation", "company", "title"], val)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl border border-zinc-200 p-8 space-y-6">
                                <h2 className="text-2xl font-black text-navy-dark mb-6">Liens Légaux</h2>

                                <div>
                                    <label className="block text-xs font-black text-navy/70 uppercase tracking-wider mb-2">
                                        Liens (un par ligne)
                                    </label>
                                    <textarea
                                        value={content.footer.legal.links.join("\n")}
                                        onChange={(e) => updateContent(["footer", "legal", "links"], e.target.value.split("\n"))}
                                        rows={3}
                                        className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-navy-dark focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal transition-all font-medium resize-none"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
