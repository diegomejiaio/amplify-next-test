"use client";

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from 'next/link';
import NavbarPublic from '../components/NavbarPublic';
import SpaceBackground from '../components/SpaceBackground';

const LoginForm = () => {
    return (
            <>
                <NavbarPublic />
                <main className="relative w-full min-h-[calc(100vh-57px)] flex items-center justify-center">
                    <section className="absolute inset-0" style={{ marginTop: "-60px" }}>
                        <SpaceBackground />
                        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 m-8">
                            <Card className="w-full max-w-sm border-input">
                                <CardHeader>
                                    <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
                                    <CardDescription>
                                        Ingresa tu correo y contraseña para acceder a tu cuenta.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" type="email" placeholder="jorge.perez@tivit.com" required />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="password">Contraseña</Label>
                                        <Input id="password" placeholder="************" type="password" required />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button variant={"default"} className="w-full" asChild><Link href="/home">Iniciar sesión</Link></Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </section>
                </main>
            </>
    )
}

export default LoginForm;