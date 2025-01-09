import { Token, TokenBalance } from '@domain/entities/Token'
import { mainnet } from 'viem/chains'

export interface Web3State {
    isConnected: boolean
    address: string | undefined
    chainId: number
    tokens: Token[]
    balances: Record<string, TokenBalance>
    isLoading: boolean
    error: Error | null
}

export interface Web3Actions {
    connect: () => Promise<void>
    disconnect: () => Promise<void>
    switchChain: (chainId: number) => Promise<void>
    refreshBalances: () => Promise<void>
}

export const initialWeb3State: Web3State = {
    isConnected: false,
    address: undefined,
    chainId: mainnet.id,
    tokens: [],
    balances: {},
    isLoading: false,
    error: null,
}
