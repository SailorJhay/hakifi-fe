import { IPairConfig } from '@/models/order.model';
import request from './request/instance';
import { PairDetail } from '@/@type/pair.type';

export const getPairDetail = (symbol: string) => {
  return request.get<PairDetail>(`/pairs/${symbol}`);
};
