'use server'

import mongoClient from "@/libs/mongoClient"
import bcrypt from "bcrypt";

export async function registerUser(prevState: string, formData: FormData) {
    try {
        await mongoClient.connect();

        const userCollections = mongoClient.db().collection("user");

        const username = formData.get('username')?.toString();
        const password = formData.get('password')?.toString();
        if (!username || !password) {
            // return {
            //     success: false,
            //     message: "Don't leave the fields blank.",
            // };

            return "Don't leave the fields blank.";
        }

        const user = await userCollections.findOne({ username: username }, { projection: { _id: 1 }});
        if (user) {
            // return {
            //     success: false,
            //     message: "Account exists.",
            // };

            return "Account exists.";
        }

        const hashedPass = await bcrypt.hash(password, 10);
        const res = await userCollections.insertOne({
            username: username,
            password: hashedPass,
        });

        // return {
        //     success: true,
        //     message: "Account registered.",
        // };

        return "Account registered.";
    } catch(error) {
        // return {
        //     success: false,
        //     message: "Something is wrong."
        // };

        return "Something is wrong.";
    } finally {
        await mongoClient.close();
    }
}