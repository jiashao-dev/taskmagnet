"use server"

import { FieldError, Task } from "@/utils/definitions";
import mongoClient from "@/utils/mongoClient";
import { cookies } from "next/headers";
import "server-only";

export async function addTask(formData: FormData) {
    const fieldErrors: FieldError = {};

    const { title, description, dueDate, priority, category, tag } = Object.fromEntries(formData);

    if (!title) {
        fieldErrors.title = "Title is required.";
        console.log("no title");
        return;
    }

    const username = cookies().get('user')?.value;
    if (!username) {
        console.log("no user");
        return;
    }

    try {
        await mongoClient.connect();
        const taskCollection = mongoClient.db().collection('task');
        
        const newTask: Task = {
            title: title.toString(),
            description: description?.toString(),
            dueDate: dueDate ? new Date(dueDate.toString()) : undefined,
            priority: priority?.toString(),
            category: category?.toString(),
            tags: tag ? [tag.toString()] : undefined,
            belongsTo: username,
        };

        const res = await taskCollection.insertOne(newTask);
        console.log(res);
    } catch (error) {
        console.log(error);
    } finally {
        await mongoClient.close();
    }
}