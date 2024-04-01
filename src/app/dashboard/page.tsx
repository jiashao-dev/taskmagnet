import { cookies } from "next/headers";
import { getTasks } from "./create/_actions/taskAction";
import { ReactNode } from "react";
import { TaskItem } from "./_components/TaskItem";
import Link from "next/link";

export default async function Page() {
    const user = cookies().get('user');
    const todos = await getTasks(user?.value);

    let list: ReactNode;

    if (!todos || todos.length <= 0) {
        list = (
            <p>No task. Add <Link className="text-blue-500 hover:underline" href={"/dashboard/create"}>new task</Link> now.</p>
        )
    } else {
        list = todos.sort((a, b) => {
            if (!a.dueDate && !b.dueDate) {
                return 0
            }

            if (!a.dueDate) {
                return 1
            }

            if (!b.dueDate) {
                return -1
            }

            return a.dueDate.getTime() - b.dueDate.getTime();
        }).map((todo) => {
            return (
                <li
                    key={todo._id!.toString()}
                    className="py-1"
                >
                        <TaskItem task={todo} />
                </li>
            );
        })
    }

    return (
        <div className="size-full flex flex-col">
            <header className="w-full py-4 px-8 mb-2">
                <h1 className="font-semibold">
                    <span className="text-blue-800 text-xl">Hello</span>, {user?.value}
                </h1>
            </header>
            <main className="p-5 size-full">
                <div className="bg-white p-4 rounded-lg flex flex-col">
                    {todos ? (
                        <ul className="divide-y">
                            {list}
                        </ul>
                    ): list}
                </div>
            </main>
        </div>
    );
}