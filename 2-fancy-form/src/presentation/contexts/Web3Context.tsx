'use client'

import { Token, TokenBalance } from '@domain/entities/Token'
import { TokenRepository } from '@infra/repositories/TokenRepository'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ReactNode, createContext, useContext } from 'react'
import { useAccount, useChainId, useConnect, useDisconnect, useSwitchChain } from 'wagmi'
import { ERROR_MESSAGES } from './constants'

interface Web3ContextType {
    address?: string
    isConnected: boolean
    isLoading: boolean
    error: Error | null
    chainId: number
    connect: () => Promise<void>
    disconnect: () => Promise<void>
    switchChain: (chainId: number) => Promise<void>
    tokens: Token[]
    balances: Record<string, TokenBalance>
    refreshBalances: () => void
}

const defaultContext: Web3ContextType = {
    isConnected: false,
    isLoading: false,
    error: null,
    chainId: 1,
    connect: async () => {},
    disconnect: async () => {},
    switchChain: async () => {},
    tokens: [],
    balances: {},
    refreshBalances: () => {},
}

const Web3Context = createContext<Web3ContextType>(defaultContext)

export function Web3ContextProvider({ children }: { children: ReactNode }) {
    const { address, isConnected } = useAccount()
    const { connectAsync, connectors } = useConnect()
    const { disconnectAsync } = useDisconnect()
    const chainId = useChainId()
    const { switchChainAsync } = useSwitchChain()

    const tokenRepository = new TokenRepository()

    // Query for tokens
    const { data: tokens = [] } = useQuery({
        queryKey: ['tokens', chainId],
        queryFn: () => tokenRepository.getTokens(chainId || 1),
        enabled: !!chainId,
    })

    // Query for balances
    const { data: balances = {}, refetch: refreshBalances } = useQuery({
        queryKey: ['balances', address, chainId],
        queryFn: async () => {
            if (!address || !isConnected) return {}

            const balances: Record<string, TokenBalance> = {}
            await Promise.all(
                tokens.map(async (token) => {
                    const balance = await tokenRepository.getTokenBalance(address, token)
                    balances[token.address] = balance
                })
            )
            return balances
        },
        enabled: !!address && isConnected && tokens.length > 0,
    })

    // Mutation for connecting wallet
    const connectMutation = useMutation({
        mutationFn: async () => {
            const connector = connectors.find((c: { id: string }) => {
                return c.id === 'metaMaskSDK'
            })
            if (!connector) throw new Error('MetaMask not found')
            await connectAsync({ connector })
        },
    })

    // Mutation for disconnecting wallet
    const disconnectMutation = useMutation({
        mutationFn: async () => {
            await disconnectAsync()
        },
    })

    // Mutation for switching chain
    const switchChainMutation = useMutation({
        mutationFn: async (targetChainId: number) => {
            await switchChainAsync({ chainId: targetChainId })
        },
    })

    const value: Web3ContextType = {
        address,
        isConnected,
        isLoading:
            connectMutation.isPending ||
            disconnectMutation.isPending ||
            switchChainMutation.isPending,
        error: connectMutation.error || disconnectMutation.error || switchChainMutation.error,
        chainId: chainId || 1,
        connect: () => connectMutation.mutateAsync(),
        disconnect: () => disconnectMutation.mutateAsync(),
        switchChain: (chainId: number) => switchChainMutation.mutateAsync(chainId),
        tokens,
        balances,
        refreshBalances: () => {
            refreshBalances()
        },
    }

    return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>
}

export function useWeb3() {
    const context = useContext(Web3Context)
    if (context === undefined) {
        throw new Error(ERROR_MESSAGES.WEB3_CONTEXT)
    }
    return context
}
