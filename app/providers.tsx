'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';


export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (

    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </Provider>
    </QueryClientProvider>
  );
}
