"use client";
import React, { useState, useEffect } from "react";

import AlertComponent from '@/components/AlertComponent';
import { usePathname, useSearchParams } from 'next/navigation';
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"



const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const searchParams = useSearchParams();
    const notification = searchParams.get('notification');
    const { toast } = useToast()

    useEffect(() => {
        if (notification === 'npw') {
            toast({
                title: "Bienvenid@",
                description: "Tu contraseña ha sido actualizada correctamente 🎉",
                })
            // limpiar la url
            window.history.replaceState({}, document.title, "/app");
        }
    }, [notification]);

    return (
        <div>
            <main className="relative w-full h-screen flex items-center justify-center">
                <div className="flex min-h-screen w-full flex-col bg-muted/40">
                    {children}
                </div>
            </main>
            <Toaster />
        </div>


    );
};

export default Layout;