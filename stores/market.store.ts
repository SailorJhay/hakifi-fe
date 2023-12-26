import { Ticker } from '@/hooks/useTickerSocket';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type Store = {
  tickers: Record<string, Ticker>;
  setTicker: (ticker: Ticker) => void;
};

const useMarketStore = create<Store>()(
  immer((set) => ({
    tickers: {},
    setTicker: (ticker: Ticker) => {
      set((state) => {
        state.tickers[ticker.symbol] = ticker;
      });
    },
  })),
);

export default useMarketStore;
