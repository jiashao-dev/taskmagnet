import { redirect } from "next/navigation";
import { getTask } from "../../create/_actions/taskAction";
import { TaskEditingForm } from "./_components/TaskEditingForm";

export default async function Page({ params }: {
    params: {
        id: string;
    }
}) {
    const task = await getTask(params.id);
    if (!task) {
        redirect('/dashboard');
    }

    return (
        <TaskEditingForm task={task} taskId={params.id} />
    )
}