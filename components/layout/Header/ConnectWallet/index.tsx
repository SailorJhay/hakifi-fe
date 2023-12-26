 "use client";

import { Button } from '@/components/ui/button';
import { useIsTablet } from '@/hooks/useMediaQuery';
import { useTranslationClient } from '@/i18n/client';
import useAppStore from '@/stores/app.store';
import { useAccount } from 'wagmi';
import Profile from './Profile';
import clsx from 'clsx';

const ConnectWallet = ({
    className,
    onClick,
}: {
    className?: string;
    onClick?: () => void;
}) => {
    const { t } = useTranslationClient();
    const toggleConnectWalletModal = useAppStore(
        (state) => state.toggleConnectWalletModal
    );
    const isTablet = useIsTablet();
    const { address, isConnected } = useAccount();

    if (isConnected) {
        if (isTablet) return null;
        return <Profile />;
    }

    const onClickButton = () => {
        toggleConnectWalletModal(true);
        onClick?.();
    };

    return (
        <>
            <Button
                onClick={onClickButton}
                variant='primary'
                className={clsx('text-white rounded-full px-6 md:py-mobile py-2', className)}
            >
                {t('connect_wallet')}
            </Button>
        </>
    );
};

export default ConnectWallet;
