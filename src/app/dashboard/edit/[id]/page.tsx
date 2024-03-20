'use client'

import { Button } from "@/components/Button";
import { SubmitButton } from "@/components/SubmitButton";
import { useFormState } from "react-dom";
import { editTask } from "../../create/_actions/taskAction";
import { MessageState } from "@/utils/definitions";
import { useState } from "react";

export default function Page({ params }: {
    params: {
        id: string;
    }
}) {
    const [formState, dispatch] = useFormState(editTask, {
        isError: false,
        summary: "",
    } satisfies MessageState);
    const [tags, setTags] = useState<{  }[]>([])

    return (
        <div>
            <p>{formState.summary}</p>
            <form action={dispatch} className="flex flex-col items-start content-around">
                <div className="flex flex-col w-full">
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        type="text"
                        name="title"
                        placeholder="Enter your task name"
                        required
                        aria-required
                        className="w-full"
                    />
                    <label htmlFor="title">{formState.errors?.title}</label>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="description">Description (optional)</label>
                    <textarea
                        id="description"
                        name="description"
                        rows={3}
                        cols={50}
                        placeholder="Enter description"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="due-date">Due date (optional)</label>
                    <input
                        id="due-date"
                        type="date"
                        name="dueDate"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="priority">Priority</label>
                    <select id="priority" name="priority" defaultValue={"low"}>
                        <option disabled>Select priority</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="category">Category</label>
                    <select id="category" name="category" defaultValue={"personal"}>
                        <option disabled>Select category</option>
                        <option value="personal">Personal</option>
                        <option value="work">Work</option>
                        <option value="home">Home</option>
                    </select>
                </div>
                <div className="flex flex-col">
                    <div id="tag-container" className="flex flex-col">
                        <label htmlFor="tag">Tag (optional)</label>
                        <input id="tag" type="text" name="tag" />
                    </div>
                    <Button type="button" onClick={() => {
                        const newTag = document.createElement("input");
                        newTag.setAttribute("id", "tag");
                        newTag.setAttribute("name", "tag");
                        newTag.setAttribute("type", "text");

                        document.getElementById('tag-container')?.appendChild(newTag);
                    }}>Add tag</Button>
                </div>
                <SubmitButton title="Add Task" />
            </form>
        </div>
    );
}