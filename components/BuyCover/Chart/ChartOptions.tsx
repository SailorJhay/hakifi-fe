import { listTimeFrame } from '@/components/TVChartContainer/constantsTrading';
import FullScreenIcon from '@/components/common/Icons/FullScreenIcon';
import IndicatorIcon from '@/components/common/Icons/IndicatorIcon';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useForceUpdate } from '@/hooks/useForceUpdate';
import { useTranslationClient } from '@/i18n/client';
import clsx from 'clsx';
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useMemo, useState } from 'react';

interface IChartOptionsProps {
    mode: string;
    setMode: (e: string) => void;
    fullScreen: boolean;
    setFullScreen: (e: boolean) => void;
    onShowIndicator: () => void;
    isMobile: boolean;
    isDetail: boolean;
}

const charts = [
    // { vi: 'Gốc', en: 'Original', id: 'original' },
    { vi: 'Trading view', en: 'Trading view', id: 'trading' },
];

interface Resolution {
    label: string;
    resolution: string,
}

const ChartOptions = ({ mode, setMode, fullScreen, setFullScreen, onShowIndicator, isMobile, isDetail }: IChartOptionsProps) => {
    const {
        i18n: { language },
    } = useTranslationClient();

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const resolution = useMemo(() => {
        return searchParams.get('timeframe') || '1D';
    }, [searchParams]);
    const updateSearchParam = (searchParams: ReadonlyURLSearchParams, param: string, value: string) => {
        const currentSearchParams = new URLSearchParams(Array.from(searchParams.entries()));
        currentSearchParams.set(param, value);

        return currentSearchParams;
    };
    const onChangeTimeFrame = (value: string) => {
        const updatedSearchParams = updateSearchParam(searchParams, "timeframe", value);
        router.push(`${pathname}?${updatedSearchParams}`);
    };

    return (
        <div
            className={clsx('p-4 flex items-center justify-between border-b border-light-1', {
                'px-6': isDetail && isMobile,
            })}
        >
            <div className="flex items-center md:min-w-[270px]">
                <Tabs className="w-full">
                    <TabsList defaultValue={resolution} className="grid w-full grid-cols-7">
                        {listTimeFrame.map((t: Resolution) => <TabsTrigger
                            key={t.resolution}
                            value={t.resolution}
                            onClick={() => onChangeTimeFrame(t.resolution)}
                            className={clsx('text-caption-12B rounded-full uppercase hover:bg-primary-1 hover:text-white h-full px-3', t.resolution === resolution && ' bg-primary-1 text-white')}>
                            {t.label}
                        </TabsTrigger>
                        )}
                    </TabsList>
                </Tabs>

            </div>
            <div className="flex items-center space-x-3">
                {!isDetail &&
                    charts.map((chart: any) => (
                        <div
                            key={chart.id}
                            onClick={() => setMode(chart.id)}
                            className={clsx('rounded-full text-xs sm:text-sm cursor-pointer ', {
                                'font-semibold text-red': mode === chart.id,
                                '!p-0': isMobile,
                                '!text-xs': isDetail,
                            })}
                        >
                            {chart[language]}
                        </div>
                    ))}
                {!isMobile && (
                    <>
                        {!isDetail && (
                            <div className="cursor-pointer" onClick={() => setFullScreen(!fullScreen)}>
                                <FullScreenIcon />
                            </div>
                        )}
                        <div className="cursor-pointer" onClick={onShowIndicator}>
                            <IndicatorIcon />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ChartOptions;
