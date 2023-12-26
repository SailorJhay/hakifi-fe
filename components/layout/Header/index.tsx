"use client";

import CalendarIcon from '@/components/common/Icons/BarsIcons';
import CancelIcon from '@/components/common/Icons/CancelIcon';
import NotificationIcon from '@/components/common/Icons/NotificationIcon';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useIsTablet } from '@/hooks/useMediaQuery';
import useAppStore from '@/stores/app.store';
import useChartStore from '@/stores/chart.store';
import clsx from 'clsx';
import { LazyMotion, domAnimation, motion, useCycle } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';
import LanguageSelector from './LanguageSelector';
import Navigation from './navigations';

const MobileMenuBar = dynamic(() => import('./MobileMenuBar'), {
    ssr: false,
});

const ConnectWallet = dynamic(() => import('./ConnectWallet'), {
    ssr: false,
    loading: () => <Skeleton className="h-10 w-[167px] !rounded-full" />
});

function Header() {
    const [isOpenMobileNav, toggleOpenMobileNav] = useCycle(false, true);
    const isTablet = useIsTablet();

    const { setInitMarketWatches } = useAppStore();
    const { setChartConfig } = useChartStore();

    /**
     * Uncomment when apply get config chart
    */
    // const getChartConfig = async () => {
    //     const [err, response] = await handleRequest<ChartConfig>(getUpdateChartConfigApi());

    //     if (err) {
    //         console.log("Get chart config is error with message", err);
    //         return;
    //     }

    //     if (response) {
    //         const { data: config } = response;
    //         setChartConfig(config);
    //     }
    // };

    // useEffect(() => {
    //     getChartConfig();
    // }, []);

    return (
        <>
            <header className='h-17 z-50 bg-white'>
                <div className='container flex justify-between items-center h-full w-full'>
                    <Link href='/' className='flex items-center'>
                        <Image
                            width={40}
                            height={40}
                            quality={80}
                            src='/assets/images/logo.png'
                            alt='logo'
                            style={{ maxHeight: 180 }}
                            className='h-auto mr-1'
                        />
                        <p className='lg:block hidden text-3xl font-bold text-primary-1'>Hakifi</p>
                    </Link>

                    {/* Main menu */}
                    <Navigation />

                    <div className='flex items-center'>

                        <NotificationIcon className='mr-4' />
                        <LanguageSelector className='mr-3 lg:mr-4 h-fit' />
                        <ConnectWallet className='mr-3 lg:mr-0' />

                        <Button
                            className='lg:hidden p-0'
                            onClick={() => toggleOpenMobileNav()}
                        >
                            {isOpenMobileNav ? <CancelIcon /> : <CalendarIcon />}
                        </Button>
                    </div>
                </div>
            </header>

            {isTablet !== null && isTablet && (
                <LazyMotion features={domAnimation}>
                    <motion.div className='relative' initial={false} animate={isOpenMobileNav ? "open" : "closed"}>
                        <MobileMenuBar classParent={clsx(!isOpenMobileNav && 'hidden')} />
                    </motion.div>
                </LazyMotion>
            )}
        </>
    );
}

export default memo(Header);