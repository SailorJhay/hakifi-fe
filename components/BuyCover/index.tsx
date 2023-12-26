import Favorites from './Favorites';
// import PlaceOrder from './PlaceOrder';
// import Chart from './Chart/Chart';
import dynamic from 'next/dynamic';
import LoaderChart from '../common/Loader/LoaderChart';
import Orders from './Orders';
import LoaderPlaceOrder from './Loader/PlaceOrderLoader';
import { PairDetail } from '@/@type/pair.type';

const Chart = dynamic(() => import('@/components/BuyCover/Chart'), {
  loading: () => <LoaderChart className="mt-4" />,
  ssr: false,
});
const PlaceOrder = dynamic(() => import('@/components/BuyCover/PlaceOrder'), {
  loading: () => <LoaderPlaceOrder className="mt-4" />,
  ssr: false,
});

interface IBuyCoverProps {
  symbol: string;
  pair: PairDetail;
}

function BuyCoverPage({ symbol, pair }: IBuyCoverProps) {
  const infoChart = {
    p_claim: 272,
    p_expired: 0,
    p_refund: 250,
    t_expired: new Date(),
    p_market: 270,
  };

  return (
    <section className="container flex flex-col-reverse items-start gap-4 p-4 md:flex-row md:gap-5 md:p-5">
      <section className="box-radius w-full bg-white md:min-w-[400px] md:flex-[1]">
        <PlaceOrder symbol={symbol} pair={pair} />
      </section>
      <section className="w-fill overflow-hidden md:flex-[2]">
        <Favorites />
        <Chart
          symbol={symbol}
          infoChart={infoChart}
          classContainer="box-radius"
        />
        <Orders />
      </section>
    </section>
  );
}

export default BuyCoverPage;
