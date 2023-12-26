"use client";

/* eslint-disable no-case-declarations */
import colors from "@/colors";
import {
  Accordion,
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
} from "@/components/common/Accordion";
import AccordionComponents, {
  TCollapseItem,
} from "@/components/common/Accordion/AccordionComponents";
import Collapse from "@/components/common/Collapse/Collapse";
import {
  FaceBookIcon,
  TelegramIcon,
  EmailIcon,
  TwitterIcon,
} from "@/components/common/Icons/SvgIcons";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { useTranslationClient } from "@/i18n/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface IFooter {
  className?: string;
}

const WHITE_PAPER = "whitepaper";
const TUTORIAL = "tutorial";
const TERM = "term";
const FAQS = "faqs";

const Footer = ({ className = "" }: IFooter) => {
  const isMobile = useIsMobile();
  const {
    t,
    i18n: { language },
  } = useTranslationClient("common");

  const LINKS: any = {
    [WHITE_PAPER]: {
      vi: "",
      en: "",
    },
    [TUTORIAL]: {
      vi:
        "https://docs.hakifi.io/tutorials/instructions-for-installing-web3-wallet",
      en:
        "https://docs.hakifi.io/tutorials/instructions-for-installing-web3-wallet",
    },
    [TERM]: {
      en: "https://docs.hakifi.io/documents/faqs",
      vi: "https://docs.hakifi.io/documents/faqs",
    },
    [FAQS]: {
      vi: "https://docs.hakifi.io/documents/term-of-use",
      en: "https://docs.hakifi.io/documents/term-of-use",
    },
  };
  const general = {
    labelClassName: "flex items-center justify-between text-black text-content",
    contentClassName:
      "md:space-y-3 !pt-2 md:!pt-4 text-xs font-semibold !text-gray",
    itemLabelClassName: "text-primary-dark text-body-14B !pl-0",
  };

  const onRedirect = (key: string, route?: string) => {
    switch (key) {
      case WHITE_PAPER:
      case TUTORIAL:
      case TERM:
      case FAQS:
        return "";
      case "referral":
        const link: any = {
          en: "/docs/policy.pdf",
          vi: "/docs/chuong-trinh-gioi-thieu-cho-ca-nhan.pdf",
        };
        return link[language];
      default:
        return route;
    }
  };

  const listContent: TCollapseItem[] = [
    {
      title: t("common:footer:categories:title"),
      content: [
        {
          label: (
            <Link href="/buy-cover" className={general.contentClassName}>
              {t("homepage:buy_cover")}
            </Link>
          ),
        },
        {
          label: (
            <Link
              href={onRedirect("referral")}
              locale="en"
              target="_blank"
              className={general.contentClassName}
            >
              {t("common:footer:product:referral")}
            </Link>
          ),
        },
      ],
      key: "item-1",
    },
    {
      title: t("common:footer:on_boarding:title"),
      content: [
        {
          label: (
            <Link href={onRedirect(WHITE_PAPER)}>
              {t("common:footer:on_boarding:ter_sys")}
            </Link>
          ),
        },
        {
          label: (
            <Link href={onRedirect(TUTORIAL)}>
              {t("common:footer:on_boarding:status")}
            </Link>
          ),
        },
        {
          label: (
            <Link href={onRedirect(FAQS)}>
              {t("common:footer:on_boarding:list_docs")}
            </Link>
          ),
        },
      ],
      key: "item-2",
    },
    {
      title: t("common:footer:document:title"),
      content: [
        {
          label: (
            <Link href={onRedirect(FAQS)}>
              {t("common:footer:document:whitepaper")}
            </Link>
          ),
        },
        {
          label: (
            <Link href={onRedirect(FAQS)}>
              {t("common:footer:document:tutorial")}
            </Link>
          ),
        },
        {
          label: (
            <Link href={onRedirect(FAQS)}>
              {t("common:footer:document:faqs")}
            </Link>
          ),
        },
      ],
      key: "item-3",
    },
  ];
  return (
    <footer
      className={`bg-white ${className} border-b-[10px] border-primary-1`}
    >
      <div className="max-w-desktop py-10 flex lg:flex-row flex-col items-start justify-between lg:px-0 px-4">
        <div className="flex lg:items-start items-center justify-center lg:justify-start flex-col gap-y-3 w-1/3">
          <div className="flex items-center">
            <Image
              width={40}
              height={40}
              quality={80}
              src="/assets/images/logo.png"
              alt="logo"
              style={{ maxHeight: 180 }}
              className="h-auto mr-1"
            />
            <p className="text-3xl font-bold text-primary-1">Hakifi</p>
          </div>
          <div className="text-xs sm:text-sm lg:text-left text-right lg:block hidden">
            Copyright © 2023 Hakifi.
            <br className="" /> All rights reserved.
          </div>
        </div>
        <div className="flex items-start justify-between w-1/2 gap-x-10 lg:flex-row flex-col">
          <div className="w-max flex items-center">
            <AccordionComponents
              isShowArrow={isMobile as boolean}
              defaultValue={isMobile ? "" : ["item-1", "item-2", "item-3"]}
              collapsible={isMobile as boolean}
              listCollapse={listContent}
              orientation={isMobile ? "vertical" : "horizontal"}
              contentClassName="!border-0 !whitespace-nowrap"
              type={isMobile ? "single" : "multiple"}
              titleClassName={general.labelClassName}
            />
          </div>
          <div className="flex items-center flex-col py-4 gap-y-4">
            <div className={general.labelClassName}>
              {t("common:footer:community:title")}
            </div>
            <div className="flex items-center gap-x-4">
              <Link href={"twitter"}>
                <TwitterIcon />
              </Link>

              <Link href={"facebook"}>
                <FaceBookIcon />
              </Link>

              <Link href={"telegram"}>
                <TelegramIcon />
              </Link>

              <Link href={"email"}>
                <EmailIcon />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="items-center w-full justify-between bg-primary border-grey[1]sm:py-3 lg:px-0 pl-4 lg:hidden flex">
        <img
          className="max-h-9 sm:max-h-[46px] lg:hidden block"
          src="/images/ic_logo_light.png"
          alt=""
        />
        <div className="text-white text-xs sm:text-sm lg:text-left text-right">
          © 2023 Hakifi.
          <br className="lg:hidden block" /> All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
