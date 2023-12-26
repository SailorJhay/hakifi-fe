import { formatNumber } from '@/utils/format';
import { USDT_ADDRESS, VNST_ADDRESS } from '@/web3/constants';
import { walletLogos } from '@/web3/wallets';
import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';
import { Address, Connector, useAccount, useBalance } from 'wagmi';

type BalanceItemProps = {
    className?: string;
    contractAddress?: string;
    address: string;
    iconUrl: string;
    connector: Connector;
    symbol: string;
    assetImage?: string;
};

const BalanceItem = ({
    className,
    address,
    contractAddress,
    iconUrl,
    connector,
    symbol,
    assetImage,
}: BalanceItemProps) => {
    const { data } = useBalance({
        address: address as Address,
        token: contractAddress as Address,
    });

    return (
        <div
            className={clsx(
                'flex items-center justify-between rounded-md py-2 px-3',
                className
            )}
        >
            <div className='text-body-14B text-primary-3'>{formatNumber(data?.formatted, 3)} {symbol}</div>
            <div className='flex items-center'>
                {contractAddress &&
                    !!connector.watchAsset &&
                    walletLogos[connector.name] && (
                        <div
                            className='mr-1 h-6 w-6 cursor-pointer p-0.5'
                            onClick={() =>
                                connector.watchAsset?.({
                                    address: contractAddress,
                                    symbol,
                                    decimals: 18,
                                    image: assetImage,
                                })
                            }
                        >
                            <Image
                                width={18}
                                height={18}
                                src={walletLogos[connector.name]}
                                alt='Wallet logo'
                            />
                        </div>
                    )}
                <img src={iconUrl} className='h-8 w-8 rounded-full' alt='Wallet logo' />
            </div>
        </div>
    );
};

const assets = [
    // {
    //     className: 'text-vnst',
    //     contractAddress: VNST_ADDRESS,
    //     iconUrl: '/assets/images/cryptos/vnst.png',
    //     symbol: 'VNST',
    //     assetImage: 'https://vnst.io/assets/images/cryptos/vnst.png',
    // },
    {
        className: 'text-primary',
        contractAddress: USDT_ADDRESS,
        iconUrl: '/assets/images/cryptos/usdt.png',
        symbol: 'USDT',
        assetImage: 'https://tether.to/images/logoMarkGreen.svg',
    },
    {
        className: 'text-vnst',
        contractAddress: undefined,
        iconUrl: '/assets/images/cryptos/vic.png',
        symbol: 'VIC',
    },
];

const Balances = ({ itemClassname }: { itemClassname?: string; }) => {
    const { address, isConnected, connector } = useAccount();
    if (!isConnected || !address || !connector) return null;

    return (
        <div className='my-3 flex flex-col gap-y-3'>
            {assets.map((asset) => (
                <BalanceItem
                    key={asset.symbol}
                    className={clsx(asset.className, itemClassname)}
                    contractAddress={asset.contractAddress}
                    address={address}
                    iconUrl={asset.iconUrl}
                    connector={connector}
                    symbol={asset.symbol}
                    assetImage={asset.assetImage}
                />
            ))}
        </div>
    );
};

export default Balances;
