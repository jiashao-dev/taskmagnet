'use client';

import { Button } from "@/components/Button";
import { ObjectId } from "mongodb";
import { useFormStatus } from "react-dom";
import { deleteTask } from "../create/_actions/taskAction";

export function DeleteTaskButton({ taskId }: {
    taskId: string | ObjectId;
}) {
    const { pending } = useFormStatus();

    return (
        <Button 
            disabled={pending} 
            aria-disabled={pending} 
            onClick={async () => await deleteTask(taskId)}
        >
            Delete
        </Button>
    )
}