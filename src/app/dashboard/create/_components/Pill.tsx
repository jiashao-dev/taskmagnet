import { Button } from "@/components/Button";

export function Pill({ label, dismissible, handleRemove }: {
    label: string;
    dismissible: boolean;
    handleRemove?: Function;
}) {
    return (
        <div className="w-fit py-1 px-2 rounded-md flex gap-2 content-start border text-gray-500 text-sm">
            <span >
                {label}
            </span>
            {dismissible && (
                <Button type="button" onClick={() => handleRemove && handleRemove()} className="text-sm">
                    &#10060;
                </Button>
            )}
        </div>
    )
}