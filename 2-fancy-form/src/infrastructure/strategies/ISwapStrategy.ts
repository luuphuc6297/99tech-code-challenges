import { SwapQuote, SwapTransaction } from '@domain/entities/Swap'
import { Token } from '@domain/entities/Token'

export interface SwapCalculationParams {
    fromToken: Token
    toToken: Token
    amount: string
    userAddress: string
    slippage: number
}

export interface ISwapStrategy {
    calculateAmountOut(params: SwapCalculationParams): Promise<SwapQuote>
    executeSwap(quote: SwapQuote): Promise<SwapTransaction>
} 