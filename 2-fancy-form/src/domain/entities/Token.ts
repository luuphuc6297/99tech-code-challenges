export interface Token {
    address: string
    symbol: string
    name: string
    decimals: number
    chainId: number
    logoURI: string
    tags?: string[]
    extensions?: {
        [key: string]: string | number | boolean | null
    }
}

export interface TokenList {
    name: string
    timestamp: string
    version: {
        major: number
        minor: number
        patch: number
    }
    tokens: Token[]
    keywords?: string[]
    logoURI?: string
}

export interface TokenPrice {
    currency: string
    price: number
    date: string
}

export interface TokenBalance {
    balance: string
    balanceUsd: number
    usdValue?: number
}
