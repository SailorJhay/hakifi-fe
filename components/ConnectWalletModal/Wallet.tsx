import clsx from "clsx";
import Image from "next/image";
import { Connector } from "wagmi";
import { Button } from "../ui/button";

type TWallet = {
    logoUrl: string;
    connector: Connector;
    active?: boolean;
    onClick: () => void;
    disabled?: boolean;
    className?: string;
};

const Wallet = ({
    logoUrl,
    connector,
    active = false,
    onClick,
    disabled,
    className,
}: TWallet) => {
    return (
        <Button
            className={clsx(
                'px-3 py-2 flex justify-start items-center rounded-full text-grey-1 hover:text-primary-3 bg-light-2',
                active && !disabled && 'bg-light-1 text-primary-3 border-[1px] border-primary-1',
                className
            )}
            disabled={disabled}
            onClick={onClick}
        >
            <Image
                width={32}
                height={32}
                src={logoUrl}
                alt={connector.name}
                className='mr-2'
            />
            <div className="text-body-14B">{connector.name}</div>
        </Button>
    );
};

export default Wallet;