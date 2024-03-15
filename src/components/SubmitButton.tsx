"use client";

import { Button, ButtonProps } from "@/components/Button";
import { useFormStatus } from "react-dom";

export function SubmitButton({ title, ...props }: ButtonProps & {
    title: string;
}) {
    const { pending } = useFormStatus();

    return (
        <Button 
            disabled={pending}
            aria-disabled={pending}
            {...props}
        >
            {title}
        </Button>
    )
}