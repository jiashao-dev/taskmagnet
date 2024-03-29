import { ReactNode } from "react";
import { SideNav } from "./_components/SideNav";

export default function Layout({ children }: {
    children: ReactNode;
}) {
    return (
        <div className="flex size-full">
            <SideNav />
            <div className="size-full size-">
                {children}
            </div>
        </div>
    )
}