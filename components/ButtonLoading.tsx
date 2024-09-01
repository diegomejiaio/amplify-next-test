import { ReloadIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import { ButtonVariant } from "@/utils/enums";

interface ButtonLoadingProps {
    text: string;
    variant?: ButtonVariant;
    className?: string;
}

export function ButtonLoading({ text = "Cargando", variant = "default",className }: ButtonLoadingProps) {
    return (
        <Button disabled className={className} variant={variant}>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            {text}
        </Button>
    )
}