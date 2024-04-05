'use client';

import { Task } from "@/utils/definitions";
import { ChangeEvent, useState } from "react";
import { Pill } from "../create/_components/Pill";
import Link from "next/link";
import { SubmitButton } from "@/components/SubmitButton";
import { completeTask, deleteTask } from "../create/_actions/taskAction";

export function TaskItem({
    task
}: {
    task: Task
}) {
    const [isCompleted, setIsCompleted] = useState(task.status === 'completed')

    const dueDateString: string = task.dueDate 
        ? task.dueDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
        }) 
        : "Today";

    function handleInputChange(e: ChangeEvent) {
        setIsCompleted(prevIsCompleted => {
            const newComplete = !prevIsCompleted
            completeTask(task._id, newComplete)

            return newComplete
        });
    }

    return (
        <div className="w-full flex flex-row content-between items-center">
            <div className="basis-1/12">
                <input
                    type="checkbox" 
                    checked={isCompleted}
                    onChange={handleInputChange}
                    className="size-5 accent-blue-500"
                />
            </div>
            <Link 
                href={`/dashboard/edit/${task._id}`} 
                className="basis-10/12 flex flex-row w-full items-center"
            >
                <div className="basis-10/12 flex flex-col w-full">
                    <p>
                        {task.title} <span className="text-sm text-gray-500 capitalize">&bull; {task.category}</span>
                    </p>
                    <div className="flex flex-row gap-2 py-2">
                        {task.tags?.map((tag, idx) => (
                            <Pill 
                                key={idx} 
                                label={tag} 
                                dismissible={false}
                                size={"small"}
                            />
                        ))}
                    </div>
                </div>
                <div className="basis-2/12 text-center">
                    <p>{dueDateString}</p>
                </div>
            </Link>
            <SubmitButton title="&#10060;" className="basis-1/12" onClick={() => deleteTask(task._id)} />
        </div>
    )
}