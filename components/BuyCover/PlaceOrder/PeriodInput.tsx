import InputNumber from '@/components/common/Input/InputNumber';
import TooltipWrapper from '@/components/common/Tooltip';
import { Button } from '@/components/ui/button';
import { useTranslationClient } from '@/i18n/client';
import React, { forwardRef, useCallback } from 'react';

interface IClaimPriceInputProps extends React.InputHTMLAttributes<HTMLInputElement> {

}

const PeriodInput = forwardRef<
    HTMLInputElement, IClaimPriceInputProps
>(({ ...props }, forwardRef) => {
    const { t } = useTranslationClient('buy-cover');

    const renderPrefix = useCallback(() => {
        return (
            <TooltipWrapper className="text-body-14B" placement="top">
                <Button className="border-b border-dashed border-grey-1">{t('period')}</Button>
            </TooltipWrapper>
        );
    }, []);

    const renderSuffix = useCallback(() => {
        return (
            <div className="flex items-center text-caption-12B">
                <span className='mr-1'>{'Ngày'}</span>
            </div>
        );
    }, []);

    return (
        <InputNumber ref={forwardRef} prefix={renderPrefix()} suffix={renderSuffix()} {...props} />
    );
});

export default PeriodInput;