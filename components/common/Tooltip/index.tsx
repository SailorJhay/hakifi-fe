"use client";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import clsx from 'clsx';
import React from 'react';

type TProps = {
    className?: string;
    popperClassname?: string;
    children?: React.ReactNode;
    placement?: "bottom" | "left" | "right" | "top" | undefined;
    content?: React.ReactNode;
    disabled?: boolean;
    showArrow?: boolean;
};

const TooltipWrapper = (
    {
        children,
        content,
        className,
        placement = 'top',
        popperClassname,
        disabled,
        showArrow = true,
    }: TProps
) => {
    return (
        <TooltipProvider>
            <Tooltip showArrow={showArrow} disabled={disabled}>
                <TooltipTrigger className={clsx('whitespace-nowrap', className)} asChild>{children}</TooltipTrigger>
                <TooltipContent side={placement} className={clsx('min-w-[100px] py-4 flex justify-center items-center',popperClassname)}>
                    {content}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};


export default TooltipWrapper;
