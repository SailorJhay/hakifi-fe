import colors from '@/colors';
import { useTranslationClient } from '@/i18n/client';
import React, { forwardRef, memo, useCallback, useMemo, useState } from 'react';
import ChevronBottomTriangleIcon from '@/components/common/Icons/ChevronBottomTriangleIcon';
import InputNumber from '@/components/common/Input/InputNumber';
import TooltipWrapper from '@/components/common/Tooltip';
import { Button } from '@/components/ui/button';
import Popup from '@/components/common/Popup';
import { useParams } from 'next/navigation';
import clsx from 'clsx';
import CheckIcon from '@/components/common/Icons/CheckIcon';

interface IClaimPriceInputProps extends React.InputHTMLAttributes<HTMLInputElement> {

}

const Suffix = memo(() => {
    const [selected, setSelected] = useState('USDT');
    const [toggle, setToggle] = useState<boolean>(false);
    const handleToggle = useCallback(() => {
        setToggle(pre => !pre);
    }, []);
    const changeAsset = useCallback((value: string) => {
        setSelected(value);
        handleToggle();
    }, []);
    const { symbol } = useParams();

    const { baseAsset, quoteAsset } = useMemo(() => {
        return {
            baseAsset: `${symbol.toString().split('USDT')[0]}`,
            quoteAsset: 'USDT'
        };
    }, [symbol]);


    return (
        <Popup
            classTrigger="border-r border-light-2 min-w-[54px]"
            classContent="border-primary-1 border max-w-[130px]"
            isOpen={toggle}
            handleOnChangeStatus={handleToggle}
            content={
                <section className="py-2 px-3 flex flex-col gap-2 items-start  border-primary-1">
                    <Button
                        className={clsx("outline-none flex items-center justify-between gap-4", selected === quoteAsset ? 'text-primary-1' : "text-grey-1")}
                        onClick={() => changeAsset(quoteAsset)}>
                        <div>{quoteAsset}</div>
                        {
                            selected === quoteAsset ? <CheckIcon
                                color={colors.primary[1]}
                            /> : null
                        }
                    </Button>
                    <Button
                        className={clsx("outline-none flex items-center justify-between gap-4", selected === baseAsset ? 'text-primary-1' : "text-grey-1")}
                        onClick={() => changeAsset(baseAsset)}>
                        <div>{baseAsset}</div>
                        {
                            selected === baseAsset ? <CheckIcon
                                color={colors.primary[1]}
                            /> : null
                        }
                    </Button>
                </section >
            }
        >
            <div className="flex items-center text-caption-12B">
                <span className='mr-1 min-w-[30px] text-right'>{selected}</span>
                <ChevronBottomTriangleIcon
                    className={clsx('duration-200 ease-linear transition-all', toggle ? 'rotate-180' : 'rotate-0')}
                    color={toggle ? colors.primary[1] : colors.grey[1]}
                />
            </div>
        </Popup >

    );
});

const CoverAmountInput = forwardRef<
    HTMLInputElement, IClaimPriceInputProps
>(({ ...props }, forwardRef) => {
    const { t } = useTranslationClient('buy-cover');

    const renderPrefix = useCallback(() => {
        return (
            <TooltipWrapper className="text-body-14B" placement="top" content={t('cover_amount')}>
                <Button className="border-b border-dashed border-grey-1">{t('cover_amount')}</Button>
            </TooltipWrapper>
        );
    }, []);

    return (
        <InputNumber ref={forwardRef} prefix={renderPrefix()} suffix={<Suffix />} {...props} />
    );
});

export default CoverAmountInput;