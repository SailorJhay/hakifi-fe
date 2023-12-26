"use client";
/* eslint-disable react-hooks/exhaustive-deps */

import clsx from "clsx";
import { AnimatePresence, motion, usePresence } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useIsMobile } from "@/hooks/useMediaQuery";
import ArrowForwardIcon from "../common/Icons/ArrowForwardIcon";
import { useTranslationClient } from "@/i18n/client";

const StepLanding = ({ lang }: { lang: string }) => {
  const [step, setStep] = useState("step-1");
  const [isPresent, safeToRemove] = usePresence();
  const isMobile = useIsMobile();
  const { t: translation } = useTranslationClient(lang, "homepage");
  const steps = [
    {
      icon: "/assets/images/landing-page/ic_step_2.svg",
      label: translation("homepage:step:step_2"),
      value: "step-1",
      content: translation("homepage:step:step_2_content"),
    },
    {
      icon: "/assets/images/landing-page/ic_step_3.svg",
      label: translation("homepage:step:step_3"),
      value: "step-2",
      content: translation("homepage:step:step_3_content"),
    },
    {
      icon: "/assets/images/landing-page/ic_step_4.svg",
      label: translation("homepage:step:step_4"),
      value: "step-3",
      content: translation("homepage:step:step_4_content"),
    },
  ];
  React.useEffect(() => {
    !isPresent && safeToRemove();
  }, [isPresent]);
  return (
    <div className="overflow-hidden">
      <div className="w-full py-8 bg-primary-light relative flex flex-col items-center space-y-[120px] sm:space-y-12">
        <div className="text-3xl md:text-4xl leading-[44px] font-semibold sm:font-bold text-center">
          <p
            dangerouslySetInnerHTML={{
              __html: translation("homepage:step:title"),
            }}
            className="text-primary-3"
          ></p>
        </div>
        <div className="w-full flex lg:flex-row flex-col gap-y-20 items-center justify-start">
          <div
            className="lg:w-[50%] w-full mr-4 lg:mr-0 h-full bg-left bg-no-repeat bg-[length:100%_316px] rounded-r-3xl"
            style={{
              backgroundImage: `url(/assets/images/landing-page/step_bg.png)`,
            }}
          >
            <AnimatePresence mode="wait">
              <>
                <motion.div
                  key={step}
                  initial={{ x: -300, opacity: 0 }}
                  animate={{ x: isMobile ? 0 : 40, opacity: 1 }}
                  exit={{ x: 300, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="lg:w-full lg:h-[542px] w-[361px] h-[324px] border-none"
                >
                  <img
                    src={`/assets/images/landing-page/${step}.png`}
                    alt=""
                    className="w-full h-full object-contain aspect-square"
                  />
                </motion.div>
              </>
            </AnimatePresence>
          </div>
          <div className="lg:w-1/2 w-full flex items-center justify-start">
            <div className="flex lg:flex-row flex-col justify-between">
              <div className="flex flex-col justify-around items-center lg:items-start w-full max-w-[596px]  px-4 lg:pl-[100px] lg:pr-0 gap-y-10">
                {steps.map((item, i) => (
                  <div
                    key={i}
                    className={clsx(
                      "flex flex-row items-center  justify-start w-full text-center hover:cursor-pointer p-3.5 box-radius lg:gap-x-5 gap-x-4",
                      {
                        "shadow-md bg-white ": step === item.value,
                      }
                    )}
                    onMouseMove={() => {
                      setStep(item.value);
                      !isPresent && safeToRemove();
                    }}
                  >
                    <div className="lg:w-[90px] lg:h-[90px] w-[60px] h-[60px] rounded-full bg-primary-light flex items-center justify-center">
                      <img
                        className="w-10 h-10 lg:w-12 lg:h-12 mx-auto my-auto"
                        src={item.icon}
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col items-start justify-start gap-y-1.5 w-full">
                      <p className="text-primary-3 text-xl font-bold">
                        {item.label}
                      </p>
                      <p className="text-grey-1 text-body-14B text-start">
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
                <Link href="/buy-cover">
                  <Button
                    className="w-max space-x-3 !text-white !rounded-[100px] px-4 py-2 flex items-center"
                    variant="primary"
                    color="blue"
                  >
                    <span>{translation("homepage:step:start")}</span>
                    <ArrowForwardIcon stroke="white" fill="white" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepLanding;
