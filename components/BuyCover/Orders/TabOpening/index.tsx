import { getInsuranceApi } from '@/apis/order.api';
import DataTable from '@/components/common/DataTable';
import DatePicker from '@/components/common/DatePicker';
import CalendarIcon from '@/components/common/Icons/BarsIcons';
import CancelIcon from '@/components/common/Icons/CancelIcon';
import SearchIcon from '@/components/common/Icons/SearchIcon';
import CommonInput from '@/components/common/Input';
import { Button } from '@/components/ui/button';
import { OrderInsurance } from '@/models/order.model';
import { MODE } from '@/utils/constant';
import { ColumnDef } from '@tanstack/react-table';
import clsx from 'clsx';
import { differenceInCalendarDays, format } from 'date-fns';
import Countdown from 'react-countdown';

import React, { useCallback, useMemo, useState } from 'react';
import { CountdownWrapper } from './utils';
import { formatNumber } from '@/utils/format';
import TickerField from '@/components/common/TickerWrapper';
import { useTranslationClient } from '@/i18n/client';
import useWalletStore from '@/stores/wallet.store';
import { useAccount } from 'wagmi';
import dayjs from 'dayjs';

interface ITabOpeningProps {
  data: OrderInsurance[];
}

const TabOpening = ({ data }: ITabOpeningProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { t } = useTranslationClient('buy-cover');

  const onCompleted = () => {
    console.log('Completed');
  };

  const renderPeriod = useCallback(
    (expired: Date, isCooldown = false) =>
      isCooldown ? (
        <div className="text-red">
          <CountdownWrapper date={expired} onEnded={onCompleted} />
        </div>
      ) : (
        `${dayjs(expired, 'dd.MM.yyyy')} - ${dayjs(expired, 'dd.MM.yyyy')}`
      ),
    [],
  );

  const isLogging = useWalletStore((state) => state.isLogging);
  const { address } = useAccount();

  const columns: ColumnDef<OrderInsurance>[] = useMemo(
    () => [
      {
        accessorKey: 'asset',
        header: t('Pair'),
        cell: ({ row }) => {
          return (
            <div className="text-body-14B">{row.getValue('asset')} / USDT</div>
          );
        },
        meta: {
          width: 146,
        },
      },
      {
        accessorKey: 'side',
        header: t('Contract'),
        meta: {
          width: 94,
        },
        cell: ({ row }) => {
          const side = row.getValue('side');
          return (
            <div
              className={clsx(
                'text-body-14B',
                side === MODE.BULL ? 'text-green-default' : 'text-red-default',
              )}>
              {side as string}
            </div>
          );
        },
      },
      {
        accessorKey: 'expiredAt',
        header: t('expired_at'),
        meta: {
          width: 145,
        },
        cell: ({ row }) => {
          const result = differenceInCalendarDays(
            new Date(row.getValue('expiredAt')),
            new Date(2011, 6, 2, 23, 59),
          );
          return renderPeriod(new Date(row.getValue('expiredAt')), true);
        },
      },
      {
        accessorKey: 'p_open',
        header: 'P-Open',
        meta: {
          width: 93,
        },
        cell: ({ row }) => formatNumber(row.getValue('p_open')),
      },
      {
        accessorKey: 'p_claim',
        header: 'P-Claim',
        meta: {
          width: 107,
        },
        cell: ({ row }) => formatNumber(row.getValue('p_claim')),
      },
      {
        accessorKey: 'p_market',
        header: 'P-Market',
        meta: {
          width: 115,
        },
        cell: ({ row }) => (
          <TickerField
            jump
            symbol={`${row.getValue('asset')}USDT`}
            decimal={8}
          />
        ),
      },
      {
        accessorKey: 'p_expire',
        header: 'P-Expire',
        meta: {
          width: 136,
        },
        cell: ({ row }) => formatNumber(row.getValue('p_liquidation')),
      },
      {
        accessorKey: 'amount',
        header: 'Amount',
        meta: {
          width: 150,
        },
        cell: () => <div>100,000</div>,
      },
      {
        accessorKey: 'action',
        header: '',
        cell: ({ row }) => {
          return (
            <Button variant={'primary'} className="rounded-full px-4 py-1">
              Close
            </Button>
          );
        },
        meta: {
          fixed: 'left',
          width: 97,
        },
      },
    ],
    [isLogging, address],
  );

  const [searchTX, setSetsearchTX] = useState('');
  const onChangeSearchTX = (e: React.FormEvent<HTMLInputElement>) => {
    setSetsearchTX(e.currentTarget.value);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="text-sub-heading-desktop text-primary-3">
          Hợp đồng đã mở
        </div>
        <div className="flex items-center">
          <section
            className={clsx(
              'mr-4 flex w-[170px] items-center justify-between rounded-full bg-light-2 px-3 py-2',
            )}>
            <span className="text-caption-12B">
              {date ? format(date, 'LLL do yyyy') : 'Open time'}
            </span>
            <div className="flex items-center gap-1">
              {date && (
                <Button onChange={() => setDate(undefined)}>
                  <CancelIcon width={16} height={16} />
                </Button>
              )}
              <DatePicker date={date} onChange={setDate} labelClassName="">
                <Button>
                  <CalendarIcon />
                </Button>
              </DatePicker>
            </div>
          </section>
          <section
            className={clsx(
              'mr-4 flex w-[170px] items-center justify-between rounded-full bg-light-2 px-3 py-2',
            )}>
            <span className="text-caption-12B">
              {date ? format(date, 'LLL do yyyy') : 'Expire time'}
            </span>
            <div className="flex items-center gap-1">
              {date && (
                <Button onChange={() => setDate(undefined)}>
                  <CancelIcon width={16} height={16} />
                </Button>
              )}
              <DatePicker date={date} onChange={setDate} labelClassName="">
                <Button>
                  <CalendarIcon />
                </Button>
              </DatePicker>
            </div>
          </section>

          <CommonInput
            classNameInput="max-w-[170px] text-caption-12B bg-light-2 !rounded-full items-center placeholder:text-caption-12B placeholder:text-grey-1"
            value={searchTX}
            onChange={onChangeSearchTX}
            suffixClassName="!border-none !py-0"
            placeholder="Search by TXH"
            suffix={<SearchIcon />}
          />
        </div>
      </div>
      <section className="mt-4">
        <DataTable columns={columns} data={data} />
      </section>
    </>
  );
};

export default TabOpening;
