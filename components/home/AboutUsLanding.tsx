"use client";

/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { useIsMobile } from "@/hooks/useMediaQuery";
import { useTranslationClient } from "@/i18n/client";
import clsx from "clsx";
import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./style/about.module.scss";

const dataSource = [
  {
    name: "Nami Exchange",
    title: "nami.exchange",
    content: "homepage:nami",
    img: "/assets/images/landing-page/ic_partner_nami.png",
    icon: "/assets/images/landing-page/nami.svg",
  },
  {
    name: "VNST",
    title: "vnst.io",
    content: "homepage:vnst",
    img: "/assets/images/landing-page/ic_partner_vnst.png",
    icon: "/assets/images/landing-page/vnst.svg",
  },
  {
    name: "SCI Labs",
    title: "scilabs.io",
    content: "homepage:sci",
    img: "/assets/images/landing-page/ic_partner_sci.png",
    icon: "/assets/images/landing-page/sci.svg",
  },
];
const AboutUsLanding = ({ lang }: { lang: any }) => {
  const content = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const isMobile = useIsMobile();
  const timer = useRef<ReturnType<typeof setInterval>>();
  const { t: translation } = useTranslationClient(lang, "homepage");
  useEffect(() => {
    clearInterval(timer.current);
    timer.current = setInterval(() => {
      setIndex((index) => {
        return index >= dataSource.length - 1 ? 0 : index + 1;
      });
    }, 5000);
    return () => {
      clearInterval(timer.current);
    };
  }, [dataSource]);

  return (
    <section
      className="bg-primary-light bg-cover bg-no-repeat lg:bg-right bg-center overflow-hidden"
      style={{
        backgroundImage: "url(/assets/images/landing-page/Nen.png)",
      }}
    >
      <div className="lg:px-6 px-4 h-full py-6 lg:py-12 w-full flex items-center justify-between max-w-desktop">
        <div
          ref={content}
          className="h-full lg:min-h-[380px] flex flex-col justify-between lg:space-y-0 space-y-10"
        >
          <div className="h-full">
            <div className={styles.wrapper}>
              {dataSource.map((item, i) => (
                <div
                  key={i}
                  className={clsx({
                    "lg:bottom-14 flex flex-col w-[calc(100%-32px)] h-2/3 justify-between": isMobile,
                    "max-w-[400px] lg:max-w-[500px]": !isMobile,
                    [styles.active]: index === i,
                    [styles.inactive]: index !== i,
                  })}
                >
                  <div className="sm:pt-0 sm:pb-4">
                    <div className="text-sm sm:text-xl font-semibold mb-1 sm:mb-0 flex items-center justify-start gap-x-3">
                      <div className="rounded-[10px] max-w-[52px] bg-white">
                        <img
                          src={item.icon}
                          alt=""
                          className="h-[52] w-[52px] lg:w-9 lg:h-9 px-2 py-2"
                        />
                      </div>
                      <p className="text-2xl font-bold leading-6 text-white">
                        {item.name}
                      </p>
                    </div>
                  </div>
                  <div className="md:hidden flex items-center justify-center w-full">
                    <div
                      className={clsx(
                        "lg:w-[389px] lg:h-[389px] w-[198px] h-[198px] flex items-center justify-center"
                      )}
                    >
                      {dataSource.map((item, i) => (
                        <div
                          key={i}
                          className={clsx(
                            styles.article_img,
                            "bg-cover w-[198px] h-[198px] bg-no-repeat bg-center overflow-hidden rounded-xl flex items-center justify-center sm:rounded-3xl",
                            {
                              [styles.active_article]: index === i,
                              [styles.inactive_article]:
                                index !== i,
                            }
                          )}
                        >
                          <img
                            className={`w-[68px] h-[68px] object-cover lg:mb-10 mb-7`}
                            src={item.img}
                            alt=""
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-xl sm:text-4xl font-bold max-w-[540px] text-white">
                    “{translation(item.content)}”
                  </p>
                </div>
              ))}
            </div>
          </div>
          <Pagination total={dataSource.length} page={index} limit={1} />
        </div>
        <div className="lg:block hidden">
          <div
            className={clsx(
              styles.article,
              "lg:w-[389px] lg:h-[389px] w-[198px] h-[198px] flex items-center justify-center"
            )}
          >
            {dataSource.map((item, i) => (
              <div
                key={i}
                className={clsx(
                  styles.article_img,
                  "md:w-[389px] h-[389px] bg-cover bg-no-repeat bg-center overflow-hidden rounded-xl flex items-center justify-center sm:rounded-3xl ",
                  {
                    [styles.active_article]: index === i,
                    [styles.inactive_article]: index !== i,
                  }
                )}
              >
                <img
                  className={`max-h-[103px] object-cover mb-10`}
                  src={item.img}
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface PaginationType {
  limit: number;
  page: number;
  total: number;
}
const Pagination = ({ limit, page, total }: PaginationType) => {
  const totalPage = useMemo(() => Math.ceil(total / limit), [total, limit]);
  const renderDots = () => {
    const dot = [];
    for (let i = 0; i < totalPage; i++) {
      dot.push(
        <div
          key={i}
          className={clsx("!rounded-full !h-1 !transition-all", {
            "!w-6 !bg-white": i === page,
            "bg-grey-2 !w-1 ": i !== page,
          })}
        />
      );
    }
    return dot;
  };

  return (
    <div className={clsx("flex items-center space-x-2")}>{renderDots()}</div>
  );
};

export default AboutUsLanding;
