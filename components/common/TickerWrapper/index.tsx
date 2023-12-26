import { Skeleton } from '@/components/ui/skeleton';
import usePrevious from '@/hooks/usePrevious';
import useTicker from '@/hooks/useTicker';
import { TickerFieldType } from '@/models';
import { formatNumber } from '@/utils/format';
import clsx from 'clsx';
import { ReactElement, ReactNode, memo } from 'react';
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

const TickerField = memo(
  ({
    symbol,
    decimal,
    className,
    fieldName = 'lastPrice',
    jump = false,
    suffix,
  }: TickerFieldType): ReactElement => {
    const ticker = useTicker(symbol);
    const value: number =
      Number(ticker?.[fieldName as 'lastPrice' | 'highPrice' | 'lowPrice']) ??
      0;

    const formatZero = (value: number) => {
      return value.toString().padStart(2, '0');
    };

    const render = () => {
      // if (!value) return '-';
      // if (fieldName === 'fundingTime')
      //   return (
      //     <Countdown
      //       date={value as any}
      //       renderer={({ hours, minutes, seconds }) =>
      //         `${formatZero(hours)}:${formatZero(minutes)}:${formatZero(
      //           seconds,
      //         )}`
      //       }
      //     />
      //   );
      // if (fieldName === 'fundingRate') return formatNumber(value * 100, 8);
      if (jump) return <PricePrevious price={value} decimal={decimal ?? 2} />;
      return formatNumber(value, decimal);
    };

    if (!value) return <Skeleton className={clsx('h-6 w-10', className)} />;
    return (
      <>
        {render()} {suffix && <span>{suffix}</span>}
      </>
    );
  },
);

export default TickerField;
