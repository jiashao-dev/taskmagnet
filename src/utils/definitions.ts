import { ObjectId } from "mongodb";

export type FieldError = {
    [elementId: string]: string
}

export interface MessageState {
    summary: string;
    isError: boolean;
    errors?: FieldError,
}

export interface Task {
    title: string;
    description?: string;
    dueDate?: Date;
    priority?: string;
    category?: string;
    tags?: string[];
    belongsTo: string,
}