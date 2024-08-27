"use client";

import React from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from "@/components/ui/tooltip";
import {
    Home,
    Package,
    BotMessageSquare,
    Users2,
    LineChart,
    FolderSearch,
    Settings,
} from "lucide-react";
import BrandLogoLink from "./BrandLogoLink";

interface NavItemProps {
    name: string;
    icon: React.ComponentType<{ className?: string }>;
    activeItem: string;
    setActiveItem: (name: string) => void;
}

const OptionsList = [
    { name: "Home", icon: Home },
    { name: "Demos", icon: Package },
    { name: "Chatbot", icon: BotMessageSquare },
    { name: "Personas", icon: Users2 },
    { name: "Analytics", icon: LineChart },
    { name: "Recursos", icon: FolderSearch },
];

const SettingsItem = { name: "Settings", icon: Settings };

const NavItem: React.FC<NavItemProps> = ({
    name,
    icon: Icon,
    activeItem,
    setActiveItem,
}) => {
    const isActive = activeItem === name;

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <button
                    onClick={() => setActiveItem(name)}
                    className={`flex items-center justify-center rounded-lg transition-colors h-8 w-8 ${
                        isActive
                            ? "bg-accent text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                    <Icon className="h-5 w-5" />
                    <span className="sr-only">{name}</span>
                </button>
            </TooltipTrigger>
            <TooltipContent side="right">{name}</TooltipContent>
        </Tooltip>
    );
};

interface LateralNavbarProps {
    activeItem: string;
    setActiveItem: (name: string) => void;
}

const LateralNavbar: React.FC<LateralNavbarProps> = ({ activeItem, setActiveItem }) => {
    return (
        <aside className="fixed inset-y-0 left-0 z-10 w-12 sm:w-14 flex-col border-r bg-background flex border-input">
            <nav className="flex flex-col items-center gap-4 px-2 py-4">
                <BrandLogoLink />
                <TooltipProvider>
                    {OptionsList.map((option) => (
                        <NavItem
                            key={option.name}
                            activeItem={activeItem}
                            setActiveItem={setActiveItem}
                            {...option}
                        />
                    ))}
                </TooltipProvider>
            </nav>
            <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
                <TooltipProvider>
                    <NavItem
                        activeItem={activeItem}
                        setActiveItem={setActiveItem}
                        {...SettingsItem}
                    />
                </TooltipProvider>
            </nav>
        </aside>
    );
};

export default LateralNavbar;
