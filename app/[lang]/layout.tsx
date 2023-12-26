/* eslint-disable react-hooks/rules-of-hooks */
import Layout from '@/components/layout';
import { sfProExpandedFont, sfProFont } from '@/configs/fonts';
import { useTranslation } from '@/i18n';
import { languages } from '@/i18n/settings';
import '@/styles/globals.scss';
import clsx from 'clsx';
import { dir } from 'i18next';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import React from 'react';
import { Providers } from './provider';
import StyledComponentsRegistry from '@/lib/registry';
import Script from 'next/script';
import Auth from '@/components/auth/Auth';

const ConnectWalletModal = dynamic(() => import('@/components/ConnectWalletModal'), {
  ssr: false,
});

type Props = {
  children: React.ReactNode;
  params: { lang: string; };
};

export const generateMetadata = async ({
  params: { lang },
}: Props): Promise<Metadata> => {
  const { t } = await useTranslation(lang, 'common');

  return {
    title:
      'Hakifi',
    description: t('description')
  };
};

export default function RootLayout({
  children,
  params: { lang },
}: Props) {

  if (!languages.includes(lang)) {
    notFound();
  }

  return (
    <html lang={lang} dir={dir(lang)}>
      <body className={clsx(
        sfProFont.variable,
        sfProExpandedFont.variable,
        'font-sf-pro text-grey-1'
      )}>
        <Providers>
          <ConnectWalletModal />
          <StyledComponentsRegistry>
            <Layout lang={lang}>{children}</Layout>
            <Auth />
          </StyledComponentsRegistry>
        </Providers>
      </body>
    </html>
  );
}
