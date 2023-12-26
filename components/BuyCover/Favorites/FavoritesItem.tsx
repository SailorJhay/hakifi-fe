'use client';

import { getPairConfigApi } from '@/apis/order.api';
import { Skeleton } from '@/components/ui/skeleton';
import { IPairConfig } from '@/models/order.model';
import { handleRequest } from '@/utils/helpers';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import TickerWrapper from './TickerWrapper';

interface IFavoriteItem {
  asset: string;
  isFirst: boolean;
}
const FavoriteItem = ({ asset, isFirst }: IFavoriteItem) => {
  const symbol = useMemo(() => `${asset}USDT`, [asset]);
  const [itemConfig, setItemConfig] = useState<IPairConfig>();

  const getPairConfig = useCallback(
    async (symbol: string) => {
      const [err, response] = await handleRequest<IPairConfig>(
        getPairConfigApi(symbol),
      );

      if (err) {
        console.log(err);
        return;
      }

      setItemConfig(response);
    },
    [asset],
  );

  useEffect(() => {
    getPairConfig(symbol);
  }, [asset]);

  return (
    <Link href={`/buy-cover/${symbol}`}>
      <div
        className={clsx(
          'box-border flex min-w-[170px] items-center gap-2 border-r border-light-1 pl-4',
          isFirst && 'border-l border-light-1 pl-4',
        )}>
        {!itemConfig ? (
          <>
            <Skeleton className="h-6 w-6 rounded-full" />
            <div>
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-6  w-24" />
            </div>
          </>
        ) : (
          <>
            <Image
              src={itemConfig.token.attachment}
              width={24}
              height={24}
              alt="coin logo"
            />
            <div>
              <div className="text-xsmall-10B">
                <span className="text-primary-3">{itemConfig.asset}</span> /
                USDT
              </div>
              <div className="flex items-end gap-1">
                <TickerWrapper
                  jump
                  symbol={itemConfig.symbol}
                  decimal={itemConfig.token.decimals}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
};

export default memo(FavoriteItem);
