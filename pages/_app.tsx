import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider, CssBaseline } from '@mui/material'
import { theme } from '@/pages/product/lib/theme';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function App({ Component, pageProps }: AppProps) {

  const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ReactQueryDevtools initialIsOpen={false} />
    <ThemeProvider theme={theme}>
      <CssBaseline /> 
      <Component {...pageProps} />
    </ThemeProvider>
    </LocalizationProvider>
    </QueryClientProvider>

  )
}
