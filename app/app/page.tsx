"use client";

import React, { useState } from "react";
import LateralNavbar from "@/components/LateralNavbar";
import HomePage from "@/app/app/_pages/home/HomePage";
import ChatbotPage from "@/app/app/_pages/chatbot/ChatbotPage";
import NavbarInternal from "@/components/NavbarInternal";
import AnalyticsPage from "./_pages/analytics/AnalyticsPage";
import DemosPage from "./_pages/demos/DemosPage";
// Mapeo de nombres de componente a los componentes reales
const componentsMap: { [key: string]: React.FC } = {
    Home: HomePage,
    Chatbot: ChatbotPage,
    Analytics: AnalyticsPage,
    Demos: DemosPage
};


const App: React.FC = () => {

    const [activeItem, setActiveItem] = useState<string>("Home");

    const ActiveComponent = componentsMap[activeItem];

    return (
        <div>
            <LateralNavbar activeItem={activeItem} setActiveItem={setActiveItem} />
            <div className="flex flex-col sm:gap-4 py-2 sm:py-4 pl-14 h-screen">
                <NavbarInternal />
                <div className="flex-1 overflow-y-auto p-2">
                    <ActiveComponent />
                </div>
            </div>
        </div>
    );
};

export default App;