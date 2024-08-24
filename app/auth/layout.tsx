import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <> {/* Wrap the JSX expression with a parent element */}
        {children}
        </>
    );
};

export default Layout;