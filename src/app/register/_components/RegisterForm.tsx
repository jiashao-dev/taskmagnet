'use client';

import { useFormState } from "react-dom";
import { registerUser } from "../_actions/register-user";
import { MessageState } from "@/libs/definitions";
import clsx from "clsx";
import { SubmitButton } from "@/components/SubmitButton";

export function RegisterForm() {
    const [formState, dispatch] = useFormState(registerUser, {
        summary: "Please enter your details.",
        isError: false,
    } satisfies MessageState);

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
                <div className="flex flex-col">
                    <label
                        htmlFor="email"
                        className="text-base text-gray-500 pb-2"
                    >
                        Email
                    </label>
                    <input 
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        required
                        aria-required
                        className={clsx("w-full px-5 py-3 border rounded-lg text-gray-700 focus:outline-gray-500", {
                            "border-red-500": formState.errors?.email,
                        })}
                    />
                    <label
                        htmlFor="email"
                        className="text-xs text-red-500 pt-1"
                    >
                        {formState.errors?.email}
                    </label>
                </div>
                <div className="flex flex-col">
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
                <SubmitButton 
                    title="Register" 
                    className="w-full py-3 border rounded-lg bg-blue-700 text-white font-medium mt-5 hover:bg-blue-500" 
                />
            </form>
        </div>
    )
}
