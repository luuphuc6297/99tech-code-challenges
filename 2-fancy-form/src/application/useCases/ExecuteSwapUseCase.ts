import { SwapQuote, SwapTransaction } from '@domain/entities/Swap'
import { ISwapRepository } from '@domain/repositories/ISwapRepository'
import { formatUnits, parseUnits } from 'viem'

export interface ExecuteSwapParams {
    quote: SwapQuote
    slippage: number
}

export class ExecuteSwapUseCase {
    constructor(private swapRepository: ISwapRepository) {}

    async execute({ quote, slippage }: ExecuteSwapParams): Promise<SwapTransaction> {
        try {
            // Calculate min amount out based on slippage
            const minAmountOut = (parseUnits(quote.toAmount, quote.toToken.decimals) *
                BigInt(Math.floor((100 - slippage) * 100))) /
                BigInt(10000)

            const quoteWithSlippage: SwapQuote = {
                ...quote,
                minAmountOut: formatUnits(minAmountOut, quote.toToken.decimals),
            }

            const transaction = await this.swapRepository.executeSwap(quoteWithSlippage)
            return transaction
        } catch (error) {
            console.error('Failed to execute swap:', error)
            throw new Error('Failed to execute swap. Please try again.')
        }
    }

    async getStatus(txHash: string): Promise<SwapTransaction> {
        try {
            return await this.swapRepository.getSwapStatus(txHash)
        } catch (error) {
            console.error('Failed to get swap status:', error)
            throw new Error('Failed to get swap status. Please try again.')
        }
    }
}
