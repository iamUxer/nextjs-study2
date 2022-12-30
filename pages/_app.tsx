import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../styles/globals.css';
import 'antd/dist/antd.css';
import type { AppProps } from 'next/app';
import AppLayout from '@components/AppLayout';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CLIENT_ID } from 'constants/googleAuth';

import { appContext } from 'context/context';

export default function App({ Component, pageProps }: AppProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { staleTime: Infinity },
    },
  });

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <appContext.Provider value={{ isModalOpen, setIsModalOpen }}>
        <QueryClientProvider client={queryClient}>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </QueryClientProvider>
      </appContext.Provider>
    </GoogleOAuthProvider>
  );
}
