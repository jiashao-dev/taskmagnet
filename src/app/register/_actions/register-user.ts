'use server'

import { FieldError, MessageState } from "@/libs/definitions";
import mongoClient from "@/libs/mongoClient"
import bcrypt from "bcrypt";

export async function registerUser(prevState: MessageState, formData: FormData) {
    const res: MessageState = {
        isError: false,
        summary: "",
    };

    const fieldErrors: FieldError = {};

    const username = formData.get('username')?.toString();
    const password = formData.get('password')?.toString();

    if (!username) {
        fieldErrors.username = "Username is required.";
    }

    if (!password) {
        fieldErrors.password = "Password is required.";
    }

    if (!username || !password) {
        res.isError = true;
        res.summary = "Don't leave the fields blank.";
        res.errors = fieldErrors;
        return res;
    }

    try {
        await mongoClient.connect();

        const userCollections = mongoClient.db().collection("user");

        const user = await userCollections.findOne({ username: username }, { projection: { _id: 1 }});
        if (user) {
            res.isError = true;
            res.summary = "Account exists.";
            return res;
        }

        const hashedPass = await bcrypt.hash(password, 10);
        await userCollections.insertOne({
            username: username,
            password: hashedPass,
        });

        res.isError = false;
        res.summary = "Account registered.";
    } catch(error) {
        res.isError = true;
        res.summary = "Something went wrong.";
    } finally {
        await mongoClient.close();
    }

    return res;
}