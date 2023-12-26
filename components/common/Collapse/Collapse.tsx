/* eslint-disable no-undef */
import colors from "@/colors";
import clsx from "clsx";
import React, {
  ReactNode,
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import styled from "styled-components";
import ChevronDown from "../Icons/ChevronDown";

interface ICollapse {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  labelClassName?: string;
  label: any;
  colorIcon?: string;
  disabled?: boolean;
  onClick?: () => void;
  suffix?: JSX.Element | null;
  wrapperClassName?: string;
  visible?: boolean;
}
const Collapse = forwardRef(
  (
    {
      children,
      className = "",
      contentClassName = "",
      label,
      colorIcon = colors.primary[1],
      labelClassName = "",
      disabled = false,
      onClick,
      suffix,
      wrapperClassName = "",
      visible = false,
    }: ICollapse,
    ref
  ) => {
    const [showDetail, setShowDetail] = useState(visible || disabled);
    const container = useRef<any>();
    const list = useRef<any>();
    const isCustom = !!onClick;
    console.log(showDetail);
    
    useImperativeHandle(ref, () => ({
      forceUpdate: forceUpdate,
      ref: container.current,
    }));

    const getOffset = (el: any) => {
      if (!el) return 0;
      const style = el.currentStyle || window.getComputedStyle(el),
        margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight),
        padding =
          parseFloat(style.paddingLeft) + parseFloat(style.paddingRight),
        border =
          parseFloat(style.borderLeftWidth) +
          parseFloat(style.borderRightWidth);
      return margin + padding + border;
    };

    const forceUpdate = () => {
      const offset = getOffset(list.current);
      container.current.style.height = showDetail
        ? list.current.clientHeight + offset + "px"
        : 0;
      setShowDetail(visible);
    };

    useEffect(() => {
      if ((showDetail || disabled) && container.current) {
        const offset = getOffset(list.current);
        container.current.style.height =
          list.current.clientHeight + offset + "px";
      }
    }, []);

    useEffect(() => {
      if (isCustom && !disabled && container.current) {
        const offset = getOffset(list.current);
        container.current.style.height = visible
          ? list.current.clientHeight + offset + "px"
          : 0;
        setShowDetail(visible);
      }
    }, [visible, disabled, isCustom]);

    useEffect(() => {
      if (container.current)
        container.current.style.height = disabled ? "100%" : 0;
      setShowDetail(disabled);
    }, [disabled]);

    const handleOpen = () => {
      if (disabled || isCustom || !container.current) return;
      const offset = getOffset(list.current);
      container.current.style.height = !showDetail
        ? list.current.clientHeight + offset + "px"
        : 0;
      setShowDetail(!showDetail);
    };

    return (
      <div className={clsx("", className)}>
        <div className="flex items-center space-x-2 w-full">
          <div
            onClick={onClick ?? handleOpen}
            className={clsx(
              "flex items-center space-x-2 cursor-pointer leading-5 font-semibold w-full",
              // { 'mb-3': showDetail && !isCustom },
              labelClassName
            )}
          >
            <label className="cursor-pointer select-none">{label}</label>
            {!disabled ? (
              <div className="text-gray">
                <ChevronDown
                  className={showDetail ? "!rotate-0" : ""}
                  color={colorIcon}
                />
              </div>
            ) : null}
          </div>
          {suffix}
        </div>
        {((Array.isArray(children) && children.length > 0) ||
          !(children)) && (
          <Wrapper
            animated={true}
            ref={container}
            className={wrapperClassName}
          >
            <div ref={list} className={`${contentClassName} pt-3`}>
              {children}
            </div>
          </Wrapper>
        )}
      </div>
    );
  }
);

export default Collapse;

const Wrapper = styled.div.attrs<{ className: string }>({
  className: "overflow-hidden",
})<{ animated: boolean }>`
  transition: ${({ animated }) => animated && "height 0.2s linear"};
  height: 0;
`;
