"use client";

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator"
import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "@/components/ui/menubar"

import Logo from '../../public/logo.svg';
import Image from "next/image";
import { ModeToggle } from "./ModeToggle";
import { Button } from "@/components/ui/button"

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-border/40 bg-background/20 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center">
                {/* Logo or Brand Name */}
                <div className="mr-4 md:flex">
                    <div className="mr-2 md:flex items-center">
                        <Image src={Logo} priority={true} alt="Tivit" height={25}/>
                        <p className="text-center">Digital Latam</p>
                    </div>
                </div>
                {/* Navigation Menu */}
                <div className="ml-auto flex">
                    <Menubar>
                        <MenubarMenu>
                            <MenubarTrigger>File</MenubarTrigger>
                            <MenubarContent>
                                <MenubarItem>
                                    New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                                </MenubarItem>
                                <MenubarItem>
                                    New Window <MenubarShortcut>⌘N</MenubarShortcut>
                                </MenubarItem>
                                <MenubarItem disabled>New Incognito Window</MenubarItem>
                                <MenubarSeparator />
                                <MenubarSub>
                                    <MenubarSubTrigger>Share</MenubarSubTrigger>
                                    <MenubarSubContent>
                                        <MenubarItem>Email link</MenubarItem>
                                        <MenubarItem>Messages</MenubarItem>
                                        <MenubarItem>Notes</MenubarItem>
                                    </MenubarSubContent>
                                </MenubarSub>
                                <MenubarSeparator />
                                <MenubarItem>
                                    Print... <MenubarShortcut>⌘P</MenubarShortcut>
                                </MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>
                        <MenubarMenu>
                            <MenubarTrigger>Edit</MenubarTrigger>
                            <MenubarContent>
                                <MenubarItem>
                                    Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                                </MenubarItem>
                                <MenubarItem>
                                    Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
                                </MenubarItem>
                                <MenubarSeparator />
                                <MenubarSub>
                                    <MenubarSubTrigger>Find</MenubarSubTrigger>
                                    <MenubarSubContent>
                                        <MenubarItem>Search the web</MenubarItem>
                                        <MenubarSeparator />
                                        <MenubarItem>Find...</MenubarItem>
                                        <MenubarItem>Find Next</MenubarItem>
                                        <MenubarItem>Find Previous</MenubarItem>
                                    </MenubarSubContent>
                                </MenubarSub>
                                <MenubarSeparator />
                                <MenubarItem>Cut</MenubarItem>
                                <MenubarItem>Copy</MenubarItem>
                                <MenubarItem>Paste</MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>
                        <MenubarMenu>
                            <MenubarTrigger>View</MenubarTrigger>
                            <MenubarContent>
                                <MenubarCheckboxItem>Always Show Bookmarks Bar</MenubarCheckboxItem>
                                <MenubarCheckboxItem checked>
                                    Always Show Full URLs
                                </MenubarCheckboxItem>
                                <MenubarSeparator />
                                <MenubarItem inset>
                                    Reload <MenubarShortcut>⌘R</MenubarShortcut>
                                </MenubarItem>
                                <MenubarItem disabled inset>
                                    Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
                                </MenubarItem>
                                <MenubarSeparator />
                                <MenubarItem inset>Toggle Fullscreen</MenubarItem>
                                <MenubarSeparator />
                                <MenubarItem inset>Hide Sidebar</MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>
                        <MenubarMenu>
                            <MenubarTrigger>Profiles</MenubarTrigger>
                            <MenubarContent>
                                <MenubarRadioGroup value="benoit">
                                    <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
                                    <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
                                    <MenubarRadioItem value="Luis">Luis</MenubarRadioItem>
                                </MenubarRadioGroup>
                                <MenubarSeparator />
                                <MenubarItem inset>Edit...</MenubarItem>
                                <MenubarSeparator />
                                <MenubarItem inset>Add Profile...</MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>
                    </Menubar>
                    {/* Darkmode Toggle */}
                    <div className="ml-4">
                        <ModeToggle />    
                    </div> 
                </div>
                {/* Menubar */}
                <Button variant="ghost">Iniciar Sesión</Button>
                </div>
        <Separator />
        </header>
    );
}
