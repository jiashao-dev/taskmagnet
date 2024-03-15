'use server'

import { FieldError, MessageState } from "@/utils/definitions";
import mongoClient from "@/utils/mongoClient"
import bcrypt from "bcrypt";

export async function registerUser(prevState: MessageState, formData: FormData) {
    const res: MessageState = {
        isError: false,
        summary: "",
    };

    const fieldErrors: FieldError = {};

    const username = formData.get('username')?.toString();
    const password = formData.get('password')?.toString();
    const email = formData.get('email')?.toString();

    if (!username) {
        fieldErrors.username = "Username is required.";
    }

    if (!password) {
        fieldErrors.password = "Password is required.";
    }

    const emailRegex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email) {
        fieldErrors.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
        fieldErrors.email = "Invalid email format.";
    }

    if (!username || !password || !email) {
        res.isError = true;
        res.summary = "Don't leave the fields blank.";
        res.errors = fieldErrors;
        return res;
    }

    try {
        await mongoClient.connect();

        const userCollections = mongoClient.db().collection("user");

        const user = await userCollections.findOne({
            "$or": [
                { "username": username },
                { "email": email },
            ],
        }, { projection: { _id: 1 }});
        if (user) {
            res.isError = true;
            res.summary = "Account exists.";
            return res;
        }

        const hashedPass = await bcrypt.hash(password, 10);
        await userCollections.insertOne({
            username: username,
            email: email,
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