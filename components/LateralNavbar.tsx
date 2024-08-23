/* LateralNavbar.tsx */
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandLogoLink from "./BrandLogoLink";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from "@/components/ui/tooltip";
import {
    Home,
    ShoppingCart,
    Package,
    Users2,
    LineChart,
    Settings,
    FolderSearch,
    BotMessageSquare,
} from "lucide-react";

interface NavItemProps {
    name: string;
    url: string;
    icon: React.ComponentType<{ className?: string }>;
}

const OptionsList: NavItemProps[] = [
    {
        name: "Home",
        icon: Home,
        url: "/home",
    },
    {
        name: "Aplicaciones",
        icon: Package,
        url: "/apps",
    },
    {
        name: "Chatbot",
        icon: BotMessageSquare,
        url: "/chatbot",
    },
    {
        name: "Personas",
        icon: Users2,
        url: "/people",
    },
    {
        name: "Analytics",
        icon: LineChart,
        url: "/analytics",
    },
    {
        name: "Recursos",
        icon: FolderSearch,
        url: "/resources",
    },
];

const SettingsItem: NavItemProps = {
    name: "Settings",
    icon: Settings,
    url: "/settings",
};

const NavItem: React.FC<NavItemProps> = ({ name, url, icon: Icon }) => {
    const pathname = usePathname();
    const isActive = pathname === url;

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Link
                    href={url}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
                        isActive
                            ? "bg-accent text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                    <Icon className="h-5 w-5" />
                    <span className="sr-only">{name}</span>
                </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{name}</TooltipContent>
        </Tooltip>
    );
};

const LateralNavbar: React.FC = () => {
    return (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex border-input">
            <nav className="flex flex-col items-center gap-4 px-2 py-4">
                <BrandLogoLink />
                <TooltipProvider>
                    {OptionsList.map((option) => (
                        <NavItem key={option.name} {...option} />
                    ))}
                </TooltipProvider>
            </nav>
            <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
                <TooltipProvider>
                    <NavItem {...SettingsItem} />
                </TooltipProvider>
            </nav>
        </aside>
    );
};

export default LateralNavbar;
