import InputNumber from '@/components/common/Input/InputNumber';
import Modal from '@/components/common/Modal';
import TooltipWrapper from '@/components/common/Tooltip';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslationClient } from '@/i18n/client';
import { adjustPercents } from '@/utils/constant';
import { formatNumber } from '@/utils/format';
import clsx from 'clsx';
import React, { forwardRef, memo, useCallback, useState } from 'react';

interface IAdjustClaimPriceInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    toggle: boolean;
    descriptionMessage: string;
    handleToggle: () => void;
}

const AdjustClaimPrice = forwardRef<
    HTMLInputElement, IAdjustClaimPriceInputProps
>(({ toggle, handleToggle, descriptionMessage, onChange, value, ...props }, forwardRef) => {
    const { t } = useTranslationClient('buy-cover');
    const [percent, setPercent] = useState(0);

    const handleChangePercent = (percent: string) => {
        setPercent(Number(percent));
    };

    const renderSuffix = useCallback(() => {
        return (
            <div className="flex items-center text-caption-12B">
                <span className='mr-1'>{'USDT'}</span>
            </div>
        );
    }, []);

    const handleCloseModal = () => {
        setPercent(0);
        handleToggle();
    };

    return (
        <Modal
            isOpen={toggle}
            isMobileFullHeight
            onRequestClose={handleCloseModal}
            className='max-w-sm'
            title={t('adjust_claim_price')}
        >
            <div className="">
                <TooltipWrapper className="text-body-14B" placement="top" content={t('claim_price')}>
                    <Button className="border-b border-dashed border-primary-3">{t('claim_price')}</Button>
                </TooltipWrapper>

                <div className="mt-3">
                    <InputNumber classNameInput="!text-left" ref={forwardRef} suffix={renderSuffix()} descriptionMessage={descriptionMessage} {...props} />
                </div>

                <Tabs className="w-full mt-5" onValueChange={handleChangePercent}>
                    <TabsList className="grid w-full grid-cols-4">
                        {
                            adjustPercents.map(item => {
                                return <TabsTrigger key={item.label} value={item.value} className={clsx('text-button-14B rounded-full uppercase', (percent) === Number(item.value) && 'data-[state=active]:bg-primary-1 text-white')}>{item.label}%</TabsTrigger>;
                            })
                        }
                    </TabsList>
                </Tabs>

                <div className='flex flex-col gap-2 mt-5'>
                    <div className="flex justify-between items-center gap-1">
                        <TooltipWrapper className="text-body-14B" placement="top" content={t('market_price')}>
                            <Button className="border-b border-dashed border-grey-1">{t('market_price')}</Button>
                        </TooltipWrapper>
                        <div className="text-primary-3 text-body-14B">{formatNumber(3813)} USDT</div>
                    </div>
                    <div className="flex justify-between items-center gap-1 text-body-14B">
                        <TooltipWrapper placement="top" content={t('saving')}>
                            <Button className="border-b border-dashed border-grey-1">{t('quantity_claim')}</Button>
                        </TooltipWrapper>
                        <div className="text-primary-3">{formatNumber(3813)} USDT <span className="text-green-default">({formatNumber(233.3)}%)</span></div>
                    </div>
                </div>

                <Button disabled={!value} variant={'primary'} size={'lg'} className="mt-5 w-full rounded-full justify-center">{t('confirm')}</Button>
            </div>
        </Modal>
    );
});

export default memo(AdjustClaimPrice);