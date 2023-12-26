import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from ".";
import clsx from "clsx";

export type TCollapseItem = {
  title: string;
  content: {
    label: string | React.ReactNode;
  }[];
  key: string;
};

interface IPropsAccordion {
  isShowArrow: boolean;
  defaultValue: string[] | string;
  collapsible: boolean;
  listCollapse: TCollapseItem[];
  orientation: "horizontal" | "vertical" | undefined;
  contentClassName: string;
  type: "single" | "multiple";
  titleClassName: string;
}
const AccordionComponents = ({
  isShowArrow,
  defaultValue,
  collapsible,
  listCollapse,
  orientation,
  contentClassName,
  type,
  titleClassName,
}: IPropsAccordion) => {
  return (
    <Accordion
      className={clsx("!flex !items-start ", {
        "flex-rows !gap-x-10": orientation === "horizontal",
        "!flex-col !gap-y-0": orientation === "vertical",
      })}
      type={(type as unknown) as any}
      defaultValue={(defaultValue as unknown) as any}
      collapsible={collapsible}
      orientation={orientation}
    >
      {listCollapse.map((item) => (
        <AccordionItem
          className={clsx("!flex-1 !text-start !border-0")}
          value={item.key}
          key={item.key}
        >
          <AccordionTrigger
            isShowArrow={isShowArrow}
            className={clsx("!text-start lg:!py-4 !py-2", titleClassName)}
          >
            {item.title}
          </AccordionTrigger>
          {item.content.map((ele, index) => (
            <AccordionContent
              key={`content${index}`}
              className={clsx(contentClassName)}
            >
              {ele.label}
            </AccordionContent>
          ))}
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default AccordionComponents;
