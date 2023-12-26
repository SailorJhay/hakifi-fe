import { PERIOD_UNIT } from 'hakifi-formula';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type Params = {
  q_claim?: number;
  p_open?: number;
  p_liquidation?: number;
  p_refund?: number;
  p_cancel?: number;
  hedge?: number;
  p_claim?: number;
  q_covered: number;
  margin: number;
  period: number;
  expiredAt?: Date;
  periodUnit: PERIOD_UNIT;
};

type Store = Params & {
  updateParams: (params: Partial<Params>) => void;
};

const useBuyCoverStore = create<Store>()(
  immer((set) => ({
    q_covered: 75,
    margin: 5,
    period: 1,
    periodUnit: PERIOD_UNIT.DAY,
    updateParams: (params: Partial<Params>) => {
      set((state) => {
        for (const key in params) {
          if (params.hasOwnProperty(key)) {
            // @ts-ignore
            state[key] = params[key as keyof Params];
          }
        }
      });
    },
  })),
);

export default useBuyCoverStore;
