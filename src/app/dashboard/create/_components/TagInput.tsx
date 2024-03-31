'use client';

import { Button } from "@/components/Button";
import { Fragment, KeyboardEvent, useState } from "react";
import { Pill } from "./Pill";

export function TagInput({
    tagsProp
}: {
    tagsProp?: string[];
}) {
    const [show, setShow] = useState(false);
    const [tags, setTags] = useState<string[]>(tagsProp ?? []);

    function handleClick() {
        setShow(true);
    }

    function handleEnter(e: KeyboardEvent) {
        if (e.key !== 'Enter') {
            return;
        }

        e.preventDefault();

        const value = (e.target as HTMLInputElement).value.trim();

        if (value.length > 0) {
            setTags(prev => [
                ...prev,
                value,
            ])
        }

        setShow(false);
    }

    function handleRemoveTag(tagId: number) {
        setTags(prev => {
            return prev.filter((_, idx) => idx !== tagId)
        })
    }

    return (
        <div className="flex gap-1">
            {tags.map((tag, idx) => (
                <Fragment key={idx}>
                    <Pill 
                        label={tag} 
                        dismissible={true}
                        handleRemove={() => handleRemoveTag(idx)}
                        size="normal"
                    />
                    <input
                        type="hidden"
                        name="tag"
                        value={tag}
                    />
                </Fragment>
            ))}
            {show && (
                <input
                    type="text"
                    onKeyDown={handleEnter}
                    className="border outline-none py-1 px-2 text-sm text-gray-500"
                />
            )}
            <Button
                type="button"
                className="w-fit border text-gray-500 text-sm py-1 px-2 rounded-md active:bg-gray-600 active:text-gray-400"
                onClick={handleClick}
            >
                + Add tag
            </Button>
        </div>
    )
}