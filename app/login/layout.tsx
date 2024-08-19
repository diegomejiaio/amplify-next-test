import React from 'react';
import SpaceBackground from '../components/SpaceBackground';
import NavbarPublic from '../components/NavbarPublic';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div> {/* Wrap the JSX expression with a parent element */}
            <NavbarPublic />
            <main className="relative w-full h-screen flex items-center justify-center">
                <section className="absolute inset-0" style={{ marginTop: "-57px" }}>
                    <SpaceBackground />
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10 m-8">
                        {children}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Layout;