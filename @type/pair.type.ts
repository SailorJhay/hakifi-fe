export type Pair = {
  id: string;
  symbol: string;
  asset: string;
  unit: string;
  isMaintain: boolean;
  isActive: boolean;
  isHot: boolean;
  createdAt: Date;
  updatedAt: Date;
  token: {
    attachment: string;
    id: string;
    decimals: number;
  };
};

export type PairConfig = {
  listDayChangeRatio: number[];
  listHourChangeRatio: [];
};

export type PairDetail = Pair & {
  config: PairConfig;
};
