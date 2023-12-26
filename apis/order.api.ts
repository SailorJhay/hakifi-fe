import { IPairConfig } from "@/models/order.model";
import request from "./request/instance";
import { API_GET_INSURANCES, API_GET_PAIR_CONFIG, API_GET_PRICE } from "./urls";
import { ORDER_STATUS } from "@/utils/constant";

export const getPairConfigApi = (symbol: string) => {
    return request.get<IPairConfig>(`/pairs/${symbol}`);
};

interface IParams {
    q?: string;
    page?: number;
    state?: string;
}

export const getInsuranceApi = (params: IParams) => {
    return request.get(`/insurances`, {
        params
    });
};

export const getSymbolPriceApi = (symbol: string) => {
    return request.get(`/price/${symbol}`);
};