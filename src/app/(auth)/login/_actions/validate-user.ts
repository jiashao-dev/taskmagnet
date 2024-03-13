'use server';

import mongoClient from "@/libs/mongoClient";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function validateUser(prevState: string, data: FormData) {
    const username = data.get('username')?.toString();
    const password = data.get('password')?.toString();

    if (!username || !password) {
        return "Don't leave the fields blank.";
    }

    try {
        await mongoClient.connect();

        const userCollection = mongoClient.db().collection("user");


        const user = await userCollection.findOne({ username: username });
        if (!user) {
            return "User does not exists.";
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return "Invalid credentials.";
        }
        
    } catch(error: any) {
        return "Something went wrong.";
    } finally {
        await mongoClient.close();
    }
    
    cookies().set('user', username);
    redirect("/dashboard/");
}