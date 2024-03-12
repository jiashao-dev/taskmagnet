'use client';

import { Button } from "@/components/Button";
import { useFormStatus } from "react-dom";

export function RegisterButton() {
    const { pending } = useFormStatus();

    return (
        <Button disabled={pending} aria-disabled={pending}>
            {pending ? "Registering..." : "Register"}
        </Button>
    )
}