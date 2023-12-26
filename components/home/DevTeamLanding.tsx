"use client";
import React from "react";
import colors from "@/colors";
import { useTranslationClient } from "@/i18n/client";
import clsx from "clsx";
import styles from "./style/dev.module.scss";

const TeamTab = ({ t }: { t: any }) => {
  const dataSource = [
    {
      name: "Lê Chánh Cường",
      title: "Founder & CEO",
      img: "/assets/images/landing-page/ic_mr.cuong.png",
    },
    {
      name: "Nguyễn Quốc Đạt",
      title: "Co-Founder & Tech Lead",
      img: "/assets/images/landing-page/ic_mr.dat.png",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center w-full space-y-5">
      <div className="flex items-center space-x-[26px] py-[22px] px-6 bg-white box-radius lg:h-[124px] w-full">
        <div className="text-3xl sm:text-6xl max-w-[146px] font-bold text-primary-3">
          {t("homepage:dev:title")}
        </div>
        <div className="text-xs sm:text-sm sm:max-w-[500px] text-start font-semibold text-grey-1">
          {t("homepage:dev:desc")}
        </div>
      </div>
      <div className="grid grid-cols-2 grid-rows-1 gap-x-4 gap-y-4 justify-center w-full lg:py-0 py-4">
        {dataSource.map((item, i) => (
          <div
            key={i}
            className={clsx(
              "flex flex-col items-center justify-center col-span-1 p-4 sm:p-6 hover:shadow-card2 bg-white rounded-md sm:rounded-2xl cursor-pointer",
              styles.card
            )}
          >
            <div className="w-[103px] h-[103px] sm:h-[140px] lg:w-[140px] rounded-md sm:rounded-xl">
              <img
                className="rounded-full lg:object-cover object-fill  aspect-[3/2.8] lg:aspect-auto w-[103px] h-[103px] sm:h-[140px] lg:w-[140px] "
                src={item.img}
                alt={item.name}
              />
            </div>
            <div className="mt-4 sm:mt-4 w-max lg:w-full lg:text-start">
              <p
                className={clsx(
                  styles.card,
                  "text-sm sm:text-xl w-max font-semibold whitespace-nowrap  _name transition-all text-primary-3"
                )}
              >
                {item.name}
              </p>
              <div className="text-xs flex items-end w-max justify-between sm:text-sm text-grey-1 font-semibold break-words">
                {item.title}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AdvisorTab = ({ t }: { t: any }) => {
  const dataSource = [
    {
      name: "Giáp Văn Đại",
      title: "CEO SCI Labs",
      img: "/assets/images/landing-page/ic_mr.dai.png",
    },
    {
      name: "Nguyễn Minh Châu",
      title: "CTO Nami Innovation",
      img: "/assets/images/landing-page/ic_mr.chau.jpg",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center w-full space-y-5">
      <div className="flex items-center space-x-[26px] py-[22px] px-6 bg-white box-radius lg:h-[124px] w-full">
        <div className="text-3xl sm:text-6xl font-bold text-primary-3">
          {t("homepage:advisor:title")}
        </div>
        <div className="text-xs sm:text-sm sm:max-w-[500px] text-start font-semibold text-grey-1">
          {t("homepage:advisor:desc")}
        </div>
      </div>
      <div className="grid grid-cols-2 grid-rows-1 gap-x-4 gap-y-4 justify-center w-full h-full">
        {dataSource.map((item, i) => (
          <div
            key={i}
            className={clsx(
              "flex flex-col items-center justify-center col-span-1 p-4 sm:p-6 hover:shadow-card2 bg-white rounded-md sm:rounded-2xl cursor-pointer",
              styles.card
            )}
          >
            <div className="w-[103px] h-[103px] sm:h-[140px] lg:w-[140px] rounded-md sm:rounded-xl">
              <img
                className="rounded-full lg:object-cover object-fill  aspect-[3/2.8] lg:aspect-auto w-[103px] h-[103px] sm:h-[140px] lg:w-[140px] "
                src={item.img}
                alt={item.name}
              />
            </div>
            <div className="mt-4 sm:mt-4 w-max lg:w-full lg:text-start">
              <p
                className={clsx(
                  styles.card,
                  "text-sm sm:text-xl w-max font-semibold whitespace-nowrap  _name transition-all text-primary-3"
                )}
              >
                {item.name}
              </p>
              <div className="text-xs flex items-end w-max justify-between sm:text-sm text-grey-1 font-semibold break-words">
                {item.title}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const DevTeamLanding = ({ lang }: { lang: string }) => {
  const { t } = useTranslationClient(lang);
  return (
    <div
      style={{
        backgroundImage: "url(/assets/images/landing-page/bg_dev_team.png)",
      }}
      className="bg-no-repeat bg-contain bg-left"
    >
      <section className="max-w-desktop flex flex-col gap-y-4 items-center justify-center py-[3rem] sm:py-[100px] lg:px-0 px-4">
        <div className="grid lg:grid-cols-2 grid-rows-2 grid-cols-1 lg:grid-rows-1 gap-x-6 gap-y-4">
          <div className="flex-1 box-radius">
            <TeamTab t={t} />
          </div>
          <div className="flex-1 box-radius">
            <AdvisorTab t={t} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default DevTeamLanding;
