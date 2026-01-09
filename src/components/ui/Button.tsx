"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
        const variants = {
            primary: "bg-teal text-white hover:bg-teal/90 shadow-lg shadow-teal/20",
            secondary: "bg-navy text-white hover:bg-navy/90 shadow-lg shadow-navy/20",
            outline: "border-2 border-teal text-teal hover:bg-teal/5",
            ghost: "text-navy hover:bg-navy/5",
        };

        const sizes = {
            sm: "px-4 py-2 text-sm",
            md: "px-6 py-3 text-base font-semibold",
            lg: "px-8 py-4 text-lg font-bold",
        };

        return (
            <button
                ref={ref}
                className={cn(
                    "rounded-full transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";
