'use server';

import { FieldError, MessageState } from "@/libs/definitions";
import mongoClient from "@/libs/mongoClient";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function validateUser(prevState: MessageState, data: FormData) {
    const res: MessageState = {
        isError: true,
        summary: "",
    };

    const fieldErrors: FieldError = {};

    const username = data.get('username')?.toString();
    const password = data.get('password')?.toString();

    if (!username) {
        fieldErrors.username = "Username is required.";
    }

    if (!password) {
        fieldErrors.password = "Password is required.";
    }

    if (!username || !password) {
        res.summary = "Don't leave the fields blank.";
        res.errors = fieldErrors;
        return res;
    }

    try {
        await mongoClient.connect();

        const userCollection = mongoClient.db().collection("user");

        const user = await userCollection.findOne({ username: username });
        if (!user) {
            res.summary = "User does not exists.";
            return res;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.summary = "Invalid credentials.";
            return res;
        }
        
    } catch(error: any) {
        res.summary = "Something went wrong.";
        return res;
    } finally {
        await mongoClient.close();
    }
    
    cookies().set('user', username);
    redirect("/dashboard/");
}