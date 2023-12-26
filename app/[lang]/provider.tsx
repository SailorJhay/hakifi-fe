"use client";

import ErrorBoundary from '@/components/common/ErrorBoundary';
import { Notifications } from '@/components/common/Notification';
import WagmiProvider from '@/web3/WagmiProvider';
// import { ThemeProvider } from "next-themes";
import dynamic from 'next/dynamic';
import React from 'react';

const ProgressBar = dynamic(
  () => import('next-nprogress-bar').then((result) => result.AppProgressBar),
  { ssr: false }
);

export function Providers({ children }: { children: React.ReactNode; }) {
  return (
    // Uncomment khi làm light and dark mode
    // <ThemeProvider attribute="class">
    <ErrorBoundary>

      <Notifications>
        <ProgressBar
          height='2px'
          color='#5563F7'
          options={{ showSpinner: false }}
          shallowRouting
        />
        <WagmiProvider>{children}</WagmiProvider>
      </Notifications>
    </ErrorBoundary>
    // </ThemeProvider>
  );
}
