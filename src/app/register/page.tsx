import Link from "next/link";
import { RegisterForm } from "./_components/RegisterForm";

export default function Page() {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-1/2 h-full py-20 px-40">
                <div className="w-full mb-2">
                    <h2 className="text-xl font-bold text-blue-700">TaskMagnet</h2>
                </div>
                <div className="pt-5 w-full">
                    <h1 className="text-3xl font-bold py-2">
                        Create your account
                    </h1>
                </div>
                <div className="w-full mb-2">
                    <RegisterForm />
                </div>
                <div className="w-full pt-8">
                    <p className="text-sm text-center text-gray-400">
                        Already have an account?
                        <span className="ml-3 text-blue-700 font-medium hover:text-blue-500">
                            <Link href={"/"}>
                                Sign in
                            </Link>
                        </span>
                    </p>
                </div>
            </div>
            <div className="bg-blue-700 w-1/2 h-full"></div>
        </div>
    )
}