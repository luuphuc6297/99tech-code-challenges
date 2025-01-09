import { SwapQuote, SwapTransaction } from '@domain/entities/Swap'
import { Token } from '@domain/entities/Token'

export interface QuoteParams {
    fromToken: Token
    toToken: Token
    amount: string
    userAddress: string
}

export interface ISwapRepository {
    getQuote(params: QuoteParams): Promise<SwapQuote>
    executeSwap(quote: SwapQuote): Promise<SwapTransaction>
    getSwapStatus(txHash: string): Promise<SwapTransaction>
}
