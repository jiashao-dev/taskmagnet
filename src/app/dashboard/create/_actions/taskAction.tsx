"use server"

import { FieldError, MessageState, Task } from "@/utils/definitions";
import mongoClient from "@/utils/mongoClient";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import "server-only";

export async function createTask(_: MessageState, formData: FormData) {
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

        await taskCollection.insertOne({
            title: title,
            description: description,
            dueDate: dueDate ? new Date(dueDate) : undefined,
            priority: priority,
            category: category,
            tags: tag.length > 0 ? tag : undefined,
            belongsTo: username,
            status: "pending",
        });

        res.summary = "Task created.";
        revalidatePath("/dashboard");
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

        const res = taskCollection.find<Task>({
            'belongsTo': user,
        });

        let tasks = [];
        for await (const doc of res) {
            doc._id = doc._id?.toString()
            tasks.push(doc);
        }

        return tasks;
    } catch (err) {
        console.error(err)
    } finally {
        await mongoClient.close()
    }
}

export async function getTask(taskId: string) {
    try {
        await mongoClient.connect();

        const taskCollection = mongoClient.db().collection('task');

        const res = await taskCollection.findOne<Task>({
            _id: new ObjectId(taskId),
        }, { projection: { _id: 0 } });

        return res;
    } catch (err) {
        console.error(err);
    } finally {
        await mongoClient.close()
    }
}

export async function editTask(taskId: string, _: MessageState, formData: FormData) {
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

        const task = await taskCollection.findOne({ 
            "_id": new ObjectId(taskId) 
        })
        if (!task) {
            res.isError = true;
            res.summary = "this task not exist";
            return res;
        }

        const newTask: Task = {
            title: title,
            description: description,
            dueDate: dueDate ? new Date(dueDate) : undefined,
            priority: priority,
            category: category,
            tags: tag.length > 0 ? tag : undefined,
            belongsTo: username,
            status: "pending",
        };

        let a = await taskCollection.findOneAndReplace({
            _id: new ObjectId(taskId),
        }, newTask);

        res.summary = "Task replaced.";

        revalidatePath('/dashboard');
        return res;
    } catch (error) {
        res.isError = true;
        res.summary = "Something went wrong";
        return res;
    } finally {
        await mongoClient.close();
    }
}

export async function deleteTask(id: string | ObjectId) {
    const taskId = typeof id === 'string' ? new ObjectId(id) : id;

    try {
        await mongoClient.connect();
        
        const taskCollection = mongoClient.db().collection('task');
        await taskCollection.findOneAndDelete({
            _id: taskId
        });

        revalidatePath('/dashboard');
    } catch(err) {
        console.error(err);
    } finally {
        await mongoClient.close();
    }
}