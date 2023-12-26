'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm, useFormState, useWatch } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '../../ui/button';
import { Form } from '../../ui/form';
import CoverAmountInput from './CoverAmountInput';

import { MODE } from '@/utils/constant';

import DocumentationIcon from '@/components/common/Icons/DocumentationIcon';
import ShieldIcon from '@/components/common/Icons/ShieldIcon';
import TooltipWrapper from '@/components/common/Tooltip';
import { useTranslationClient } from '@/i18n/client';
import { formatNumber } from '@/utils/format';
import Image from 'next/image';
import ClaimPriceInput from './ClaimPriceInput';
import MarginInput from './MarginInput';
import ModeInput from './ModeInput';
import PeriodInput from './PeriodInput';
import { useEffect } from 'react';
import useBuyCoverStore from '@/stores/buy-cover.store';
import { calculateInsuranceParams } from './utils';
import useTicker from '@/hooks/useTicker';
import { PairDetail } from '@/@type/pair.type';
import { PERIOD_UNIT } from 'hakifi-formula';

const formSchema = z.object({
  mode: z.string(),
  q_covered: z.number().min(0),
  p_claim: z.number().min(0),
  margin: z.number().min(0),
  period: z.number().min(1),
});

type PlaceOrderProps = {
  symbol: string;
  pair: PairDetail;
};

const Watcher = ({ symbol, pair }: PlaceOrderProps) => {
  const values = useWatch();
  const margin = Number(values.margin);
  const q_covered = Number(values.q_covered);
  const p_claim = Number(values.p_claim);
  const period = Number(values.period);
  const ticker = useTicker(symbol);
  const p_open = ticker?.lastPrice;
  console.log('p_open', p_open);
  const [updateParams] = useBuyCoverStore((state) => [state.updateParams]);
  useEffect(() => {
    if (!p_open || !p_claim) return;
    let periodChangeRatio: number;
    const periodUnit: PERIOD_UNIT = PERIOD_UNIT.DAY;
    switch (periodUnit) {
      case PERIOD_UNIT.DAY:
        periodChangeRatio = pair.config.listDayChangeRatio[period - 1];
        break;

      // TODO:
      //   case PERIOD_UNIT.HOUR:
      //     // TODO:
      //     // periodChangeRatio = pair.config.listHourChangeRatio[period - 1];
      //     periodChangeRatio = pair.config.listDayChangeRatio[0];
      //     break;
      default:
        return;
    }
    // const periodChangeRatio

    const { q_claim, expiredAt, hedge, p_cancel, p_liquidation, p_refund } =
      calculateInsuranceParams({
        margin,
        p_claim,
        p_open,
        period,
        periodChangeRatio,
        periodUnit,
        q_covered,
      });

    updateParams({
      margin,
      q_covered,
      p_claim,
      period,
      hedge,
      p_cancel,
      p_liquidation,
      p_refund,
      periodUnit,
      q_claim,
      p_open,
      expiredAt,
    });
  }, [margin, q_covered, p_claim, period, p_open]);

  return null;
};

function PlaceOrder({ symbol, pair }: PlaceOrderProps) {
  const { t } = useTranslationClient('buy-cover');
  const [p_claim, q_covered, margin, period] = useBuyCoverStore((state) => [
    state.p_claim,
    state.q_covered,
    state.margin,
    state.period,
  ]);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    defaultValues: {
      mode: MODE.BULL,
      q_covered,
      p_claim,
      margin,
      period,
    },
  });

  const { control } = form;

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <>
      <section className="p-4 pb-0">
        <Form {...form}>
          <Watcher symbol={symbol} pair={pair} />
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Controller
              name="mode"
              control={control}
              render={({ field }) => <ModeInput {...field} />}
            />
            <section className="mt-4">
              <Controller
                name="q_covered"
                control={control}
                render={({ field }) => <CoverAmountInput {...field} />}
              />
            </section>
            <section className="mt-4">
              <Controller
                name="p_claim"
                control={control}
                render={({ field }) => <ClaimPriceInput {...field} />}
              />
            </section>
            <section className="mt-4">
              <Controller
                name="margin"
                control={control}
                render={({ field }) => <MarginInput {...field} />}
              />
            </section>
            <section className="mt-4">
              <Controller
                name="period"
                control={control}
                render={({ field }) => <PeriodInput {...field} />}
              />
            </section>
            <section className="mt-4">
              <div className="text-body-14B flex items-center justify-between">
                <div className="text-grey-1">Available</div>
                <div className="text-primary-3">
                  {formatNumber(1000000)} USDT
                </div>
              </div>
              <div className="text-body-14B mt-2 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <div className=" text-grey-1">Your claim</div>
                  <div className="box-radius text-xsmall-10B bg-green-default p-1 text-white">
                    +223%
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="text-primary-1">
                    {formatNumber(5592)} USDT
                  </div>
                  <Image
                    width={24}
                    height={24}
                    src="/assets/images/claim_logo.png"
                    alt="claim logo"
                  />
                </div>
              </div>
            </section>
            <Button
              type="submit"
              className="text-button-16B mt-6 w-full justify-center rounded-full bg-green-default py-3 text-white">
              {t('buy_cover')}
            </Button>
          </form>
        </Form>
      </section>
      <section className="!mt-8 flex items-center justify-start">
        <Image
          width={204}
          height={140}
          src="/assets/images/buy_cover_logo.png"
          alt="buy cover logo"
        />
      </section>
      <section className="border-t border-light-1 p-4 pb-5">
        <div className="flex items-center gap-3">
          <ShieldIcon />
          <div className="flex items-center gap-1">
            <TooltipWrapper
              className="text-body-14B"
              placement="top"
              content={t('saving')}>
              <Button className="border-b border-dashed border-grey-1">
                {t('saving')}:
              </Button>
            </TooltipWrapper>
            <div className="text-body-14B text-primary-1">
              {t('saved')} {formatNumber(3813)} USDT
            </div>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-3">
          <DocumentationIcon />
          <TooltipWrapper
            className="text-body-14B"
            placement="top"
            content={t('insurance_information')}>
            <Button className="border-b border-dashed border-grey-1">
              {t('insurance_information')}
            </Button>
          </TooltipWrapper>
        </div>
      </section>
    </>
  );
}

export default PlaceOrder;
