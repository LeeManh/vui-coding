"use client";

import React from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/shared/Sonner";
import { ErrorRes } from "@/types/common";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { AuthProvider } from "@/contexts/auth-context";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { ThemeProvider } from "@/contexts/theme-context";

dayjs.extend(relativeTime);

const queryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
    mutations: {
      onError(error) {
        const axiosError = error as AxiosError<ErrorRes>;
        toast.error(axiosError.response?.data?.message);
      },
    },
  },
});

const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster richColors />
    </QueryClientProvider>
  );
};

export default ClientWrapper;
