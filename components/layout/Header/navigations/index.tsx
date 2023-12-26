"use client";

import { navigations } from '@/configs/navigations';
import React from 'react';
import NavLink from './NavLink';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useTranslationClient } from '@/i18n/client';
import useLang from '@/hooks/useLang';
import { directWhitepaperPage } from '@/components/common/utils/header';

type Props = {
  className?: string;
};

const Navigation = ({ className }: Props) => {
  const lang = useLang();
  const pathname = usePathname();
  const { t } = useTranslationClient('navigation');

  return (
    <div
      className={clsx(
        'box-radius p-1 bg-light-2 hidden items-center lg:flex',
        className
      )}
    >
      {navigations.map((nav) => {
        let localeHref = `/${lang}${nav.href}`;
        if (localeHref.endsWith('/'))
          localeHref = localeHref.slice(0, localeHref.length - 1);
        const isActive =
          nav.href === pathname || pathname.startsWith(localeHref);
        return (
          <NavLink
            key={nav.title}
            href={nav?.blank ? directWhitepaperPage(lang) : localeHref}
            active={isActive}
            className='px-2 py-2'
            isTarget={nav.blank}
          >
            {t(nav.title)}
          </NavLink>
        );
      })}
    </div>
  );
};

export default Navigation;
