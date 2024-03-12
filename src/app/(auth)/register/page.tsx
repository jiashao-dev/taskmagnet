'use client';

import { useFormState } from "react-dom";
import { registerUser } from "./_actions/register-user";
import { RegisterButton } from "./_components/RegisterButton";

export default function Page() {
    const [message, dispatch] = useFormState(registerUser, "");

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
            <RegisterButton />
        </form>
    )
}