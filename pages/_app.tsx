import React, { createContext, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../styles/globals.css';
import 'antd/dist/antd.css';
import type { AppProps } from 'next/app';
import AppLayout from '@components/AppLayout';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CLIENT_ID } from 'constants/googleAuth';

type UserAddModalProps = {
  isModalOpen: boolean | undefined;
  setIsModalOpen: (value: boolean) => void;
};

export const UserAddModalContext = createContext<UserAddModalProps>({
  isModalOpen: false,
  setIsModalOpen: () => {},
});

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { staleTime: Infinity },
    },
  });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <UserAddModalContext.Provider value={{ isModalOpen, setIsModalOpen }}>
        <QueryClientProvider client={queryClient}>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </QueryClientProvider>
      </UserAddModalContext.Provider>
    </GoogleOAuthProvider>
  );
}
