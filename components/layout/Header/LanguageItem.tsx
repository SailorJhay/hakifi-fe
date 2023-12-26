import clsx from 'clsx';
import Image from 'next/image';
import { DropdownMenuCheckboxItem } from '../../ui/dropdown-menu';

const LanguageItem = ({
    title,
    active = false,
    className,
    onClick,
    lang,
}: {
    title: string;
    active?: boolean;
    className?: string;
    onClick?: () => void;
    lang: string;
}) => {
    return (
        <DropdownMenuCheckboxItem
            checked={active}
            onCheckedChange={onClick}
            className={clsx(
                'hover:bg-black-border-gradient cursor-pointer overflow-hidden rounded-[10px] border border-transparent font-semibold',
                className
            )}
        >
            <div className='p-2 w-full'>
                <div
                    className={clsx(
                        active && 'text-gradient',
                        'flex flex-nowrap items-center justify-between'
                    )}
                >
                    <div>{title}</div>
                    {lang === 'vi' ? (
                        <Image
                            src={`@/assets/images/lang/vi.svg`}
                            width={20}
                            height={20}
                            alt='Language image'
                        />
                    ) : (
                        <Image
                            src={`@/assets/images/lang/en.svg`}
                            width={20}
                            height={20}
                            alt='Language image'
                        />
                    )}
                </div>
            </div>
        </DropdownMenuCheckboxItem>
    );
};

export default LanguageItem;
