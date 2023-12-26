export interface MarketWatchRaw {
  ft: string;
  h: string;
  l: string;
  lcp: string;
  ld: string;
  o: string;
  p: string;
  q: string;
  r: string;
  s: string;
  v: string;
}

export interface IPairConfig {
  id: string;
  symbol: string;
  asset: string;
  unit: string;
  isMaintain: boolean;
  isActive: boolean;
  isHot: boolean;
  createdAt: string;
  updatedAt: string;
  token: Token;
  config: IConfig;
}
interface IConfig {
  listDayChangeRatio: number[];
  listHourChangeRatio: [];
}
interface Token {
  id: string;
  symbol: string;
  attachment: string;
  decimals: number;
}

export interface IInformationChart {
  [key: string]: number | Date | undefined;
}

export interface OrderInsurance {
  stateLogs: StateLog[];
  metadata: any;
  id: string;
  userId: string;
  txhash: string;
  asset: string;
  unit: string;
  margin: number;
  q_claim: number;
  q_covered: number;
  p_open: number;
  p_close: number;
  p_liquidation: number;
  p_claim: number;
  p_refund: number;
  p_cancel: number;
  leverage: number;
  periodChangeRatio: number;
  hedge: number;
  systemCapital: number;
  invalidReason: any;
  period: number;
  periodUnit: string;
  state: string;
  side: string;
  isTransferBinance: boolean;
  expiredAt: string;
  closedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface StateLog {
  state: string;
  txhash: string;
  error: any;
  time: string;
}
