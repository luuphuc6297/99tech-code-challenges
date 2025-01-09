import { RootProvider } from '@/presentation/contexts/RootProvider'
import { ErrorBoundary } from '@/presentation/components/common/ErrorBoundary'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Fancy Form - Token Swap',
    description: 'A modern token swap interface',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body suppressHydrationWarning>
                <ErrorBoundary>
                    <RootProvider>{children}</RootProvider>
                </ErrorBoundary>
            </body>
        </html>
    )
}
