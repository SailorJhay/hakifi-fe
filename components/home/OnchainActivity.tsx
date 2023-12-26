"use client";

/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-fallthrough */
/* eslint-disable no-empty */
import clsx from "clsx";
import dayjs from "dayjs";
import React, { memo, useEffect, useState } from "react";
import ExternalIcon from "../common/Icons/ExternalIcon";
import { substring } from "@/utils/helpers";
import { formatNumber } from "@/utils/format";
import { useTranslationClient } from "@/i18n/client";
import { TDataTransaction } from "./type";
import { updateArray } from "./constant";
import request from "@/apis/request/instance";
import StatusBox from "../common/StatusBox";
import { VICTION_SCAN } from "@/utils/constant";

interface IOnchainActivity {
  className?: string;
  lang: any;
}
type TData = {
  listBullInsurances: TDataTransaction[];
  listBearInsurances: TDataTransaction[];
};
const LIMIT_EVENT_LOGS = 10;
const OnchainActivity = memo(({ className, lang }: IOnchainActivity) => {
  const { t: translation } = useTranslationClient(lang, "homepage");
  const [dataSource, setDataSource] = useState<TData>({
    listBearInsurances: [],
    listBullInsurances: [],
  });
  const getOnchain = async () => {
    return await request.get("/general/transactions").then((res) => {
      if (res) {
        setDataSource({
          listBearInsurances: updateArray(
            res.listBearInsurances,
            LIMIT_EVENT_LOGS
          ),
          listBullInsurances: updateArray(
            res.listBullInsurances,
            LIMIT_EVENT_LOGS
          ),
        });
      }
    });
  };
  useEffect(() => {
    getOnchain();
  }, []);

  const renderTransaction = (val: string) => {
    return (
      <div className="flex items-center space-x-1">
        <span>{val?.length > 20 ? substring(val, 7) : val}</span>
        {val.length > 20 && (
          <ExternalIcon
            onClick={() => window.open(`${VICTION_SCAN}/tx/${val}`, "_blank")}
          />
        )}
      </div>
    );
  };
  const renderContent = (data: TDataTransaction[]) => {
    return data.map((item: TDataTransaction, idx: number) => (
      <div
        className="bg-white shadow rounded-xl mx-3 px-3 sm:px-4 py-4 sm:py-6 cursor-pointer whitespace-nowrap min-w-[320px]"
        key={idx}
      >
        <div className="w-max rounded-md">
          <StatusBox status={item.state} />
        </div>
        <div className="py-4 flex flex-col space-y-1 border-b border-gray-5">
          <div className="flex items-center justify-between font-semibold">
            <div className="flex items-center space-x-2">
              <span className="text-primary-3 text-sm">
                {item?.asset}
                <span className="text-grey-1">/USDT</span>
              </span>
              <span className="bg-grey-1 w-1 h-1 rounded-full" />
              <span
                className={clsx("capitalize text-sm", {
                  "text-red-default": item?.side === "BEAR",
                  "text-green-default": item?.side === "BULL",
                })}
              >
                {item?.side === "BEAR" ? "Bear" : "Bull"}
              </span>
            </div>
            <span className="text-primary-3 text-sm">
              +{formatNumber(item?.q_claim, 2)}
            </span>
          </div>
          <div className="flex items-center justify-between space-x-4 text-xs font-semibold text-gray">
            <div>{item?.id}</div>
            <div>{dayjs(item?.updatedAt).format("HH:mm:ss DD/MM/YYYY")}</div>
          </div>
        </div>
        <div className="pt-4 flex flex-col space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-gray text-body-14B">
              {translation("common:txhash")}
            </span>
            <span className="font-semibold text-primary-3 text-sm">
              {renderTransaction(
                item?.stateLogs[item.stateLogs.length - 1].txhash || ""
              )}
            </span>
          </div>
        </div>
      </div>
    ));
  };
  return (
    <section className={clsx("py-11 sm:py-[7rem]", className)}>
      <div className="flex flex-col space-y-6">
        {dataSource.listBullInsurances?.length > 0 ? (
          <div className="w-full overflow-hidden py-5" key={"bull"}>
            <div className="loop-looper-rtl w-max">
              <div className="flex items-center">
                {renderContent(dataSource.listBullInsurances)}
              </div>
            </div>
          </div>
        ) : null}
        {dataSource.listBearInsurances?.length > 0 ? (
          <div className="w-full overflow-hidden py-5" key={"bear"}>
            <div className="loop-looper-ltr w-max">
              <div className="flex items-center">
                {renderContent(dataSource.listBearInsurances)}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
});

export default OnchainActivity;
