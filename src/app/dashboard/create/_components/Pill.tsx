import { Button } from "@/components/Button";
import clsx from "clsx";

export function Pill({ label, dismissible, handleRemove, size }: {
    label: string;
    dismissible: boolean;
    handleRemove?: Function;
    size: "small" | "normal";
}) {
    return (
        <div className={clsx("w-fit py-1 px-2 rounded-md flex gap-2 content-start border text-gray-500", {
            ["text-xs"]: size === 'small',
            ["text-sm"]: size === 'normal',
        })}>
            <span >
                {label}
            </span>
            {dismissible && (
                <Button type="button" onClick={() => handleRemove && handleRemove()} className={clsx({
                    ["text-xs"]: size === 'small',
                    ["text-sm"]: size === 'normal',
                })}>
                    &#10060;
                </Button>
            )}
        </div>
    )
}