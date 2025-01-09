import { SwapQuote } from '@domain/entities/Swap'
import { Token } from '@domain/entities/Token'
import { ISwapRepository } from '@domain/repositories/ISwapRepository'

export interface GetSwapQuoteParams {
    fromToken: Token
    toToken: Token
    amount: string
    userAddress: string
}

export class GetSwapQuoteUseCase {
    constructor(private swapRepository: ISwapRepository) {}

    async execute(params: GetSwapQuoteParams): Promise<SwapQuote> {
        try {
            return await this.swapRepository.getQuote(params)
        } catch (error) {
            console.error('Failed to get swap quote:', error)
            throw new Error('Failed to get swap quote. Please try again.')
        }
    }
}
