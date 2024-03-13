'use client';

import { Button } from "@/components/Button";
import { useFormStatus } from "react-dom";
import { logoutUser } from "../_actions/logout-actions";

export function LogoutButton() {
    const { pending } = useFormStatus();

    return (
        <Button 
            disabled={pending} 
            aria-disabled={pending} 
            onClick={() => logoutUser()}
        >
            Logout
        </Button>
    )
}