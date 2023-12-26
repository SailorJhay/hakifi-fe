import InputNumber from '@/components/common/Input/InputNumber';
import Modal from '@/components/common/Modal';
import SliderRanger from '@/components/common/Slider';
import TooltipWrapper from '@/components/common/Tooltip';
import { Button } from '@/components/ui/button';
import { useTranslationClient } from '@/i18n/client';
import { formatNumber } from '@/utils/format';
import React, { forwardRef, memo, useCallback, useState } from 'react';

interface IAdjustClaimPriceInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    toggle: boolean;
    descriptionMessage: string;
    handleToggle: () => void;
}

const AdjustMargin = forwardRef<
    HTMLInputElement, IAdjustClaimPriceInputProps
>(({ toggle, handleToggle, descriptionMessage, onChange, value, ...props }, forwardRef) => {
    const { t } = useTranslationClient('buy-cover');
    const [percent, setPercent] = useState(0);

    const handleChangePercent = (percent: number) => {
        setPercent(percent);
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
                    <InputNumber classNameInput="!text-left" ref={forwardRef} suffix={renderSuffix()} {...props} descriptionMessage={descriptionMessage} />
                </div>

                <section className="mt-5">
                    <SliderRanger
                        min={2}
                        max={10}
                        marks={{
                            2: '2%',
                            4: '4%',
                            6: '6%',
                            8: '8%',
                            10: '10%',
                        }}
                        value={percent}
                        onChange={handleChangePercent}
                    />
                </section>

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

export default memo(AdjustMargin);