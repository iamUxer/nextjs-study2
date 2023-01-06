import React, { useState } from 'react';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppLayout from '@components/AppLayout';
import { SessionProvider } from 'next-auth/react';
import { AppContext } from 'context/context';
import '../styles/globals.css';
import 'antd/dist/antd.css';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { staleTime: Infinity },
    },
  });

  return (
    // <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <SessionProvider session={session}>
      <AppContext.Provider value={{ isModalOpen, setIsModalOpen }}>
        <QueryClientProvider client={queryClient}>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </QueryClientProvider>
      </AppContext.Provider>
    </SessionProvider>
    // </GoogleOAuthProvider>
  );
}
