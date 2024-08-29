import React, { Suspense } from "react";


const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    return (
        <div>
            <main className="relative w-full h-screen flex items-center justify-center">
                <div className="flex min-h-screen w-full flex-col bg-muted/40">
                    <Suspense>
                        {children}
                    </Suspense>
                </div>
            </main>
        </div>


    );
};

export default Layout;