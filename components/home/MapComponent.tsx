"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import ArrowForwardIcon from "@/components/common/Icons/ArrowForwardIcon";
import MapPool from "./MapDesktop";
import { useTranslationClient } from "@/i18n/client";
import { useIsMobile } from "@/hooks/useMediaQuery";
import MapPoolMobile from "./MapMobile";
import { useEffect, useState } from "react";
import { formatNumber } from "@/utils/format";
import request from "@/apis/request/instance";

type TProps = {
  lang: string;
};
type TData = {
  claimPool: number;
  marginPool: number;
  hakifiFund: number;
  scilabsFund: number;
  q_refund: number;
  q_claim: number;
};
const MapComponent = ({ lang }: TProps) => {
  const { t } = useTranslationClient("homepage");
  const isMobile = useIsMobile();
  const [dataPool, setDataPool] = useState<TData>({
    claimPool: 0,
    marginPool: 0,
    hakifiFund: 0,
    scilabsFund: 0,
    q_refund: 0,
    q_claim: 0,
  });
  const handleGetPoolData = async () => {
    return await request
      .get("/general/smart-contract-stats")
      .then((res) => {
        if (res) {
          setDataPool((res as unknown) as TData);
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    handleGetPoolData();
  }, []);

  return (
    <div className="w-full lg:px-0 px-4 max-w-desktop">
      <div className="flex items-center flex-col w-full max-w-desktop lg:mt-[100px] ">
        <div className="text-center w-full flex flex-col items-center justify-center gap-y-3">
          <div
            dangerouslySetInnerHTML={{
              __html: t("homepage:title_map"),
            }}
            className="text-4xl font-semibold"
          ></div>
          <div className="text-body-14B text-grey-1">
            {t("homepage:description_map")}
          </div>
          <Button
            variant={"primary"}
            className="h-auto max-w-[170px] px-4 py-2"
          >
            <Link
              href={"/buy-cover"}
              className="flex items-center justify-center"
            >
              <span className="text-white font-medium md:text-base mr-4">
                {t("buy_cover")}
              </span>
              <span className="text-white">
                <ArrowForwardIcon stroke="white" fill="white" />
              </span>
            </Link>
          </Button>
        </div>
      </div>
      <div className=" mt-16">
        {isMobile ? (
          <MapPoolMobile
            t={t}
            marginPool={formatNumber(dataPool.marginPool)}
            claimPool={formatNumber(dataPool.claimPool)}
            hakifiFund={formatNumber(dataPool.hakifiFund)}
            sciFund={formatNumber(dataPool.scilabsFund)}
            qRefund={formatNumber(dataPool.q_refund)}
            qSupport={formatNumber(dataPool.q_claim)}
            marginAddress="0"
            claimAddress="0"
            hakifiAddress="0"
            sciAddress="0"
          />
        ) : (
          <MapPool
            t={t}
            marginPool={formatNumber(dataPool.marginPool)}
            claimPool={formatNumber(dataPool.claimPool)}
            hakifiFund={formatNumber(dataPool.hakifiFund)}
            sciFund={formatNumber(dataPool.scilabsFund)}
            qRefund={formatNumber(dataPool.q_refund)}
            qSupport={formatNumber(dataPool.q_claim)}
            marginAddress="0"
            claimAddress="0"
            hakifiAddress="0"
            sciAddress="0"
          />
        )}
      </div>
    </div>
  );
};

export default MapComponent;
