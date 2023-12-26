'use client';

import { useChart } from '@/components/TVChartContainer';
import Popup from '@/components/common/Popup';
import { IInformationChart, IPairConfig } from '@/models/order.model';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import ButtonChangePair from './ButtonChangePair';
import ChartOptions from './ChartOptions';
import { InsuranceChartParams, drawing, useDrawing } from './drawing';
import useBuyCoverStore from '@/stores/buy-cover.store';

const h_option = 150;
interface IChartProps {
  symbol: string;
  infoChart: IInformationChart;
  decimals?: { symbol: number; price: number };
  isMobile?: boolean;
  pairConfig?: IPairConfig;
  isDetail?: boolean;
  isHistory?: boolean;
  onFullScreen?: (e: boolean) => void;
  showTimeframe?: boolean;
  className?: string;
  customClassName?: string;
  classContainer?: string;
  toolbar?: boolean;
}

const Chart = ({
  symbol,
  isMobile = false,
  isDetail = false,
  onFullScreen,
  showTimeframe = true,
  className = '',
  classContainer,
  customClassName,
}: IChartProps) => {
  // const { clearLine, drawerInfo } = drawing();
  const [mode, setMode] = useState('trading');
  const [fullScreen, setFullScreen] = useState<boolean>(false);
  const { containerRef, container_id, chartReady, chart, widget } =
    useChart(symbol);
  const container = useRef<HTMLDivElement>(null);
  const [showChart, setShowChart] = useState(true);
  const insuranceChartParams: InsuranceChartParams = useBuyCoverStore(
    (state) => ({
      p_claim: state.p_claim,
      p_cancel: state.p_cancel,
      p_liquidation: state.p_liquidation,
      p_refund: state.p_refund,
      p_open: state.p_open,
      // expiredAt: state.expiredAt,
      // p_close: state.p_close,
    }),
  );

  useDrawing(chart, chartReady, insuranceChartParams);

  const keyDownHandler = (e: any) => {
    if (e.key === 'Escape' && fullScreen) {
      e.preventDefault();
      setFullScreen(false);
    }
  };

  useEffect(() => {
    if (onFullScreen) onFullScreen(fullScreen);
    const el = container.current;
    document.addEventListener('keydown', keyDownHandler);
    if (el && (!isDetail || isMobile)) {
      const h = !isDetail ? 'h-screen' : 'h-[calc(100vh-150px)]';
      el.classList[fullScreen ? 'add' : 'remove'](
        'fixed',
        'bg-white',
        'z-[999]',
        'w-screen',
        'top-1/2',
        'left-1/2',
        '-translate-x-1/2',
        '-translate-y-1/2',
        h,
      );
      document.body.classList[fullScreen ? 'add' : 'remove']('overflow-hidden');
    }
    return () => {
      document.body.classList['remove']('overflow-hidden');
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [fullScreen]);

  const onShowIndicator = () => {
    widget?.activeChart().executeActionById('insertIndicator');
  };

  useEffect(() => {
    document.body
      .querySelector('main')
      ?.classList[fullScreen ? 'add' : 'remove']('!z-50');
    return () => {
      document.body.querySelector('main')?.classList.remove('!z-50');
    };
  }, [fullScreen]);

  return (
    <div
      ref={container}
      data-tour="chart"
      className={clsx(
        ' min-h-[550px] rounded-[20px] bg-white',
        !fullScreen && 'z-1 relative mt-4',
      )}>
      {isMobile && !fullScreen && !isDetail && (
        <div
          className="border-divider flex items-center justify-between border-b px-4 py-3"
          onClick={() => setShowChart(!showChart)}>
          {/* <div className="flex items-center space-x-2">
                        <CandleIcon />
                        <div className="text-sm">
                            {pairConfig?.baseAsset}/{pairConfig?.quoteAsset} {t('common:chart')}
                        </div>
                    </div>
                    <ChevronDown className={!showChart ? '!rotate-0' : ''} size={16} color={colors.primary.DEFAULT} /> */}
        </div>
      )}
      <div
        className={clsx(
          `bg-white transition-all`,
          classContainer,
          !fullScreen && 'pb-4',
          { 'h-0 opacity-0': !showChart, 'mb-10': showChart && isMobile },
        )}>
        <section className="border-b border-light-2 p-4">
          <Popup
            classTrigger="border-r border-light-2 pr-6"
            content={<div>List pair</div>}>
            <ButtonChangePair />
          </Popup>
        </section>
        {showTimeframe && (
          <ChartOptions
            mode={mode}
            setMode={setMode}
            fullScreen={fullScreen}
            setFullScreen={setFullScreen}
            onShowIndicator={onShowIndicator}
            isMobile={isMobile}
            isDetail={isDetail}
          />
        )}
        <div
          style={{
            height: fullScreen
              ? `calc(100dvh - ${
                  h_option +
                  (isMobile ? (isDetail ? 72 : 20) : isDetail ? 125 : 0)
                }px)`
              : isMobile
                ? 420
                : isDetail
                  ? 'calc(100vh - 235px)'
                  : 490,
          }}
          className={clsx('mb:pl-2', className)}>
          <div className="h-full">
            <div
              ref={containerRef as React.RefObject<HTMLDivElement>}
              id={container_id as string}
              className={clsx(customClassName, 'h-full')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;
