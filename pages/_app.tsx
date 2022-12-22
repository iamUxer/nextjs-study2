import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../styles/globals.css';
import 'antd/dist/antd.css';
import type { AppProps } from 'next/app';
import AppLayout from '@components/AppLayout';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { staleTime: Infinity },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </QueryClientProvider>
  );
}
