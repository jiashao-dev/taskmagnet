'use client';

import { useFormState } from "react-dom";
import { SubmitButton } from "../../../components/SubmitButton";
import { createTask } from "./_actions/taskAction";
import { MessageState } from "@/utils/definitions";
import { Button } from "@/components/Button";

export default function Page() {
    const [formState, dispatch] = useFormState(createTask, {
        isError: false,
        summary: "",
    } satisfies MessageState);

    return (
        <form action={dispatch}>
            <p>{formState.summary}</p>
            <div>
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    type="text"
                    name="title"
                    required
                    aria-required
                />
                <label htmlFor="title">{formState.errors?.title}</label>
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" rows={3} cols={50} />
            </div>
            <div>
                <label htmlFor="due-date">Due date</label>
                <input
                    id="due-date"
                    type="date"
                    name="dueDate"
                />
            </div>
            <fieldset>
                <legend>Priority</legend>
                <div>
                    <div>
                        <input
                            id="low-priority"
                            type="radio"
                            name="priority"
                            value={"low"}
                            defaultChecked
                        />
                        <label htmlFor="low-priority">
                            Low
                        </label>
                    </div>
                    <div>
                        <input
                            id="medium-priority"
                            type="radio"
                            name="priority"
                            value={"medium"}
                        />
                        <label htmlFor="medium-priority">
                            Medium
                        </label>
                    </div>
                    <div>
                        <input
                            id="high-priority"
                            type="radio"
                            name="priority"
                            value={"high"}
                        />
                        <label htmlFor="high-priority">
                            High
                        </label>
                    </div>
                </div>
            </fieldset>
            <div>
                <label htmlFor="category">Category</label>
                <select id="category" name="category" defaultValue={"personal"}>
                    <option disabled>Select category</option>
                    <option value="personal">Personal</option>
                    <option value="work">Work</option>
                    <option value="home">Home</option>
                </select>
            </div>
            <div>
                <div id="tag-container">
                    <label htmlFor="tag">Tag</label>
                    <input
                        id="tag"
                        type="text"
                        name="tag"
                    />
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
    );
}