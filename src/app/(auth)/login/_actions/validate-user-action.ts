'use server';

import mongoClient from "@/libs/mongoClient";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

export async function validateUser(data: FormData) {
    try {
        await mongoClient.connect();

        const username = data.get('username')?.toString();
        const password = data.get('password')?.toString();

        if (!username || !password) {
            return;
        }

        const user = await mongoClient.db().collection('user').findOne({
            "username": username,
        });

        if (!user) {
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return;
        }

        redirect("/dashboard/")        
    } finally {
        await mongoClient.close();
    }
}