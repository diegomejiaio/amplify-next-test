"use client";
import type { FormEvent } from "react";
import { Amplify } from "aws-amplify";
import { confirmSignIn } from 'aws-amplify/auth';
import outputs from "../../../amplify_outputs.json";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import PasswordInput from "@/components/ui/password-input";
import { ButtonLoading } from "@/components/ButtonLoading";

Amplify.configure(outputs);

interface ConfirmPasswordFormElements extends HTMLFormControlsCollection {
    tempPassword: HTMLInputElement;
    newPassword: HTMLInputElement;
    confirmPassword: HTMLInputElement;
}

interface ConfirmPasswordForm extends HTMLFormElement {
    readonly elements: ConfirmPasswordFormElements;
}

export default function ConfirmPassword({ handleAuthCase, email, tempPasswordPass }: { handleAuthCase: (authCase: string) => void, email: string, tempPasswordPass: string }) {
    const router = useRouter();
    const [authError, setAuthError] = useState<string | null>(null);
    const [loadingButton, setLoadingButton] = useState(false);
    const [tempPassword, setTempPassword] = useState(tempPasswordPass);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Obfuscate the email for display purposes
    const obfuscateEmail = (email: string) => {
        const [localPart, domain] = email.split("@");
        return `${localPart[0]}${localPart[1]}${localPart[2]}******@${domain[0]}${domain[1]}${domain[2]}*****`;
    };

    async function handleSubmit(event: FormEvent<ConfirmPasswordForm>) {
        setLoadingButton(true);
        event.preventDefault();
        const form = event.currentTarget;
        const tempPassword = form.elements.tempPassword.value;
        const newPasswordValue = form.elements.newPassword.value;
        const confirmPasswordValue = form.elements.confirmPassword.value;

        if (newPasswordValue !== confirmPasswordValue) {
            setAuthError('Las contraseñas no coinciden');
            setLoadingButton(false);
            return;
        }

        try {
            const confirmResponse = await confirmSignIn({
                challengeResponse: newPasswordValue,
                options: {
                    username: email,
                    password: tempPassword
                },
            });
            if (confirmResponse.nextStep.signInStep === 'DONE') {
                router.push('/app');
            }
        } catch (error: any) {
            setAuthError('Error al confirmar la nueva contraseña');
            setLoadingButton(false);
        }
    }

    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 m-8">
            <Card className="w-full max-w-sm border-input">
                <form onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle className="text-2xl">Definir nueva contraseña</CardTitle>
                        <CardDescription>{"Ingresa la contraseña temporal y define una nueva contraseña."}</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label>Email registrado</Label>
                            <p>{obfuscateEmail(email)}</p>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="tempPassword">Contraseña temporal</Label>
                            <PasswordInput 
                                id="tempPassword"
                                name="tempPassword"
                                placeholder="••••••••••"
                                value={tempPassword}
                                onChange={(e) => setTempPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="newPassword">Nueva Contraseña</Label>
                            <PasswordInput
                                id="newPassword"
                                name="newPassword"
                                placeholder="••••••••••"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                            <PasswordInput 
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="••••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        {authError && <p className="text-red-500 text-sm">{authError}</p>}
                    </CardContent>
                    <CardFooter>
                        <div className="flex-auto space-y-2">
                            {loadingButton ? (
                                <ButtonLoading text="Cargando" className="w-full"/>
                            ) : (
                                <Button variant={"default"} className="w-full" type="submit">
                                    Confirmar contraseña
                                </Button>
                            )}
                            <Button variant={"ghost"} className="w-full" onClick={() => handleAuthCase('login')}>
                                <p className="text-xs">Regresar</p>
                            </Button>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}



