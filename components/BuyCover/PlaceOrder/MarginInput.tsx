import colors from '@/colors';
import EditIcon from '@/components/common/Icons/EditIcon';
import InputNumber from '@/components/common/Input/InputNumber';
import TooltipWrapper from '@/components/common/Tooltip';
import { Button } from '@/components/ui/button';
import { useTranslationClient } from '@/i18n/client';
import React, { forwardRef, useCallback, useState } from 'react';
import AdjustMarginInput from './AdjustMarginInput';

interface IClaimPriceInputProps extends React.InputHTMLAttributes<HTMLInputElement> {

}

const MarginInput = forwardRef<
    HTMLInputElement, IClaimPriceInputProps
>(({ ...props }, forwardRef) => {
    const { t } = useTranslationClient('buy-cover');
    const [toggle, setToggle] = useState(false);

    const handleToggle = useCallback((e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setToggle(status => !status);
    }, []);

    const renderPrefix = useCallback(() => {
        return (
            <TooltipWrapper className="text-body-14B" placement="top">
                <Button className="border-b border-dashed border-grey-1">{t('margin')}</Button>
            </TooltipWrapper>
        );
    }, []);

    const renderSuffix = useCallback(() => {
        return (
            <div className="flex items-center text-caption-12B" onClick={handleToggle}>
                <span className='mr-1'>{'USDT'}</span>
                <EditIcon className="cursor-pointer" color={colors.grey[1]} />
            </div>
        );
    }, []);

    return (
        <>
            <InputNumber ref={forwardRef} prefix={renderPrefix()} suffix={renderSuffix()} {...props} />
            <AdjustMarginInput toggle={toggle} handleToggle={handleToggle} descriptionMessage={t('margin')} {...props} />
        </>
    );
});

export default MarginInput;