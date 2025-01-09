'use client'

import { ThemeProvider as MuiThemeProvider } from '@mui/material'
import theme from '@styles/theme'
import { ReactNode } from 'react'

interface ThemeProviderProps {
    children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
    return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
}
