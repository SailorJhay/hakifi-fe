import colors from '@/colors';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useTradingView } from '@/hooks/useTradingView';
import { useTranslationClient } from '@/i18n/client';
import {
  ChartingLibraryWidgetOptions,
  IBasicDataFeed,
  LanguageCode,
  ResolutionString,
} from '@/public/assets/tradingview/charting_library';
import useChartStore from '@/stores/chart.store';
import { TRADING_VIEW_DEFAULTS } from '@/utils/constant';
import { TradingAPI } from 'nami-trading-price-service';
import { useSearchParams } from 'next/navigation';
import { useMemo, useRef } from 'react';

const applyOverrides = {
  'mainSeriesProperties.areaStyle.linecolor': colors.red.default,
  'mainSeriesProperties.areaStyle.linewidth': 1,
  'mainSeriesProperties.areaStyle.color1': 'rgba(235, 43, 62, 0.15)',
  'mainSeriesProperties.areaStyle.color2': 'rgba(235, 43, 62, 0)',

  'mainSeriesProperties.candleStyle.borderUpColor': colors.green.default,
  'mainSeriesProperties.candleStyle.borderDownColor': colors.red.default,
  'mainSeriesProperties.candleStyle.wickUpColor': colors.green.default,
  'mainSeriesProperties.candleStyle.wickDownColor': colors.red.default,
  'mainSeriesProperties.candleStyle.upColor': colors.green.default,
  'mainSeriesProperties.candleStyle.downColor': colors.red.default,

  'mainSeriesProperties.hollowCandleStyle.borderColor': colors.green.default,
  'mainSeriesProperties.hollowCandleStyle.borderDownColor': colors.red.default,
};

export const useChart = (symbol: string) => {
  const container_id = TRADING_VIEW_DEFAULTS.CONTAINER_ID_SPOT;
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    i18n: { language },
  } = useTranslationClient();
  const searchParams = useSearchParams();

  const chartCofig = useChartStore((state) => state.chartConfig);

  const isTablet = useMediaQuery(TRADING_VIEW_DEFAULTS.PRESET_WIDTH);

  const studyOverrides = {
    // volume bars up to down
    'volume.volume.color.0': colors.red.default,
    'volume.volume.color.1': colors.green.default,
    // 'showLabelsOnPriceScale': false,
    'volume.volume ma.color': colors.red.default,
    'volume.volume ma.linewidth': 1,
    'volume.volume ma.visible': false,
  };

  const timeFrames = [
    { text: '15m', resolution: '15' as ResolutionString },
    { text: '30m', resolution: '30' as ResolutionString },
    { text: '1h', resolution: '60' as ResolutionString },
    { text: '3h', resolution: '120' as ResolutionString },
    {
      text: '1d',
      resolution: 'D' as ResolutionString,
      description: '1 day',
    },
    {
      text: '3d',
      resolution: 'D' as ResolutionString,
      description: '3 days',
    },
    {
      text: '1w',
      resolution: 'W' as ResolutionString,
      description: '1 week',
    },
    {
      text: '1M',
      resolution: 'M' as ResolutionString,
      description: '1 month',
    },
  ];
  const enabled_features: string[] = ['move_logo_to_main_pane'];
  const disabled_features: string[] = [
    // refer: supported list https://github.com/tradingview/charting_library/wiki/Featuresets
    'symbol_info',
    'header_widget_dom_node',
    'header_symbol_search',
    'symbol_search_hot_key',
    'main_series_scale_menu',
    'volume_force_overlay',
    'use_localstorage_for_settings',
    'compare_symbol',
    'display_market_status',
    // 'go_to_date',
    'source_selection_markers',
    'popup_hints',
    'header_widget',
    'timeframes_toolbar',
  ];

  const datafeed = useMemo(() => {
    const tradingAPI = new TradingAPI(chartCofig);
    const datafeed = tradingAPI.getDatafeed() as IBasicDataFeed;

    return datafeed;
  }, [chartCofig, symbol, searchParams]);

  const widgetOptions: ChartingLibraryWidgetOptions = {
    symbol: symbol as string, //
    datafeed,
    library_path: '/assets/tradingview/charting_library/',
    fullscreen: false,
    autosize: true,
    container: containerRef.current ? containerRef.current : '',
    container_id: container_id as string,

    // from defaults
    interval: (searchParams.get('timeframe') || '1D') as ResolutionString,
    charts_storage_api_version: '1.1',
    client_id: 'tradingview.com',
    user_id: 'public_user_id',
    custom_css_url: '/assets/tradingview/custom_chart.css?version=1.1',

    // features
    enabled_features,
    disabled_features,

    locale: (language as LanguageCode) ?? 'en',
    preset: isTablet ? 'mobile' : undefined,

    // overrides
    studies_overrides: studyOverrides,
    overrides: {
      // 'mainSeriesProperties.priceAxisProperties.autoScale': true,
      'paneProperties.background': colors.white,
      // 'paneProperties.vertGridProperties.color': colors.white,
      // 'paneProperties.horzGridProperties.color': 'rgb(220 223 230 / 100%)',
      'scalesProperties.lineColor': colors.light[1],
      'scalesProperties.textColor': colors.grey[2],
      'scalesProperties.fontSize': 10,
      'scalesProperties.fontWeight': 600,
    },
    time_frames: timeFrames,
    loading_screen: { foregroundColor: 'white', backgroundColor: 'white' },
  };

  const depsArr = [ language, isTablet, symbol];

  const { chartReady, widget, chart } = useTradingView({
    widgetOptions: widgetOptions,
    depsArr: depsArr,
    applyOverrides: applyOverrides,
  });

  return {
    container_id,
    containerRef,
    chartReady,
    widget,
    chart,
  };
};
