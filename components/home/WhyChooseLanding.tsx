"use client";

import { useIsTablet } from "@/hooks/useMediaQuery";
import { useTranslationClient } from "@/i18n/client";
import React, { useEffect, useRef } from "react";

const WhyChooseLanding = ({ lang }: { lang: string }) => {
  // const poster = useRef<HTMLImageElement>(null)
  const iframe = useRef<HTMLIFrameElement>(null);
  const isTablet = useIsTablet();
  const { t: translation } = useTranslationClient(lang, "homepage");
  // const [playing, setPlaying] = useState(false)

  const reasons = [
    {
      icon: "/assets/images/landing-page/icons/ic_support.svg",
      label: translation("homepage:asset_title"),
      desc: translation("homepage:asset_desc"),
    },
    {
      icon: "/assets/images/landing-page/icons/ic_explicit.svg",
      label: translation("homepage:transparency_title"),
      desc: translation("homepage:transparency_desc"),
    },
    {
      icon: "/assets/images/landing-page/icons/ic_services.svg",
      label: translation("homepage:zero_title"),
      desc: translation("homepage:zero_desc"),
    },
    {
      icon: "/assets/images/landing-page/icons/ic_security.svg",
      label: translation("homepage:spot_futures_title"),
      desc: translation("homepage:spot_futures_desc"),
    },
  ];

  const img = useRef<any>(null);
  useEffect(() => {
    if (!img.current || !iframe.current) return;
    img.current.style.height = isTablet
      ? `${document.body.clientWidth / (16 / 9) - 180}px`
      : "100%";
    iframe.current.style.height = `${img.current.clientHeight}px`;
  }, [isTablet]);

  return (
    <section className="step-component max-w-desktop">
      <div className="py-[4rem] sm:py-[6rem] container">
        <div className="flex flex-col sm:items-center mb-12 sm:mb-[50px] gap-y-2  w-full text-center">
          <p className="text-xl font-semibold sm:font-bold text-primary-1 uppercase">
            {translation("homepage:why_choose")}
          </p>
          <p className="text-primary-3 text-3xl sm:text-[60px] lg:leading-[60px] font-semibold uppercase">
            Hakifi?
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-y-10 gap-x-4 sm:gap-6">
          {reasons.map((reason, i) => (
            <div
              key={i}
              className="flex flex-col lg:space-y-6 space-y-3 sm:px-4 lg:p-5 p-4 box-shadow box-radius bg-white"
            >
              <div className="flex items-center justify-between space-x-5">
                <span className="sm:text-[20px] font-bold text-primary-3 break-words w-1/2">
                  {reason.label}
                </span>
                <div className="lg:w-[90px] lg:h-[90px] w-[68px] h-[68px] bg-light-2 flex items-center justify-center rounded-full">
                  <img
                    className="lg:w-[52px] lg:h-[52px] h-10 w-10"
                    src={reason.icon}
                    alt=""
                  />
                </div>
              </div>
              <span
                title={reason.desc}
                className="text-sm mb-auto font-medium text-gray"
              >
                {reason.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseLanding;
