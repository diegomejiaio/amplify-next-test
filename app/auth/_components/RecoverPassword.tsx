"use client";
import { useState, FormEvent } from "react";
import { Amplify } from "aws-amplify";
import { resetPassword, confirmResetPassword } from 'aws-amplify/auth';
import outputs from "../../../amplify_outputs.json";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "../../../components/ui/input";
import { useRouter } from 'next/navigation';
import PasswordInput from "@/components/ui/password-input";
import { ButtonLoading } from "@/components/ButtonLoading";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"


Amplify.configure(outputs);

export default function RecoverPassword({ handleAuthCase }: { handleAuthCase: (authCase: string) => void }) {
    const router = useRouter();
    const [step, setStep] = useState<"email" | "otp">("email");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loadingButton, setLoadingButton] = useState(false);
    const [loadingButton2, setLoadingButton2] = useState(false);
    const [authError, setAuthError] = useState<string | null>(null);

    const obfuscateEmail = (email: string) => {
        const [localPart, domain] = email.split("@");
        return `${localPart[0]}${localPart[1]}${localPart[2]}******@${domain[0]}${domain[1]}${domain[2]}*****`;
    };

    async function handleEmailSubmit(event: FormEvent) {
        setLoadingButton(true);
        event.preventDefault();
        try {
            const output = await resetPassword({ username: email });
            handleResetPasswordNextSteps(output);
            console.log(output);
        } catch (error) {
            setAuthError('Error enviando el código de recuperación');
            setLoadingButton(false);
        }
    }

    function handleResetPasswordNextSteps(output: any) { // Replace 'any' with actual type if needed
        const { nextStep } = output;
        if (nextStep.resetPasswordStep === 'CONFIRM_RESET_PASSWORD_WITH_CODE') {
            setStep("otp");
        } else if (nextStep.resetPasswordStep === 'DONE') {
            router.push('/app?notification=npw');
        }
    }

    async function handleOtpSubmit(event: FormEvent) {
        setLoadingButton2(true);
        event.preventDefault();

        if (newPassword !== confirmPassword) {
            setAuthError('Las contraseñas no coinciden');
            setLoadingButton2(false);
            return;
        }

        try {
            await confirmResetPassword({
                username: email,
                confirmationCode: otp,
                newPassword: newPassword,
            });
            await handleAuthCase('login');
        } catch (error: any) {
            if (error.code === 'ExpiredCodeException') {
                setAuthError('El código ha expirado. Solicita uno nuevo.');
            } else {
                setAuthError('Error al verificar el código o establecer la nueva contraseña');
            }
            setLoadingButton2(false);
            console.log(error);
        }
    }

    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 m-8">
            <Card className="w-full max-w-sm border-input">
                {step === "email" ? (
                    <form onSubmit={handleEmailSubmit}>
                        <CardHeader>
                            <CardTitle className="text-2xl">Recuperar contraseña</CardTitle>
                            <CardDescription>{"Ingresa tu correo electrónico para recibir el código de recuperación."}</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="usuario@correo.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            {authError && <p className="text-red-500 text-sm">{authError}</p>}
                        </CardContent>
                        <CardFooter>
                            <div className="flex-auto space-y-2">
                                {loadingButton ? (
                                    <ButtonLoading text="Enviando" className="w-full" />
                                ) : (
                                    <Button variant={"default"} className="w-full" type="submit">
                                        Enviar código
                                    </Button>
                                )}
                                <Button variant={"ghost"} className="w-full" onClick={() => handleAuthCase('login')}>
                                        <p className="text-xs">Ir al inicio</p>
                                </Button>
                            </div>
                        </CardFooter>
                    </form>
                ) : (
                    <form onSubmit={handleOtpSubmit}>
                        <CardHeader>
                            <CardTitle className="text-2xl">Establece una nueva contraseña</CardTitle>
                            <CardDescription>{`Código enviado a ${obfuscateEmail(email)}`}</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="otp">Código OTP</Label>
                                <InputOTP value={otp} onChange={(value) => setOtp(value)} maxLength={6}>
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                    </InputOTPGroup>
                                    <InputOTPSeparator />
                                    <InputOTPGroup>
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
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

                                {loadingButton2 ? (
                                    <ButtonLoading text="Verificando" className="w-full" />
                                ) : (
                                    <Button variant={"default"} className="w-full" type="submit">
                                        Confirmar
                                    </Button>
                                )}
                                <Button variant={"ghost"} className="w-full" onClick={() => handleAuthCase('login')}>
                                    <p className="text-xs">Ir al inicio</p>
                                </Button>
                            </div>
                        </CardFooter>
                    </form>
                )}
            </Card>
        </div>
    );
}
