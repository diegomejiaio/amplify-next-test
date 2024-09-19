//app/app/layout.tsx
import { LoadingSpinner } from "@/components/LoadingSpinner";
import React, { Suspense } from "react";


const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    return (
        <div>
            <main className="relative flex w-full h-screen items-center justify-center overflow-hidden">
                <div className="flex w-full h-screen flex-col bg-muted/40">
                    <div className="flex flex-col sm:gap-4 h-screen">
                        <Suspense fallback={<LoadingSpinner/>}>
                        {children}
                        </Suspense>
                    </div>
                </div>
            </main>
        </div>


    );
}

export default Layout;