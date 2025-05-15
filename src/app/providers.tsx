"use client"

import { ThemeProvider, createTheme } from '@mui/material/styles'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={darkTheme}>
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  )
}
