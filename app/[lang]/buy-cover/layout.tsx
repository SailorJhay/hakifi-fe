/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import '@/styles/globals.scss';
import Script from 'next/script';
import React from 'react';

type Props = {
  children: React.ReactNode;
  params: { lang: string; };
};

export default function RootLayout({
  children,
  params: { lang },
}: Props) {

  return (
    <>
      <Script
        src="/assets/tradingview/datafeeds/udf/dist/bundle.js"
        // beforeInteractive
        onReady={() => { console.log('Ready'); }}
      />
      {children}
    </>
  );
}
