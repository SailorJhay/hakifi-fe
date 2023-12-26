import ChevronBottomTriangleIcon from '@/components/common/Icons/ChevronBottomTriangleIcon';
import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import { useParams } from 'next/navigation';
import React, { useMemo } from 'react';

interface IButtonChangePairProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    afterIcon?: React.ReactNode;
    toggle?: boolean;
}

const ButtonChangePair = React.forwardRef<HTMLButtonElement, IButtonChangePairProps>(({
    className,
    toggle,
    ...rest
}, forwardedRef) => {
    const { symbol } = useParams();

    const pair = useMemo(() => {
        return `${symbol.toString().split('USDT')[0]}/USDT`;
    }, [symbol]);

    return (
        <Button
            className={
                clsx('flex flex-col items-start', className)
            }
            ref={forwardedRef}
            {...rest}
        >
            <section className="flex items-center">
                <div className="text-sub-heading-desktop text-primary-3">
                    {symbol}
                </div>
                <ChevronBottomTriangleIcon />
            </section>
            <div className="text-caption-12B text-grey-1">DeFi Insurance</div>
        </Button>
    );
});

export default ButtonChangePair;
