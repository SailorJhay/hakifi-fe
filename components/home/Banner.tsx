import React from "react";
import ArrowForwardIcon from "@/components/common/Icons/ArrowForwardIcon";
import { Button } from "../ui/button";
import Link from "next/link";
import { useTranslation } from "@/i18n";
import Image from "next/image";

type TProps = {
  lang: string;
};

async function Banner({ lang }: TProps) {
  const { t } = await useTranslation(lang, "homepage");

  return (
    <div className="mt-6 md:mt-0 md:relative max-w-desktop">
      <div className="flex items-center justify-between lg:flex-row flex-col">
        <div className="flex flex-col flex-1 md:items-start items-center z-10 mx-9 md:mx-0">
          <span className="text-primary-1 font-bold md:display-2-desktop display-2-mobile">
            Hakifi
          </span>
          <div className="text-primary-3 md:display-1-desktop display-1-mobile font-medium md:max-w-[428px] text-center md:text-left">
            {t("slogan_first")}
          </div>

          <div className="mt-7 md:mt-12">
            <Button
              variant={"primary"}
              className="rounded-full h-auto py-2 pl-4 pr-2 md:py-3 md:pl-5 md:pr-3"
            >
              <Link
                href={"/buy-cover"}
                className="flex items-center justify-center"
              >
                <span className="text-white font-medium md:text-base mr-4">
                  {t("buy_cover")}
                </span>
                <span className="bg-white rounded-full p-mobile">
                  <ArrowForwardIcon />
                </span>
              </Link>
            </Button>
          </div>
        </div>
        <div
          style={{ aspectRatio: 1200 / 884 }}
          className="flex w-full md:flex-[1] justify-end relative md:static mt-8"
        >
          {lang === "vi" ? (
            <Image
              width={650}
              height={610}
              quality={100}
              src="/assets/images/iphone_vietnamese.png"
              alt="iphone_vietnamese"
              className="z-10 object-contain w-full"
            />
          ) : (
            <Image
              width={650}
              height={610}
              quality={100}
              src="/assets/images/iphone_english.png"
              alt="iphone_english"
              className="z-10 object-contain w-full"
            />
          )}
          <Image
            width={390}
            height={530}
            quality={80}
            src="/assets/images/bg_primary.png"
            alt="background"
            className="h-0.8 absolute top-0 right-0 rounded-ss-[20px] md:rounded-ss-none md:w-1/4 w-1/3"
          />
        </div>
      </div>
    </div>
  );
}

export default Banner;
