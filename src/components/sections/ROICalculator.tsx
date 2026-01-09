"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Lightbulb, ChevronDown } from "lucide-react";
import { SiteContent } from "@/lib/content";

export const ROICalculator = ({ content }: { content: SiteContent["home"]["roiCalculator"] }) => {
    // Inputs
    const [sector, setSector] = useState(content.sectors[0]);
    const [fleetSize, setFleetSize] = useState<number>(10);
    const [fuelCost, setFuelCost] = useState<number>(500000);
    const [accidents, setAccidents] = useState<number>(2);
    const [maintenanceCost, setMaintenanceCost] = useState<number>(300000);
    const [email, setEmail] = useState("");

    // Outputs
    const [results, setResults] = useState<{
        roi: string;
        annualSavings: number;
        solutionCost: number;
        netProfit: number;
        payback: number;
    } | null>(null);

    const calculateROI = () => {
        // Hypothèses
        const fuelSavingsPercent = 0.15; // 15% reduction
        const maintenanceSavingsPercent = 0.20; // 20% reduction
        const averageAccidentCost = 500000; // 500k per accident
        const accidentReductionPercent = 0.40; // 40% reduction
        const solutionCostPerVehicleMonth = 15000; // Estimated subscription

        // Monthly Savings
        const fuelSavings = fuelCost * fuelSavingsPercent;
        const maintenanceSavings = maintenanceCost * maintenanceSavingsPercent;

        // Annual Savings
        const annualFuelSavings = fuelSavings * 12;
        const annualMaintenanceSavings = maintenanceSavings * 12;
        const annualAccidentSavings = (accidents * averageAccidentCost) * accidentReductionPercent;

        const totalAnnualSavings = annualFuelSavings + annualMaintenanceSavings + annualAccidentSavings;
        const totalAnnualCost = fleetSize * solutionCostPerVehicleMonth * 12;

        const netProfit = totalAnnualSavings - totalAnnualCost;
        const roiVal = totalAnnualCost > 0 ? (totalAnnualSavings / totalAnnualCost) : 0;

        // Payback in months
        const paybackMonths = totalAnnualSavings > 0 ? (totalAnnualCost / totalAnnualSavings) * 12 : 0;

        setResults({
            roi: roiVal.toFixed(1) + ":1",
            annualSavings: Math.round(totalAnnualSavings),
            solutionCost: Math.round(totalAnnualCost),
            netProfit: Math.round(netProfit),
            payback: Math.ceil(paybackMonths)
        });
    };

    return (
        <section id="roi-calculator" className="py-32 bg-navy-dark text-white relative flex justify-center overflow-hidden">
            {/* Dynamic Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="container mx-auto px-4 lg:px-6 max-w-7xl relative z-10">

                <div className="text-center mb-16">
                    <span className="text-teal font-black tracking-[0.2em] uppercase text-xs mb-4 block">{content.sectionLabel}</span>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-4">{content.sectionTitle} <span className="text-teal">{content.sectionTitleHighlight}</span></h2>
                    <p className="text-white/50 max-w-2xl mx-auto">
                        {content.sectionDescription}
                    </p>
                </div>

                <div className="bg-navy-light/30 border border-white/5 rounded-[3rem] p-8 lg:p-12 shadow-2xl backdrop-blur-xl relative overflow-hidden">
                    {/* Glass Sheen */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16">

                        {/* LEFT: INPUTS */}
                        <div className="lg:col-span-5 space-y-8">

                            {/* Sector */}
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-teal ml-1">{content.labels.sector}</label>
                                <div className="relative group">
                                    <select
                                        value={sector}
                                        onChange={(e) => setSector(e.target.value)}
                                        className="w-full bg-navy-dark/50 border border-white/5 rounded-2xl px-6 py-4 text-white appearance-none focus:outline-none focus:border-teal/50 focus:ring-1 focus:ring-teal/50 font-bold transition-all cursor-pointer hover:border-white/10"
                                    >
                                        {content.sectors.map((s) => (
                                            <option key={s} value={s} className="bg-navy-dark">{s}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-hover:text-teal transition-colors pointer-events-none" />
                                </div>
                            </div>

                            {/* Vehicles */}
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-teal ml-1">{content.labels.fleetSize}</label>
                                <input
                                    type="number"
                                    value={fleetSize}
                                    onChange={(e) => setFleetSize(parseInt(e.target.value) || 0)}
                                    className="w-full bg-navy-dark/50 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-teal/50 focus:ring-1 focus:ring-teal/50 font-bold transition-all placeholder:text-white/20 hover:border-white/10"
                                />
                            </div>

                            {/* Fuel */}
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-teal ml-1">{content.labels.fuelCost}</label>
                                <input
                                    type="number"
                                    value={fuelCost}
                                    onChange={(e) => setFuelCost(parseInt(e.target.value) || 0)}
                                    className="w-full bg-navy-dark/50 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-teal/50 focus:ring-1 focus:ring-teal/50 font-bold transition-all placeholder:text-white/20 hover:border-white/10"
                                />
                            </div>

                            {/* Accidents */}
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-teal ml-1">{content.labels.accidents}</label>
                                <input
                                    type="number"
                                    value={accidents}
                                    onChange={(e) => setAccidents(parseInt(e.target.value) || 0)}
                                    className="w-full bg-navy-dark/50 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-teal/50 focus:ring-1 focus:ring-teal/50 font-bold transition-all placeholder:text-white/20 hover:border-white/10"
                                />
                            </div>

                            {/* Maintenance */}
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-teal ml-1">{content.labels.maintenanceCost}</label>
                                <input
                                    type="number"
                                    value={maintenanceCost}
                                    onChange={(e) => setMaintenanceCost(parseInt(e.target.value) || 0)}
                                    className="w-full bg-navy-dark/50 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-teal/50 focus:ring-1 focus:ring-teal/50 font-bold transition-all placeholder:text-white/20 hover:border-white/10"
                                />
                            </div>

                            <Button
                                onClick={calculateROI}
                                className="w-full h-16 bg-gradient-to-r from-teal to-teal-dark hover:from-teal-light hover:to-teal text-white font-black uppercase tracking-wider rounded-2xl shadow-xl shadow-teal/20 mt-6 transition-all duration-300 hover:scale-[1.02]"
                            >
                                {content.labels.calculateButton}
                            </Button>

                        </div>

                        {/* RIGHT: RESULTS */}
                        <div className="lg:col-span-7">
                            <div className="h-full bg-gradient-to-br from-navy-dark to-[#0a0f1c] border border-white/10 rounded-[2.5rem] p-10 lg:p-12 relative overflow-hidden flex flex-col justify-between shadow-2xl">
                                {/* Decorative Glow & Mesh */}
                                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-teal/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                                <div className="relative z-10">
                                    <div className="flex items-center gap-4 mb-10">
                                        <div className="w-2 h-12 bg-teal rounded-full" />
                                        <h3 className="text-3xl font-black text-white">Vos Résultats</h3>
                                    </div>

                                    <div className="space-y-10">

                                        {/* Main Metrics */}
                                        <div className="grid grid-cols-2 gap-8">
                                            <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                                                <p className="text-white/40 text-[10px] font-black uppercase tracking-wider mb-2">{content.labels.roiEstimated}</p>
                                                <p className="text-5xl font-black text-white tracking-tighter">
                                                    {results ? results.roi : "0.0:1"}
                                                </p>
                                            </div>
                                            <div className="bg-teal/10 rounded-2xl p-6 border border-teal/20">
                                                <p className="text-teal text-[10px] font-black uppercase tracking-wider mb-2">{content.labels.netProfit}</p>
                                                <p className="text-3xl lg:text-4xl font-black text-teal tracking-tighter">
                                                    {results ? results.netProfit.toLocaleString() : "0"} <span className="text-sm opacity-60">FCFA</span>
                                                </p>
                                            </div>
                                        </div>

                                        {/* Secondary Metrics List */}
                                        <div className="space-y-6 pl-2">
                                            <div className="flex justify-between items-end border-b border-white/5 pb-4 group hover:border-white/10 transition-colors">
                                                <span className="text-white/60 font-bold text-sm">{content.labels.annualSavings}</span>
                                                <span className="text-xl font-bold text-white tracking-tight group-hover:text-teal transition-colors">
                                                    {results ? results.annualSavings.toLocaleString() : "0"} <span className="text-xs text-white/30">FCFA</span>
                                                </span>
                                            </div>

                                            <div className="flex justify-between items-end border-b border-white/5 pb-4 group hover:border-white/10 transition-colors">
                                                <span className="text-white/60 font-bold text-sm">{content.labels.solutionCost}</span>
                                                <span className="text-xl font-bold text-white tracking-tight">
                                                    {results ? results.solutionCost.toLocaleString() : "0"} <span className="text-xs text-white/30">FCFA</span>
                                                </span>
                                            </div>

                                            <div className="flex justify-between items-end group hover:border-white/10 transition-colors">
                                                <span className="text-white/60 font-bold text-sm">{content.labels.payback}</span>
                                                <span className="text-xl font-bold text-white tracking-tight">
                                                    {results ? results.payback : "0"} <span className="text-xs text-white/30">mois</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-12 pt-8 border-t border-white/5 relative z-10">
                                    <div className="flex items-center justify-between mb-6">
                                        <p className="text-sm font-bold text-white">{content.labels.emailPrompt}</p>
                                        <span className="text-[10px] bg-teal/20 text-teal px-2 py-1 rounded font-bold uppercase tracking-wider">Gratuit</span>
                                    </div>

                                    <div className="flex gap-4">
                                        <input
                                            type="email"
                                            placeholder="votreemail@entreprise.com"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-teal/50 transition-colors placeholder:text-white/20 font-medium"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <Button className="bg-white text-navy-dark hover:bg-zinc-200 px-8 rounded-xl font-black shadow-lg shadow-white/5 shrink-0 h-auto">
                                            {content.labels.emailButton}
                                        </Button>
                                    </div>
                                    <p className="text-[10px] text-white/20 mt-4 text-center">
                                        {content.labels.emailDisclaimer}
                                    </p>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};
