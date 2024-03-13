import { cookies } from "next/headers";
import { LogoutButton } from "./_components/LogoutButton";

export default function Page() {
    const user = cookies().get('user');

    return (
        <main>
            <LogoutButton />
            <p>Hello, {user?.value}</p>
        </main>
    );
}