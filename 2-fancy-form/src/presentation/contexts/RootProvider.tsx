'use client'

import dynamic from 'next/dynamic'
import { ThemeProvider } from './ThemeProvider'

const ClientProviders = dynamic(() => import('./ClientProviders').then(mod => mod.ClientProviders), {
    ssr: false,
})

export const RootProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <ThemeProvider>
            <ClientProviders>{children}</ClientProviders>
        </ThemeProvider>
    )
}
