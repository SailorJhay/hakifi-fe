/* eslint-disable react/display-name */
import { Input } from '@/components/ui/input';
import { isFunction } from '@/utils/helpers';
import clsx from 'clsx';
import React, { KeyboardEventHandler, ReactNode, forwardRef } from 'react';

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    prefix?: ReactNode;
    suffix?: ReactNode;
    placeholder: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    value: string;
    classNameInput?: string;
    prefixClassName?: string;
    suffixClassName?: string;
    onKeyDown?: KeyboardEventHandler<HTMLInputElement> | undefined;
}

const CommonInput = forwardRef<HTMLInputElement, IInputProps>(
    ({ prefix, suffix, classNameInput, prefixClassName, suffixClassName, errorMessage: errorMessage, ...props }, ref) => {
        return (
            <section className='flex flex-col items-start gap-1'>
                <section className={clsx('flex justify-between rounded-[10px] px-3 py-2 border-[1px] bg-light-2 border-transparent w-full', errorMessage && 'border-red-default', classNameInput)}>
                    {prefix && (
                        <div className={clsx('z-1 text-grey-1 text-body-14B whitespace-nowrap flex items-center', prefixClassName)}>
                            {isFunction(prefix) ? prefix() : prefix}
                        </div>
                    )}
                    <section className="flex items-center">
                        <Input
                            ref={ref}
                            className={clsx('bg-light-2', classNameInput)}
                            {...props}
                        />
                        {suffix && (
                            <div className={clsx('z-1 border-l border-light-1 text-grey-1 text-body-14B whitespace-nowrap pl-2 ml-2 py-1', suffixClassName)}>
                                {isFunction(suffix) ? suffix() : suffix}
                            </div>
                        )}
                    </section>
                </section>
                {
                    errorMessage ? <div
                        className={clsx(
                            `text-caption-12B text-red-default transition-all duration-200 max-h-0 overflow-hidden`,
                        )}
                    >
                        <div>{errorMessage}</div>
                    </div> : null
                }
            </section>


        );
    }
);

export default CommonInput;
