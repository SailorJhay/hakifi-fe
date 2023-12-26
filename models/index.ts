export interface TickerFieldType {
  symbol: string;
  className?: string;
  decimal?: number;
  jump?: boolean;
  fieldName?: 'lastPrice' | 'highPrice' | 'lowPrice';
  suffix?: any;
}