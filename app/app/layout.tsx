import LateralNavbar from '@/components/LateralNavbar';
import NavbarInternal from '@/components/NavbarInternal';
import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div> {/* Wrap the JSX expression with a parent element */}
        <main className="relative w-full h-screen flex items-center justify-center">
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <LateralNavbar/>
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <NavbarInternal/>
                {children}
            </div>
        </div>
        </main>
    </div>
                    

    );
};

export default Layout;