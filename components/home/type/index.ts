import { stateInsurance } from "@/utils/constant";

export type TStateLogs= {
    state: string;
    txhash: string;
    error: any;
    time: string
}

export type TDataTransaction = {
    id: string;
    state: keyof typeof stateInsurance;
    side: string;
    asset: string;
    unit: string;
    txhash: string;
    stateLogs: TStateLogs[],
    q_claim: number;
    margin: number
    updatedAt: string;
    createdAt: string;
    closedAt: string;
}