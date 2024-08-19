"use client";

import { Separator } from "@/components/ui/separator"

import Logo from '../../public/logo.svg';
import Image from "next/image";
import { ModeToggle } from "./ModeToggle";
import { Button } from "@/components/ui/button"
import { buttonVariants } from "@/components/ui/button"


export default function NavbarPublic() {
    return (
        <header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center">
                {/* Logo or Brand Name */}
                <div className="mr-4 md:flex">
                    <a className="mr-2 md:flex items-center" href="./">
                        <Image src={Logo} priority={true} alt="Tivit" height={25}/>
                        <p className="text-center text-s">Digital Latam</p>
                    </a>
                </div>
                {/* Navigation Menu */}
                <div className="ml-auto flex">
                    
                    {/* Darkmode Toggle */}
                    <div className="ml-4">
                        <ModeToggle />    
                    </div> 
                </div>
                {/* Menubar */}
                <div className="ml-8"></div>
                <Button variant={"ghost"} asChild>
                    <a href="/login">Iniciar sesión</a>
                </Button>
                </div>
        <Separator />
        </header>
    );
}
