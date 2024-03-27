'use client';

import Link from "next/link";
import { LogoutButton } from "./LogoutButton";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export function SideNav() {
    const pathname = usePathname();

    return (
        <aside className="h-screen w-40 border-r">
            <nav className="size-full flex flex-col py-4">
                <Link
                    href={"/dashboard/"}
                    className="py-2 px-5 font-bold text-xl"
                >
                    TaskMagnet
                </Link>
                <ul className="h-full flex flex-col py-4">
                    <li role="link" className={clsx("w-full py-3 px-5 hover:bg-slate-100", {
                        ["bg-slate-100"]: pathname === "/dashboard",
                    })}>
                        <Link href={"/dashboard"}>
                            Home
                        </Link>
                    </li>
                    <li className={clsx("w-full py-3 px-5 hover:bg-slate-100", {
                        ["bg-slate-100"]: pathname === "/dashboard/create",
                    })}>
                        <Link href={"/dashboard/create"}>
                            Create task
                        </Link>
                    </li>
                    <li className="w-full py-3 px-5 hover:bg-slate-100">
                        <LogoutButton />
                    </li>
                </ul>
            </nav>
        </aside>
    )
}