import { Token } from './Token'

export interface SwapFee {
    amount: string
    token: Token
}

export interface SwapQuote {
    fromToken: Token
    toToken: Token
    fromAmount: string
    toAmount: string
    exchangeRate: number
    priceImpact: number
    route: string[]
    userAddress: string
    minAmountOut: string
}

export interface SwapTransaction {
    hash: string
    fromAddress: string
    toAddress: string
    quote: SwapQuote
    status: 'pending' | 'completed' | 'failed'
    timestamp: number
}
