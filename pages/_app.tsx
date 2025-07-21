import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider, CssBaseline } from '@mui/material'
import { theme } from '@/pages/product/lib/theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> 
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
