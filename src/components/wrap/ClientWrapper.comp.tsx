"use client";

import React, { useEffect } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/shared/Sonner";
import { ErrorRes } from "@/types/common";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { AuthProvider } from "@/contexts/auth-context";
import dayjs from "@/lib/dayjs";
import { ThemeProvider } from "@/contexts/theme-context";
import { useLocale } from "next-intl";

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
  const locale = useLocale();

  useEffect(() => {
    dayjs.locale(locale);
  }, [locale]);

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
