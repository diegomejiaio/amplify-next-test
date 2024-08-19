import React from "react";
import Link from "next/link";
const BrandLogoLink: React.FC = () => {
    return (
        <Link
                        href="/"
                        className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                    >
                        <svg width="22" viewBox="0 0 161 108" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 8.04872L3.61749 30.5641C25.3224 26.1452 47.0274 23.6201 69.6911 22.9888V108H91.2215V22.9888C113.798 23.6201 135.764 26.1452 157.383 30.5115L161 7.99611C134.893 2.73552 108.089 0 80.6744 0C53.0857 0 26.2377 2.73552 0 8.04872Z" fill="white"/>
                        </svg>
                        <span className="sr-only">Tivit</span>
                    </Link>
    );
};

export default BrandLogoLink;