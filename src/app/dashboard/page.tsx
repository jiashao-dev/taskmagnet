import { cookies } from "next/headers";
import { LogoutButton } from "./_components/LogoutButton";
import { getTasks } from "./create/_actions/taskAction";
import Link from "next/link";

export default async function Page() {
    const user = cookies().get('user');
    const res = await getTasks(user?.value);

    return (
        <main>
            <Link href={"/dashboard/create"}>Add task</Link>
            <LogoutButton />
            <p>Hello, {user?.value}</p>
            {res ? (
                <ul>
                    {res?.map(task => {
                        return (
                            <li key={task._id.toString()} className="border border-black">
                                <ul>
                                    <li>title: {task.title}</li>
                                    <li>description: {task.description}</li>
                                    <li>duedate: {task.dueDate?.toString()}</li>
                                    <li>category: {task.category}</li>
                                    <li>priority: {task.priority}</li>
                                    <Link href={`/dashboard/edit/${task._id}`}>Edit</Link>
                                </ul>
                            </li>
                        );
                    })}
                </ul>
            ) : null}
        </main>
    );
}