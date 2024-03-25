import { ReactNode } from "react";
import { SideNav } from "./_components/SideNav";

export default function Layout({ children }: {
    children: ReactNode;
}) {
    return (
        <div className="flex size-screen">
            <SideNav />
            <div className="size-full">
                {children}
            </div>
        </div>
    )
}