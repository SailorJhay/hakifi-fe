import ChevronBottomTriangleIcon from '@/components/common/Icons/ChevronBottomTriangleIcon';
import ClipboardIcon from '@/components/common/Icons/ClipboardIcon';
import ExternalIcon from '@/components/common/Icons/ExternalIcon';
import ShutdownIcon from '@/components/common/Icons/ShutdownIcon';
import { useNotification } from '@/components/common/Notification';
import Popup from '@/components/common/Popup';
import { shortenHexString } from '@/components/home/constant';
import { Button } from '@/components/ui/button';
import useDisconnectWallet from '@/hooks/useDisconnectWallet';
import { copyToClipboard } from '@/utils/helpers';
import { walletLogos } from '@/web3/wallets';
import { Separator } from '@radix-ui/react-separator';
import Image from 'next/image';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useAccount } from 'wagmi';
import Balances from './Balances';
import ShortAddress from './ShortAddress';
import clsx from 'clsx';
import colors from '@/colors';

const Profile = () => {
  const notifications = useNotification();
  const [toggle, setToggle] = useState<boolean>(false);
  const { address, connector } = useAccount();
  const { disconnect } = useDisconnectWallet();
  const shortAddress = useMemo(
    () => shortenHexString(address as string, 5, 4),
    [address]
  );
  const handleToggle = useCallback(() => {
    setToggle(pre => !pre);
  }, []);
  const copyTooltipRef = useRef<any>();
  const handleCopy = () => {
    copyToClipboard(address as string);
    copyTooltipRef.current?.toggle(true);

    notifications.success("Copied");
  };
  const handleDisconnect = () => {
    disconnect()
  }

  return (
    <Popup
      isOpen={toggle}
      handleOnChangeStatus={handleToggle}
      content={
        <section>
          <section
            className={clsx('flex items-center justify-between')}
          >
            <div className='flex items-center justify-center'>
              {connector ? (
                <Image
                  width={32}
                  height={32}
                  className="mr-2"
                  src={walletLogos[connector.name]}
                  alt={connector.name}
                />
              ) : null}
              <div
                className='flex flex-1 cursor-pointer items-center'
              >
                <div className='text-button-14B text-primary-3 mr-2'>
                  {shortAddress}
                </div>
                <div className='flex items-center'>
                  <Button
                    className='mr-2'
                    onClick={handleCopy}
                  >
                    <ClipboardIcon className='h-5 w-5' />
                  </Button>
                  <ExternalIcon className='h-5 w-5' />
                </div>
              </div>
            </div>
            <Button onClick={handleDisconnect}>
              <ShutdownIcon className='h-5 w-5' />
            </Button>
          </section>
          <Separator className="my-3" />
          <Balances itemClassname='bg-light-2' />
        </section>
      }
      classContent="left-4"
    >
      <ShortAddress
        toggle={toggle}
        afterIcon={<ChevronBottomTriangleIcon
          className={clsx('duration-200 ease-linear transition-all', toggle ? 'rotate-180' : 'rotate-0')}
          color={toggle ? colors.primary[1] : colors.grey[1]}
        />}
      />
    </Popup>
  );
};

export default Profile;
