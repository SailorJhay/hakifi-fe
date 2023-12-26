import { Wallet } from '@/@type/wallet.type';
import axios from '@/utils/axios.base';
import request from "./request/instance";

export const getAuthUser = async () => {
  const res = await request.get<Wallet>('/users/me');
  return res;
};
