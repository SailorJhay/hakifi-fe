'use client';

import { getInsuranceApi } from '@/apis/order.api';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslationClient } from '@/i18n/client';
import { OrderInsurance } from '@/models/order.model';
import useWalletStore from '@/stores/wallet.store';
import { ORDER_LIST_MODE } from '@/utils/constant';
import { handleRequest } from '@/utils/helpers';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import TabOpening from './TabOpening';
import { useAccount } from 'wagmi';

function Orders() {
  const { t } = useTranslationClient('buy-cover');
  const isLogging = useWalletStore((state) => state.isLogging);
  const { address } = useAccount();
  const [currentTab, setCurrentTab] = useState(ORDER_LIST_MODE.OPENING);
  const handleChangeTab = (tab: string) => {
    setCurrentTab(tab);
  };

  const [orders, setOrders] = useState<OrderInsurance[]>([]);

  const getDataOrder = async (
    page: number = 1,
    searchKey: string = '',
    state: string = '',
  ) => {
    const [err, response] = await handleRequest<{
      rows: OrderInsurance[];
      total: number;
    }>(
      getInsuranceApi({
        page,
        q: searchKey,
        state,
      }),
    );
    if (err) {
      console.log(err);
      return;
    }
    if (response) {
      const { rows } = response;
      setOrders(rows as OrderInsurance[]);
    }
  };

  useEffect(() => {
    getDataOrder();
  }, [address, isLogging]);

  return (
    <section className="box-radius mt-5 bg-white">
      <section
        className={clsx(
          'flex items-center justify-between border-b border-light-1 px-4 py-5',
        )}>
        <Tabs
          defaultValue={ORDER_LIST_MODE.OPENING}
          className="w-full max-w-[280px] rounded-full"
          onValueChange={handleChangeTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value={ORDER_LIST_MODE.OPENING}
              className={clsx(
                'text-button-16B rounded-full px-4 data-[state=active]:bg-primary-1 data-[state=active]:text-white',
              )}>
              {t('order_opening')}
            </TabsTrigger>
            <TabsTrigger
              value={ORDER_LIST_MODE.HISTORY}
              className={clsx(
                'text-button-16B rounded-full px-4 data-[state=active]:bg-primary-1 data-[state=active]:text-white',
              )}>
              {t('order_history')}
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <label
            htmlFor="terms"
            className="text-caption-12B whitespace-nowrap text-grey-1">
            Hide other symbol
          </label>
        </div>
      </section>

      <section className="p-4">
        {currentTab === ORDER_LIST_MODE.OPENING ? (
          <TabOpening data={orders} />
        ) : (
          <div>123</div>
        )}
      </section>
    </section>
  );
}

export default Orders;
