import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

type Props = {
    active?: boolean;
    className?: string;
    href: string;
    children?: React.ReactNode;
    isTarget?: boolean;
};

const NavLink = ({ active, className, href, children, isTarget }: Props) => {
    return (
        <Link
            href={href}
            className={clsx(
                'py-1 px-4 font-medium rounded-full duration-300',
                active ? 'bg-primary-1 text-white' : 'hover:bg-light-1 hover:cursor-pointer',
                className
            )}
            target={isTarget === true ? '_blank' : undefined}
        >
            {children}
        </Link>
    );
};

export default NavLink;
