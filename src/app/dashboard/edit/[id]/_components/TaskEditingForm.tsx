'use client';

import { useFormState } from "react-dom";
import { MessageState, Task } from "@/utils/definitions";
import { Button } from "@/components/Button";
import { SubmitButton } from "@/components/SubmitButton";
import { deleteTask, editTask } from "@/app/dashboard/create/_actions/taskAction";
import { TagInput } from "@/app/dashboard/create/_components/TagInput";

export function TaskEditingForm({ task, taskId }: {
    task: Task;
    taskId: string;
}) {
    const editTaskWithId = editTask.bind(null, taskId)

    const [formState, dispatch] = useFormState(editTaskWithId, {
        isError: false,
        summary: "",
    } satisfies MessageState);

    return (
        <form
            action={dispatch}
            className="flex flex-col items-start content-around p-5 size-full gap-4"
        >
            <p>{formState.summary}</p>
            <div className="flex flex-col w-full gap-1">
                <input
                    id="title"
                    type="text"
                    name="title"
                    placeholder="Enter your task name"
                    required
                    aria-required
                    className="w-full border-0 outline-0 text-2xl font-bold bg-slate-100"
                    defaultValue={task.title}
                />
                <label htmlFor="title">{formState.errors?.title}</label>
            </div>
            <div className="flex flex-col w-full">
                <textarea
                    id="description"
                    name="description"
                    placeholder="Enter description"
                    defaultValue={task.description}
                    style={{ resize: "none" }}
                    className="w-full h-32 p-4 border-0 outline-0 rounded-lg"
                />
            </div>
            <section className="flex flex-col w-full bg-white p-4 rounded-lg gap-2">
                <header className="py-2">
                    <h2 className="text-lg font-bold">Task settings</h2>
                </header>
                <section className="flex flex-col w-full gap-2 py-2">
                    <label
                        htmlFor="category"
                        className="font-semibold text-gray-500"
                    >
                        Category
                    </label>
                    <select
                        id="category"
                        name="category"
                        defaultValue={"personal"}
                        className="w-fit outline-none border-none"
                    >
                        <option disabled>Select category</option>
                        <option value="personal">Personal</option>
                        <option value="work">Work</option>
                        <option value="home">Home</option>
                    </select>
                </section>
                <div className="border"></div>
                <section className="flex flex-col w-full gap-2 py-2">
                    <label
                        htmlFor="priority"
                        className="font-semibold text-gray-500"
                    >
                        Priority
                    </label>
                    <select
                        id="priority"
                        name="priority"
                        defaultValue={task.priority}
                        className="w-fit outline-none border-none"
                    >
                        <option disabled>Select priority</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </section>
                <div className="border"></div>
                <section className="flex flex-col w-full gap-2 py-2">
                    <label
                        htmlFor="due-date"
                        className="font-semibold text-gray-500"
                    >
                        Due date
                    </label>
                    <input
                        id="due-date"
                        type="date"
                        name="dueDate"
                        className="w-fit outline-none border-none"
                        defaultValue={task.dueDate?.toString()}
                    />
                </section>
                <div className="border"></div>
                <section className="flex flex-col w-full gap-2 py-2">
                    <label className="font-semibold text-gray-500">
                        Tag
                    </label>
                    <TagInput tagsProp={task.tags}/>
                </section>
            </section>
            <div className="w-full flex flex-row gap-2">
                <SubmitButton type="submit" title="Save" className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-700" />
                <SubmitButton type="button" title="Delete" className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-700" onClick={() => deleteTask(taskId)} />
            </div>
        </form>
    );
}