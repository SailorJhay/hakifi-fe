"use client";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ReactNode } from "react";

type TPopup = {
    isOpen?: boolean;
    handleOnChangeStatus?: () => void;
    children: ReactNode;
    content: ReactNode;
    classContent?: string;
    classTrigger?: string;
};

export function Popup({ children, content, classContent, classTrigger, isOpen, handleOnChangeStatus }: TPopup) {
    return (
        <Popover open={isOpen} onOpenChange={handleOnChangeStatus}>
            <PopoverTrigger asChild className={classTrigger}>
                {children}
            </PopoverTrigger>
            <PopoverContent className={classContent} collisionPadding={16} sideOffset={24}>
                {content}
            </PopoverContent>
        </Popover>
    );
}

export default Popup;
