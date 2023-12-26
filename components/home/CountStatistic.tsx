"use client";
/* eslint-disable react/no-children-prop */
import React, { useEffect, useState } from "react";
import { formatNumber } from "@/utils/format";
import request from "@/apis/request/instance";

type TData = {
  totalUsers: number;
  totalContracts: number;
  totalQCovered: number;
  totalPayback: number;
};

const CountStatistic = () => {
  const [dataStatistic, setDataStatistic] = useState<TData>({
    totalUsers: 0,
    totalContracts: 0,
    totalPayback: 0,
    totalQCovered: 0,
  });
  const titles: {
    title: string;
    value: keyof TData;
    prefix?: string;
    description?: string;
  }[] = [
    {
      title: "Total Payback",
      value: "totalPayback",
      prefix: "$",
      description: "abc",
    },
    {
      title: "Cover Amount",
      value: "totalQCovered",
      prefix: "$",
      description: "abc",
    },
    { title: "Total Users", value: "totalUsers" },
    { title: "Contract", value: "totalContracts" },
    // { title: "Total Margin", value: "totalMargin" },
  ];
  const handleGetDataStats = async () => {
    return await request
      .get("/general/stats")
      .then((res) => {
        if (res) {
          setDataStatistic((res as unknown) as TData);
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    handleGetDataStats();
  }, []);

  return (
    <div className="box-radius lg:flex grid grid-cols-2 items-center shadow-md w-full max-w-desktop bg-white p-5 lg:px-0 gap-y-4">
      {titles.map((item) => {
        return (
          <div
            className="flex items-center flex-col justify-center w-full flex-1 gap-y-1.5 col-span-1"
            key={item.value}
          >
            <div className="text-body-14B text-grey-1">{item.title}</div>
            <div className="display-2-desktop text-primary-1">
              {item?.prefix || null}
              {formatNumber(dataStatistic[item.value], 2)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CountStatistic;
