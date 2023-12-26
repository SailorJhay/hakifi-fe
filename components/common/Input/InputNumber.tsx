/* eslint-disable react/display-name */
import { isFunction } from '@/utils/helpers';
import clsx from 'clsx';
import React, { ReactNode, forwardRef, useState } from 'react';
import { NumericFormat } from 'react-number-format';

interface IInputNumberProps extends React.InputHTMLAttributes<HTMLInputElement> {
    prefix?: ReactNode;
    suffix?: ReactNode;
    classNameInput?: string;
    prefixClassName?: string;
    suffixClassName?: string;
    errorMessage?: string;
    descriptionMessage?: string;
}

const InputNumber = forwardRef<HTMLInputElement, IInputNumberProps>(
    ({ prefix, suffix, classNameInput, prefixClassName, suffixClassName, errorMessage, descriptionMessage, onBlur, onFocus, ...props }, ref) => {
        const [_focus, setFocus] = useState(false);

        const _handleOnFocus = (e: FocusEvent) => {
            setFocus(true);
            if (onFocus) onFocus(e);
        };
        const _handleOnBlur = (e: FocusEvent) => {
            setFocus(false);
            if (onBlur) onBlur(e);
        };

        return (
            <section className='flex flex-col items-start gap-1'>
                <section className={clsx('flex rounded-[10px] px-3 py-2 border-[1px] bg-light-2 border-transparent w-full', errorMessage && 'border-red-default',
                    prefix ? 'justify-between ' : 'justify-end',
                    classNameInput)}>
                    {prefix && (
                        <div className={clsx('z-1 text-grey-1 text-body-14B whitespace-nowrap flex items-center', prefixClassName)}>
                            {isFunction(prefix) ? prefix() : prefix}
                        </div>
                    )}
                    <section className={clsx("flex items-center w-full")}>
                        <NumericFormat
                            onFocus={_handleOnFocus}
                            onBlur={_handleOnBlur}
                            thousandSeparator=","
                            getInputRef={ref}
                            decimalScale={2}
                            className={clsx('focus:outline-none text-right bg-light-2 text-body-14B text-primary-3 w-full', classNameInput)}
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


                <div
                    className={clsx(
                        "text-caption-12B text-grey-1 max-h-0 transition-all duration-200 overflow-hidden",
                        _focus && !errorMessage && descriptionMessage && '!max-h-10 pt-1'
                    )}
                >
                    {descriptionMessage}
                </div>


            </section>


        );
    }
);

export default InputNumber;
