import { getPairDetail } from '@/apis/pair.api';
import BuyCoverPage from '@/components/BuyCover';
import { notFound } from 'next/navigation';

async function getData(symbol: string) {
  try {
    const pair = await getPairDetail(symbol);

    if (!pair || !pair.config) {
      return null;
    }
    return pair;
  } catch (error) {
    console.error(error);

    return null;
  }
}

async function BuyCover({
  params: { symbol },
}: {
  params: { symbol: string };
}) {
  const pair = await getData(symbol);

  if (!pair) return notFound();

  return <BuyCoverPage symbol={symbol} pair={pair} />;
}

export default BuyCover;