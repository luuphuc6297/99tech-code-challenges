'use client'

import { config } from '@config/wagmi'
import { useEffect } from 'react'
import { WagmiProvider, useAccount } from 'wagmi'
import { QueryProvider } from './QueryProvider'
import { SwapProvider } from './SwapContext'
import { Web3ContextProvider } from './Web3Context'

const WalletManager = () => {
    const { address, isConnected } = useAccount()

    useEffect(() => {
        try {
            if (isConnected && address) {
                localStorage.setItem('walletAddress', address)
            } else {
                localStorage.removeItem('walletAddress')
            }
        } catch (error) {
            console.warn('Failed to access localStorage:', error)
        }
    }, [isConnected, address])

    return null
}

export function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <WagmiProvider config={config}>
            <QueryProvider>
                <Web3ContextProvider>
                    <WalletManager />
                    <SwapProvider>{children}</SwapProvider>
                </Web3ContextProvider>
            </QueryProvider>
        </WagmiProvider>
    )
}
