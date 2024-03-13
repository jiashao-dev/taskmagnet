'use client';

import { useFormState } from "react-dom";
import { validateUser } from "../_actions/validate-user";
import { LoginButton } from "./LoginButton";
import clsx from "clsx";

export default function LoginForm() {
    const [formState, dispatch] = useFormState(validateUser, {
        summary: "Welcome back! Please enter your details.",
        isError: false,
    });

    return (
        <div>
            <p className={clsx("text-sm pb-3 mb-2 text-gray-400", {
                "text-gray-400": !formState.isError,
                "text-red-500": formState.isError,
            })}>
                {formState.summary}
            </p>
            <form className="flex flex-col gap-6" action={dispatch}>
                <div className="flex flex-col">
                    <label
                        htmlFor="username"
                        className="text-base text-gray-500 pb-2"
                    >
                        Username
                    </label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter your username"
                        required
                        aria-required
                        className={clsx("w-full px-5 py-3 border rounded-lg text-gray-700 focus:outline-gray-500", {
                            "border-red-500": formState.errors?.username,
                        })}
                    />
                    <label
                        htmlFor="username"
                        className="text-xs text-red-500 pt-1"
                    >
                        {formState.errors?.username}
                    </label>
                </div>
                <div className="flex flex-col mb-5">
                    <label
                        htmlFor="password"
                        className="text-base text-gray-500 pb-2"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        required
                        aria-required
                        className={clsx("w-full px-5 py-3 border rounded-lg text-gray-700 focus:outline-gray-500", {
                            "border-red-500": formState.errors?.password,
                        })}
                    />
                    <label
                        htmlFor="password"
                        className="text-xs text-red-500 pt-1"
                    >
                        {formState.errors?.password}
                    </label>
                </div>
                <LoginButton />
            </form>
        </div>
    )
}