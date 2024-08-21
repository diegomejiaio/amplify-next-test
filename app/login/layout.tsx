import React from 'react';
import SpaceBackground from '../components/SpaceBackground';
import NavbarPublic from '../components/NavbarPublic';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <> {/* Wrap the JSX expression with a parent element */}
        {children}
        </>
    );
};

export default Layout;