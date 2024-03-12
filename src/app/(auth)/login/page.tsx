'use client';

import { useFormState } from "react-dom";
import { LoginButton } from "./_components/LoginButton";
import { validateUser } from "./_actions/validate-user-action";

export default function Page() {
    const [message, dispatch] = useFormState(validateUser, "");

    return (
        <form action={dispatch}>
            <div>{message}</div>
            <div>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" placeholder="enter username" />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" placeholder="enter password" />
            </div>
            <LoginButton />
        </form>
    )
}