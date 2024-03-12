import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export function Button({
    children,
    className,
    ...props
}: ButtonProps) {
    return (
        <button
            {...props}
            className={clsx(
                className
            )}
        >
            {children}
        </button>
    );
}
