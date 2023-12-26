import { useTranslationClient } from '@/i18n/client';
import { memo, useMemo } from 'react';
import Countdown from 'react-countdown';

export interface CountdownType {
  date: Date;
  onEnded?: () => void;
}

export const CountdownWrapper = memo(({ date, onEnded }: CountdownType) => {
  const { t } = useTranslationClient();
  const renderTimer = ({ days, hours, minutes, seconds }: any) => {
    const formatTime = (time: string | number) => {
      return time.toString().padStart(2, '0');
    };
    return (
      <>
        {days}&nbsp;{t('common:days')}&nbsp;
        {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
      </>
    );
  };
  return (
    <>
      <Countdown
        date={date}
        onComplete={onEnded}
        renderer={({ days, hours, minutes, seconds }) =>
          renderTimer({ days, hours, minutes, seconds })
        }
      />
    </>
  );
});
