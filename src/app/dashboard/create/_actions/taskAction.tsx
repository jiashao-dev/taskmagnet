"use server"

import { FieldError, MessageState, Task } from "@/utils/definitions";
import mongoClient from "@/utils/mongoClient";
import { ObjectId } from "mongodb";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import "server-only";

export async function createTask(prevState: MessageState, formData: FormData) {
    const username = cookies().get('user')?.value;
    if (!username) {
        redirect("/");
    }

    const res: MessageState = {
        isError: false,
        summary: "",
    }

    const fieldErrors: FieldError = {};

    if (!formData.has('title')) {
        fieldErrors.title = "Title is required.";

        res.isError = true;
        res.errors = fieldErrors;
        res.summary = "Please fill in the required fields.";
        return res;
    }

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const dueDate = formData.get('dueDate') as string;
    const priority = formData.get('priority') as string;
    const category = formData.get('category') as string;
    const tag = (formData.getAll('tag') as string[])
        .map((tag) => tag.trim())
        .filter(tag => tag.length > 0);

    try {
        await mongoClient.connect();
        const taskCollection = mongoClient.db().collection('task');

        const newTask: Task = {
            title: title,
            description: description,
            dueDate: dueDate ? new Date(dueDate) : undefined,
            priority: priority,
            category: category,
            tags: tag.length > 0 ? tag : undefined,
            belongsTo: username,
        };

        await taskCollection.insertOne(newTask);
        res.summary = "Task created.";
        return res;
    } catch (error) {
        res.isError = true;
        res.summary = "Something went wrong";
        return res;
    } finally {
        await mongoClient.close();
    }
}

export async function getTasks(user: string | undefined) {
    try {
        await mongoClient.connect();

        const taskCollection = mongoClient.db().collection('task');

        const res = taskCollection.find({
            'belongsTo': user,
        });

        let tasks = [];
        for await (const doc of res) {
            tasks.push(doc);
        }

        return tasks;
    } catch (err) {
        console.error(err)
    } finally {
        await mongoClient.close()
    }
}

export async function editTask(prevState: MessageState, formData: FormData) {
    const username = cookies().get('user')?.value;
    if (!username) {
        redirect("/");
    }

    const res: MessageState = {
        isError: false,
        summary: "",
    }

    const fieldErrors: FieldError = {};

    if (!formData.has('title')) {
        fieldErrors.title = "Title is required.";

        res.isError = true;
        res.errors = fieldErrors;
        res.summary = "Please fill in the required fields.";
        return res;
    }

    const taskId = formData.get('id') as string;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const dueDate = formData.get('dueDate') as string;
    const priority = formData.get('priority') as string;
    const category = formData.get('category') as string;
    const tag = (formData.getAll('tag') as string[])
        .map((tag) => tag.trim())
        .filter(tag => tag.length > 0);

    try {
        await mongoClient.connect();
        const taskCollection = mongoClient.db().collection('task');

        const task = await taskCollection.findOne({_id: new ObjectId(taskId)})
        if (!task) {
            res.isError = true;
            res.summary = "this task not exist";
        }

        const newTask: Task = {
            title: title,
            description: description,
            dueDate: dueDate ? new Date(dueDate) : undefined,
            priority: priority,
            category: category,
            tags: tag.length > 0 ? tag : undefined,
            belongsTo: username,
        };

        await taskCollection.findOneAndReplace({ 
            _id: { 
                taskId,
            }
        }, newTask);
        res.summary = "Task replaced.";
        return res;
    } catch (error) {
        res.isError = true;
        res.summary = "Something went wrong";
        return res;
    } finally {
        await mongoClient.close();
    }
}