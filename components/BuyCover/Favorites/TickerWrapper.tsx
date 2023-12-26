import { Skeleton } from '@/components/ui/skeleton';
import usePrevious from '@/hooks/usePrevious';
import { Ticker, useTickerSocket } from '@/hooks/useTickerSocket';
import { TickerFieldType } from '@/models';
import { formatNumber } from '@/utils/format';
import clsx from 'clsx';
import {
  ReactElement,
  ReactNode,
  memo,
  useMemo,
  useState,
} from 'react';
// import Countdown from 'react-countdown';

export const PricePrevious = memo(
  ({
    price,
    decimal = 2,
    suffix,
    className = '',
  }: {
    price: number;
    decimal: number;
    suffix?: ReactNode;
    className?: string;
  }) => {
    const previous = usePrevious(price);
    return (
      <span className={clsx('text-body-14B text-primary-3', className)}>
        {formatNumber(price, decimal)}
        {suffix && suffix}
      </span>
    );
  },
);

const TickerWrapper = memo(
  ({
    symbol,
    decimal = 2,
    className,
    fieldName = 'lastPrice',
    suffix,
    jump = false,
  }: TickerFieldType): ReactElement => {
    const [ticker, setTicker] = useState<Ticker | null>(null);

    useTickerSocket(symbol, setTicker);
    const value: number =
      Number(ticker?.[fieldName as 'lastPrice' | 'highPrice' | 'lowPrice']) ??
      0;

    const priceChangePercent = useMemo(
      () => ticker?.priceChangePercent,
      [ticker],
    );
    const negative = useMemo(
      () => (priceChangePercent || 0) < 0,
      [priceChangePercent],
    );

    const render = () => {
      if (!value) return '-';
      //   if (fieldName === 'fundingTime')
      //     return (
      //       <Countdown
      //         date={value as any}
      //         renderer={({ hours, minutes, seconds }) =>
      //           `${formatZero(hours)}:${formatZero(minutes)}:${formatZero(
      //             seconds,
      //           )}`
      //         }
      //       />
      //     );
      //   if (fieldName === 'fundingRate') return formatNumber(value * 100, 8);
      if (jump) return <PricePrevious price={value} decimal={decimal ?? 2} />;
      return formatNumber(value, decimal);
    };

    if (!value) return <Skeleton className={clsx('h-6 w-10', className)} />;
    return (
      <>
        {render()} {suffix && <span>{suffix}</span>}
        <div
          className={clsx(
            'text-xsmall-10B flex items-end',
            !negative ? 'text-green-default' : 'text-red-default',
            className,
          )}>
          {negative ? '-' : '+'}
          {priceChangePercent
            ? formatNumber(Math.abs(priceChangePercent), 2)
            : '-'}
          %
        </div>
      </>
    );
  },
);

export default TickerWrapper;