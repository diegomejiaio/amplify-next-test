//app/app/page.tsx
"use client";

import React, { useState, useEffect, Suspense } from "react";
import LateralNavbar from "@/components/LateralNavbar";
import HomePage from "@/app/app/_pages/home/HomePage";
import ChatbotPage from "@/app/app/_pages/chatbot/ChatbotPage";
import NavbarInternal from "@/components/NavbarInternal";
import AnalyticsPage from "./_pages/analytics/AnalyticsPage";
import DemosPage from "./_pages/demos/DemosPage";
import { useToast } from "@/components/ui/use-toast";
import { useSearchParams } from 'next/navigation';
import { Toaster } from "@/components/ui/toaster"
import { Rocket } from "lucide-react";
import PeoplePage from "./_pages/people/PeoplePage";




// Mapeo de nombres de componente a los componentes reales
const componentsMap: { [key: string]: React.FC } = {
    Home: HomePage,
    Chatbot: ChatbotPage,
    Analytics: AnalyticsPage,
    Demos: DemosPage,
    People: PeoplePage,
    Recursos: HomePage,
    Settings: HomePage,
};


const App: React.FC = () => {

    const [activeItem, setActiveItem] = useState<string>("Home");

    const ActiveComponent = componentsMap[activeItem];

    const searchParams = useSearchParams();
    const { toast } = useToast();

    useEffect(() => {
        const notification = searchParams.get('notification');
        if (notification === 'npw') {
            toast({
                action: (
                    <div className="w-full flex items-center">
                        <Rocket className="mr-4" />
                        <span className="first-letter:capitalize">
                            Contraseña ha sido actualizada correctamente
                        </span>
                    </div>
                ),
            });
            // clear query params
            window.history.replaceState({}, '', window.location.pathname);
        }
    }, [searchParams, toast]);

    return (
        <>
            
                <LateralNavbar activeItem={activeItem} setActiveItem={setActiveItem} />
                <div className="flex flex-col sm:gap-4 pl-10 sm:pl-14 h-screen">
                    <NavbarInternal />
                    <main className="flex h-full overflow-x-auto justify-center items-start p-4 sm:px-6 sm:py-0">
                        <div className="w-full max-w-full md:max-w-[1600px] grid items-start gap-4 sm:py-0 md:gap-8">
                            <ActiveComponent />
                        </div>
                    </main>
                </div>
                <Toaster />
            
        </>
    );
};

export default App;