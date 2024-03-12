'use client';

import { Button } from "@/components/Button";
import { useFormStatus } from "react-dom";

export function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <Button disabled={pending} aria-disabled={pending}>
            Log in
        </Button>
    )
}