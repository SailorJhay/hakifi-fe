import colors from '@/colors';
import { IInformationChart } from '@/models/order.model';
import {
  IChartWidgetApi,
  IOrderLineAdapter,
} from '@/public/assets/tradingview/charting_library';
import { formatNumber } from '@/utils/format';
import { useEffect, useRef } from 'react';

const initLineInfo: { [key: string]: { value: number | Date; line: any } } = {
  p_claim: { value: 0, line: null },
  p_liquidation: { value: 0, line: null },
  p_refund: { value: 0, line: null },
  expiredAt: { value: new Date(), line: null },
  p_open: { value: 0, line: null },
  p_close: { value: 0, line: null },
};

type TDrawlineParams = {
  line: IOrderLineAdapter | null;
  chart: IChartWidgetApi;
  isUpdate: boolean;
  text: string;
  bodyBorderColor: string;
  bodyTextColor: string;
  extendLeft: boolean;
  lineColor: string;
  price: number;
};

export const drawline = ({
  line,
  chart,
  isUpdate,
  text,
  bodyBorderColor,
  bodyTextColor,
  extendLeft,
  lineColor,
  price,
}: TDrawlineParams) => {
  if (isUpdate && line) return line.setText(text).setPrice(price);

  return chart
    .createOrderLine()
    .setText(text)
    .setBodyBorderColor(bodyBorderColor)
    .setBodyTextColor(bodyTextColor)
    .setExtendLeft(extendLeft)
    .setLineStyle(0)
    .setLineColor(lineColor)
    .setLineLength(100)
    .setQuantity('')
    .setPrice(price);
};

export const drawing = () => {
  let lineInfo = { ...initLineInfo };
  const lineP_market = (
    timer: number,
    chart: IChartWidgetApi,
    infoChart: IInformationChart,
  ) => {
    // if (isHistory) return;
    chart.removeEntity(lineInfo['p_open'].line);
    return chart.createMultipointShape(
      [
        { time: new Date().getTime() / 1000, price: Number(infoChart?.p_open) },
        { time: timer, price: Number(infoChart?.p_claim) },
      ],
      {
        shape: 'trend_line',
        lock: true,
        disableSelection: true,
        disableSave: true,
        disableUndo: true,
        overrides: {
          linewidth: 1,
          borderColor: colors.green.default,
          linecolor: 'rgb(82 204 116 / 40%)',
          linestyle: 3,
          // rightEnd: 1,
        },
      },
    );
  };

  const drawerInfo = (infoChart: IInformationChart, chart: IChartWidgetApi) => {
    const _expiredAt = infoChart?.expiredAt || new Date();
    const timer = new Date(_expiredAt).getTime() / 1000;
    try {
      Object.keys(lineInfo).forEach((key: string) => {
        let line = lineInfo[key]?.line;
        let ratio = 0;

        switch (key) {
          case 'p_claim':
            if (infoChart?.p_open) {
              ratio = Math.abs(
                ((Number(infoChart?.p_open) - Number(infoChart?.p_claim)) /
                  Number(infoChart?.p_open)) *
                  100,
              );
              line = drawline({
                line,
                chart,
                isUpdate: lineInfo[key].line,
                text: `P-Claim ${formatNumber(ratio)}%`,
                bodyBorderColor: colors.green.default,
                bodyTextColor: colors.green.default,
                extendLeft: false,
                lineColor: colors.green.default,
                price: infoChart?.p_claim || 0,
              });

              lineInfo['p_open'] = {
                value: infoChart?.p_open,
                line: lineP_market(timer, chart, infoChart),
              };
            }

            break;
          case 'p_liquidation':
            if (infoChart?.p_liquidation) {
              ratio = Math.abs(
                ((Number(infoChart?.p_open) -
                  Number(infoChart?.p_liquidation)) /
                  Number()) *
                  100,
              );
            }

            line = drawline({
              line,
              chart,
              isUpdate: lineInfo[key].line,
              text: `P-Expire ${formatNumber(ratio)}%`,
              bodyBorderColor: colors.red.default,
              bodyTextColor: colors.red.default,
              extendLeft: false,
              lineColor: colors.red.default,
              price: infoChart?.p_liquidation || 0,
            });

            // lineInfo[key].line?.remove()
            break;
          // case 'p_close':
          //     if (!infoChart?.p_close) return;
          //     lineInfo[key].line?.remove();
          //     line = widget
          //         ?.activeChart()
          //         .createPositionLine()
          //         .setText('P-Close')
          //         .setBodyBorderColor(colors.primary.DEFAULT)
          //         .setBodyTextColor(colors.primary.DEFAULT)
          //         // .setExtendLeft(false)
          //         .setLineStyle(0)
          //         .setLineColor(colors.primary.DEFAULT)
          //         .setLineLength(100)
          //         .setQuantity('')
          //         .setPrice(infoChart?.p_close || 0);
          //     break;
          // case 'p_refund':
          //     if (infoChart?.p_open) ratio = Math.abs(((infoChart?.p_open - infoChart?.p_refund) / infoChart?.p_open) * 100);
          //     console.log(lineInfo[key]);
          //     if (lineInfo[key].line) {
          //         lineInfo[key].line.setText(`P-Refund ${formatNumber(ratio)}%`).setPrice(infoChart?.p_refund || 0);
          //     } else {
          //         line = widget
          //             ?.chart()
          //             .createPositionLine()
          //             .setText(`P-Refund ${formatNumber(ratio)}%`)
          //             .setBodyBorderColor(colors.red.DEFAULT)
          //             .setBodyTextColor(colors.red.DEFAULT)
          //             // .setExtendLeft(false)
          //             .setLineStyle(0)
          //             .setLineColor(colors.red.DEFAULT)
          //             .setLineLength(100)
          //             .setQuantity('')
          //             .setPrice(infoChart?.p_refund || 0);
          //     }
          //     // lineInfo[key].line?.remove()
          //     break;
          // case 'expiredAt':
          // if (lineInfo[key].value === (infoChart as any)[key]) return;
          // if (lineInfo[key].line) {
          //     const shape = widget.activeChart().getShapeById(lineInfo[key].line);
          //     shape?.setPoints([
          //         {
          //             time: timer,
          //             channel: 'close',
          //         },
          //     ]);
          //     shape?.setProperties({
          //         text: `T-Expire ${formatTime(_expiredAt, 'dd.MM')}`,
          //     });
          //     // refChart.current?.widget?.activeChart()?.removeEntity(lineInfo[key].line)
          // } else {
          //     line = widget.activeChart().createShape(
          //         { time: timer, channel: 'close' },
          //         {
          //             shape: 'vertical_line',
          //             disableSelection: true,
          //             disableSave: true,
          //             disableUndo: true,
          //             text: `T-Expire ${formatTime(_expiredAt, 'dd.MM')}`,
          //             overrides: {
          //                 linewidth: 1,
          //                 showLabel: true,
          //                 showDistance: true,
          //                 fontsize: 10,
          //                 linecolor: 'rgb(34 49 63 / 20%)',
          //                 textcolor: colors.primary.DEFAULT,
          //                 transparency: 20,
          //                 showTime: false,
          //                 bold: true,
          //                 textOrientation: 'horizontal',
          //             },
          //         },
          //     );
          // }
          // lineInfo['p_open'] = { value: infoChart?.p_open, line: lineP_market(timer) };
          // break;
          // case 'p_open':
          //    console.log(infoChart?.p_open)
          //     break
          default:
            break;
        }

        lineInfo[key] = { value: infoChart[key] || 0, line };
      });
    } catch (error) {
      console.log(error);
    }
  };

  const clearLine = (infoChart: IInformationChart, chart: IChartWidgetApi) => {
    if (!chart) return;
    Object.keys(lineInfo).forEach((key: string) => {
      if (lineInfo[key].line) {
        lineInfo[key]?.line.remove
          ? lineInfo[key].line.remove()
          : chart.removeEntity(lineInfo[key].line);
      }
    });

    // reset info line
    lineInfo = { ...initLineInfo };
  };

  return { drawerInfo, clearLine };
};

export type InsuranceChartParams = {
  p_claim?: number;
  p_liquidation?: number;
  p_refund?: number;
  expiredAt?: Date;
  p_open?: number;
  p_close?: number;
};

export const useDrawing = (
  chart: IChartWidgetApi | null,
  chartReady: boolean,
  params: InsuranceChartParams,
) => {
  const linesRef = useRef<
    Record<keyof InsuranceChartParams, IOrderLineAdapter | null>
  >({
    expiredAt: null,
    p_claim: null,
    p_close: null,
    p_liquidation: null,
    p_open: null,
    p_refund: null,
  });

  const _renderTextRatio = (text: string, ratio?: number) => {
    if (!ratio) return text;
    return `${text} ${formatNumber(ratio)}%`;
  };

  const drawParams = (params: InsuranceChartParams) => {
    const lines = linesRef.current;
    if (!chart) return;

    if (params.p_claim) {
      let ratio: number | undefined;
      console.log(params.p_claim, params.p_open);
      if (params.p_open) {
        ratio = Math.abs(
          ((params.p_open - params.p_claim) / params.p_open) * 100,
        );
      }
      const text = _renderTextRatio('P-Claim', ratio);
      lines.p_claim = drawline({
        line: lines.p_claim,
        chart,
        isUpdate: !!lines.p_claim,
        text,
        bodyBorderColor: colors.green.default,
        bodyTextColor: colors.green.default,
        extendLeft: false,
        lineColor: colors.green.default,
        price: params.p_claim,
      });
    }
    if (params.p_liquidation) {
      let ratio: number | undefined;
      if (params.p_open) {
        ratio = Math.abs(
          ((params.p_open - params.p_liquidation) / params.p_open) * 100,
        );
      }
      const text = _renderTextRatio('P-Expire', ratio);
      lines.p_liquidation = drawline({
        line: lines.p_liquidation,
        chart,
        isUpdate: !!lines.p_liquidation,
        text,
        bodyBorderColor: colors.red.default,
        bodyTextColor: colors.red.default,
        extendLeft: false,
        lineColor: colors.red.default,
        price: params.p_liquidation,
      });
    }

    //TODO: add p_refund, p_close, expiredAt
  };

  useEffect(() => {
    if (!chartReady || !chart) return;
    drawParams(params);
  }, [chart, chartReady, params.p_claim, params.p_open, params.p_liquidation]);
};
