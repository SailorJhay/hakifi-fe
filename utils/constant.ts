export enum THEME_MODE {
  LIGHT = "LIGHT",
  DARK = "DARK",
}

export enum NOTIFICATIONS {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
}

export const BASE_URL: string =
  (process.env.NEXT_PUBLIC_SERVER_BASE_URL as string) ||
  "http://localhost:3000";

export const stateInsurance = {
  CLAIM_WAITING: "Claim_waiting",
  REFUNDED: "Refunded",
  CLAIMED: "Claimed",
  EXPIRED: "Expired",
  LIQUIDATED: "Liquidated",
  AVAILABLE: "Available",
  CANCELED: "Canceled",
  INVALID: "Invalid",
  REFUND_WAITING: "Refund-waiting",
  PENDING: "Pending",
};
export const TOKENS_DEFAULT = [
  "BTC",
  "ETH",
  "BNB",
  "DOT",
  "LINK",
  "AVAX",
  "MATIC",
  "ONE",
];

export const UMBRELLAZ_KEY = {
  SYMBOL: "UMBRELLAZ_KEY_SYMBOL",
};

export enum MODE {
  BULL = "BULL",
  BEAR = "BEAR",
}

export const ORDER_LIST_MODE = {
  OPENING: "opening",
  HISTORY: "history",
};

export const adjustPercents = [
  {
    label: "5",
    value: "0.05",
  },
  {
    label: "10",
    value: "0.1",
  },
  {
    label: "20",
    value: "0.2",
  },
  {
    label: "50",
    value: "0.5",
  },
];

export enum TRADING_VIEW_DEFAULTS {
  LIBRARY_PATH = "/lib/tradingview/charting_library/",
  CHARTS_STORAGE_URL = "https://saveload.tradingview.com",
  CHARTS_STORAGE_API_VERSION = "1.1",
  CLIENT_ID = "tradingview.com",
  USER_ID = "public_user_id",
  CONTAINER_ID_SPOT = "tv_chart_container",
  INTERVAL = "1D",
  CUSTOM_CSS = "/lib/tradingview/trading_view.theme.css",
  TEST_SYMBOL = "Bitfinex:BTC/USD",
  PRESET_WIDTH = 1023,
}

export const ORDER_STATUS = {
    PENDING: 'PENDING',
    AVAILABLE: 'AVAILABLE',
    EXPIRED: 'EXPIRED',
    REFUNDED: 'REFUNDED',
    REFUND_WAITING: 'REFUND_WAITING',
    CLAIMED: 'CLAIMED',
    CLAIM_WAITING: 'CLAIM_WAITING',
    LIQUIDATED: 'LIQUIDATED',
    INVALID: 'INVALID',
    CANCELLED: 'CANCELLED'
};
export const VICTION_SCAN = process.env.NEXT_PUBLIC_VICTION_SCAN;
