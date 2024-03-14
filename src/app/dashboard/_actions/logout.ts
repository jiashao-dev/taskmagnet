'use server';

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function logoutUser() {
    if (cookies().has("user")) {
        cookies().delete('user');
    }

    redirect("/");
}