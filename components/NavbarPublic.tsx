"use client";

import { Separator } from "@/components/ui/separator"
import Link from 'next/link';
import { GetAuthCurrentUser } from "@/utils/utils";

import Logo from '@/public/logo.svg'
import Image from "next/image";
import { ModeToggle } from "./ModeToggle";
import { Button } from "@/components/ui/button"
import { buttonVariants } from "@/components/ui/button"

interface NavbarPublicProps {
    isAuthenticated: boolean;
}

export default function NavbarPublic({ isAuthenticated }: NavbarPublicProps) {
    return (
        <header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center">
                {/* Logo or Brand Name */}
                <div className="mr-4 md:flex max-h-8">
                    <Link className="mr-2 md:flex items-center" href="./">
                        <Image src={Logo} priority={true} alt="Tivit" height={15}/>
                        <p className="text-center text-s md:ml-[10px]">Digital Latam</p>
                    </Link>
                </div>
                {/* Navigation Menu */}
                <div className="ml-auto flex">
                    
                    {/* Darkmode Toggle */}
                    <div className="md:ml-4">
                        <ModeToggle />    
                    </div> 
                </div>
                {/* Menubar */}
                <div className="md:ml-8"></div>
                <Button variant={"ghost"} asChild>
                    {isAuthenticated ? (
                        <Link href="/app">Ir a la app</Link>
                    ) : (
                        <Link href="/auth">Iniciar sesión</Link>
                    )}
                </Button>
                </div>
        <Separator />
        </header>
    );
}