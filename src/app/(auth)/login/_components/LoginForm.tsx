'use client';

import { useFormState } from "react-dom";
import { validateUser } from "../_actions/validate-user-action";
import { LoginButton } from "./LoginButton";

export default function LoginForm() {
    const [message, dispatch] = useFormState(validateUser, "");

    return (
        <form action={dispatch}>
            <div>{message}</div>
            <div>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" placeholder="enter username" required aria-required />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" placeholder="enter password" required aria-required />
            </div>
            <LoginButton />
        </form>
    )
}