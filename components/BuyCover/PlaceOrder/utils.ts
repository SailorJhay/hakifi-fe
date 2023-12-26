import { informula } from '@/lib/informula';
import dayjs from 'dayjs';
import { PERIOD_UNIT } from 'hakifi-formula';

export interface CalculateInsuranceParamsDto {
  period: number;
  margin: number;
  q_covered: number;
  p_open: number;
  p_claim: number;
  periodUnit: PERIOD_UNIT;
  periodChangeRatio: number;
}

export function calculateInsuranceParams(data: CalculateInsuranceParamsDto) {
  const {
    period,
    margin,
    q_covered,
    p_open,
    p_claim,
    periodUnit,
    periodChangeRatio,
  } = data;
  let expiredAt: Date;
  switch (periodUnit) {
    case PERIOD_UNIT.DAY:
      expiredAt = dayjs().add(period, 'day').toDate();
      break;
    case PERIOD_UNIT.HOUR:
      expiredAt = dayjs().add(period, 'hour').toDate();
      break;
  }

  const hedge = informula.calculateHedge(margin, q_covered);

  const p_liquidation = informula.calculatePStop({
    hedge,
    p_claim,
    p_open,
  });

  const q_claim = informula.calculateQClaim({
    hedge,
    day_change_token: periodChangeRatio,
    margin,
    p_claim,
    p_open,
    period_unit: periodUnit as PERIOD_UNIT,
  });

  const p_refund = informula.calculatePRefund(p_open, p_claim);
  const p_cancel = (p_claim + p_refund) / 2;

  return {
    expiredAt,
    hedge,
    q_claim,
    p_liquidation,
    p_refund,
    p_cancel,
  };
}
