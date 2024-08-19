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

const LoginForm = () => {
    return (
        <>
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
                    <Button variant={"default"} className="w-full">Ingresar</Button>
                </CardFooter>
            </Card>
            <div className="text-center mt-4"></div>
            <></>
        </>
    )
}

export default LoginForm;