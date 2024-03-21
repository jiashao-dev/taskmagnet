'use client';

import { useFormState } from "react-dom";
import { MessageState, Task } from "@/utils/definitions";
import { Button } from "@/components/Button";
import { SubmitButton } from "@/components/SubmitButton";
import { editTask } from "@/app/dashboard/create/_actions/taskAction";

export function TaskEditingForm({ task, taskId }: {
     task: Task;
     taskId: string;
}) {
    const [formState, dispatch] = useFormState(editTask, {
        isError: false,
        summary: "",
    } satisfies MessageState);

    return (
        <div>
            <p>{formState.summary}</p>
            <form action={dispatch} className="flex flex-col items-start content-around">
                <input name="taskId" type="hidden" value={taskId} />
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
                        defaultValue={task.title}
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
                        defaultValue={task.description}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="due-date">Due date (optional)</label>
                    <input
                        id="due-date"
                        type="date"
                        name="dueDate"
                        defaultValue={task.dueDate?.toString()}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="priority">Priority</label>
                    <select id="priority" name="priority" defaultValue={task.priority}>
                        <option disabled>Select priority</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="category">Category</label>
                    <select id="category" name="category" defaultValue={task.category}>
                        <option disabled>Select category</option>
                        <option value="personal">Personal</option>
                        <option value="work">Work</option>
                        <option value="home">Home</option>
                    </select>
                </div>
                <div className="flex flex-col">
                    <div id="tag-container" className="flex flex-col">
                        <label htmlFor="tag">Tag (optional)</label>
                        {task.tags?.map((tag, idx) => {
                            return (
                                <input 
                                    key={idx} 
                                    id="tag" 
                                    type="text" 
                                    name="tag"
                                    defaultValue={tag}
                                />
                            )
                        })}
                    </div>
                    <Button type="button" onClick={() => {
                        const newTag = document.createElement("input");
                        newTag.setAttribute("id", "tag");
                        newTag.setAttribute("name", "tag");
                        newTag.setAttribute("type", "text");

                        document.getElementById('tag-container')?.appendChild(newTag);
                    }}>Add tag</Button>
                </div>
                <SubmitButton title="Edit Task" />
            </form>
        </div>
    );
}