import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div> {/* Wrap the JSX expression with a parent element */}
            <main className="relative w-full h-screen flex items-center justify-center">
                <section className="absolute inset-0">
                    {children}
                </section>
            </main>
        </div>
    );
};

export default Layout;