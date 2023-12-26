import React, { memo } from 'react';
import Slider, { SliderProps } from 'rc-slider';
import 'rc-slider/assets/index.css';
import styled from 'styled-components';
import colors from '@/colors';
import { formatNumber } from '@/utils/format';
import useWindowSize from '@/hooks/useWindowSize';

type SliderRangerProps = {
    sliderProps?: { [key: string]: string; };
    color?: string;
    colorActive?: string;
    trackStyle?: any;
    isDisableMark?: boolean;
    value: number;
    onChange: (value: number) => void;
    railStyle?: React.CSSProperties;
    dotStyle?: React.CSSProperties | ((dotValue: number) => React.CSSProperties);
    className?: string;
    activeDotStyle?: React.CSSProperties;
    positionLabel?: 'top' | 'bottom';
    marks: any;
    tooltip?: boolean;
    min?: number;
    max?: number;
};

const DEFAULT_COLOR_ACTIVE = colors.primary[1];
const DEFAULT_COLOR = colors.light[1];

const SliderWrapper = styled(Slider) <{
    color?: string;
    colorActive?: string;
    isDisableMark?: boolean;
    positionLabel?: string;
    value: number;
    tooltip?: boolean;
    isMobile: boolean;
}>`
    height: ${({ isMobile }) => (isMobile ? '32px' : '40px')} !important;
    ${({ positionLabel }) => (positionLabel === 'top' ? { display: 'flex', alignItems: 'end' } : {})}
    .rc-slider-track {
        background-color: ${({ colorActive }) => colorActive} !important;
        height: 4px;
    }
    .rc-slider-handle {
        background: ${({ colorActive }) => colorActive} !important;
        border-color: ${({ colorActive }) => colorActive} !important;
        opacity: 1;
        cursor: pointer !important;
        bottom: ${({ positionLabel }) => (positionLabel === 'top' ? '1px' : '')};
    }
    .rc-slider-rail {
        background-color: ${({ color }) => color};
        height: 4px;
    }
    .rc-slider-dot {
        bottom: ${({ positionLabel }) => (positionLabel === 'top' ? '-4px' : '-1px')};
        border: ${({ color }) => `1px solid ${color}`};
        background-color: ${colors.light[1]};
        width: 4px;
        height: 12px;
        border-radius: 10px;
        cursor: pointer;
    }
    .rc-slider-dot-active {
        background: ${({ colorActive }) => colorActive} !important;
        border: ${`1px solid ${colors.primary[1]}`};
    }
    .rc-slider-handle-dragging.rc-slider-handle-dragging.rc-slider-handle-dragging {
        border-color: none !important;
        box-shadow: none !important;
        z-index: 99;
        ::before {
            display: ${({ tooltip }) => (tooltip ? 'block' : 'none')};
            content: '${({ value }) => formatNumber(value, 0)}';
            position: absolute;
            top: -29px;
            left: 50%;
            transform: translateX(-50%);
            font-size: ${({ isMobile }) => (isMobile ? '10px' : '12px')};
            font-weight: 600;
            background-color: #fff;
            border-radius: 50%;
            padding: 0 6px;
        }
    }
    .rc-slider-mark-text {
        color: ${() => colors.grey[1]} !important;
        font-size: ${({ isMobile }) => (isMobile ? '10px' : '12px')};
    }
    .rc-slider-mark-text-active {
        color: ${() => colors.primary[1]} !important;
        font-weight: 600;
    }
    .rc-slider-mark {
        display: ${({ isDisableMark }) => (isDisableMark ? 'none' : 'inline')} !important;
        top: ${({ positionLabel, isMobile }) => (positionLabel === 'top' ? (isMobile ? '-4px' : '4px') : '18px')};
    }
`;

const SliderRanger = ({
    sliderProps,
    color = DEFAULT_COLOR,
    colorActive = DEFAULT_COLOR_ACTIVE,
    isDisableMark = false,
    value,
    positionLabel = 'top',
    onChange,
    ...props
}: SliderRangerProps) => {
    const { width } = useWindowSize();
    return (
        <div className="px-1">
            <SliderWrapper
                isMobile={width ? width <= 820 : false}
                value={value}
                onChange={(value: number | any) => onChange(value)}
                isDisableMark={isDisableMark}
                positionLabel={positionLabel}
                color={color}
                colorActive={colorActive}
                {...sliderProps}
                {...props}
            />
        </div>
    );
};


export default memo(SliderRanger);
