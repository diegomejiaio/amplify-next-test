import { RocketIcon } from "@radix-ui/react-icons";
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert";

interface AlertComponentProps {
    title: string;
    description: string;
}

export default function AlertComponent({ title, description }: AlertComponentProps): JSX.Element {
    return (
        <Alert className="fixed bottom-4 right-4 z-50 max-w-[320px]">
            <RocketIcon className="h-4 w-4" />
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>
                {description}
            </AlertDescription>
        </Alert>
    );
}