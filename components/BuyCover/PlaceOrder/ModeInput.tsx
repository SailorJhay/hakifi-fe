import React, { forwardRef } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import clsx from "clsx";
import { MODE } from '@/utils/constant';
import { useTranslationClient } from '@/i18n/client';

interface IModeInputProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {

}

const ModeInput = forwardRef<HTMLButtonElement, IModeInputProps>(
    ({ value, onChange }, forwardRef) => {
        const { t } = useTranslationClient('buy-cover');

        return (
            <Tabs ref={forwardRef} defaultValue={MODE.BULL} className="w-full" onValueChange={onChange}>
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value={MODE.BULL} className={clsx('text-button-16B rounded-full uppercase', value === MODE.BULL && ' data-[state=active]:bg-green-default text-white')}>{t('bull')}</TabsTrigger>
                    <TabsTrigger value={MODE.BEAR} className={clsx('text-button-16B rounded-full uppercase', value === MODE.BEAR && ' data-[state=active]:bg-red-default text-white')}>{t('bear')}</TabsTrigger>
                </TabsList>
            </Tabs>
        );
    }

);

export default ModeInput;