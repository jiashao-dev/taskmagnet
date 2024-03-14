'use client';

import { Button } from "@/components/Button";
import { useFormStatus } from "react-dom";

export function RegisterButton() {
    const { pending } = useFormStatus();

    return (
        <Button
            disabled={pending}
            aria-disabled={pending}
            className="w-full py-3 border rounded-lg bg-blue-700 text-white font-medium hover:bg-blue-500"
        >
            Register
        </Button>
    )
}