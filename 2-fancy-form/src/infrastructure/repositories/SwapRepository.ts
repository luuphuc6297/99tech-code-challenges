import { SwapQuote, SwapTransaction } from '@domain/entities/Swap'
import { Token } from '@domain/entities/Token'
import { ISwapRepository } from '@domain/repositories/ISwapRepository'
import { UniswapService } from '@infra/services/UniswapService'
import { ISwapStrategy } from '@infra/strategies/ISwapStrategy'
import { UniswapStrategy } from '@infra/strategies/UniswapStrategy'
import { parseUnits } from 'viem'

export class SwapRepository implements ISwapRepository {
    private strategy: ISwapStrategy

    constructor() {
        const uniswapService = new UniswapService()
        this.strategy = new UniswapStrategy(uniswapService)
    }

    setStrategy(strategy: ISwapStrategy): void {
        this.strategy = strategy
    }

    async getQuote(params: {
        fromToken: Token
        toToken: Token
        amount: string
        userAddress: string
    }): Promise<SwapQuote> {
        await this.validateTokens(params.fromToken, params.toToken)
        await this.validateAmount(params.amount, params.fromToken)

        return this.strategy.calculateAmountOut({
            ...params,
            slippage: 0.5, // Default slippage
        })
    }

    async executeSwap(quote: SwapQuote): Promise<SwapTransaction> {
        await this.validateQuote(quote)

        const transaction = await this.strategy.executeSwap(quote)

        this.monitorTransaction(transaction.hash)

        return transaction
    }

    async getSwapStatus(txHash: string): Promise<SwapTransaction> {
        return {
            hash: txHash,
            fromAddress: '0x1234...',
            toAddress: '0x5678...',
            quote: {} as SwapQuote,
            status: Math.random() > 0.5 ? 'completed' : 'pending',
            timestamp: Date.now(),
        }
    }

    private async validateTokens(fromToken: Token, toToken: Token): Promise<void> {
        if (fromToken.address === toToken.address) {
            throw new Error('Cannot swap the same token')
        }

        if (fromToken.chainId !== toToken.chainId) {
            throw new Error('Tokens must be on the same chain')
        }
    }

    private async validateAmount(amount: string, token: Token): Promise<void> {
        if (amount === '0' || amount === '1') {
            return
        }

        try {
            const value = parseUnits(amount, token.decimals)
            if (value <= BigInt(0)) {
                throw new Error('Amount must be greater than 0')
            }

            // TODO: Check allowance and balance
        } catch (error) {
            if (error instanceof Error) {
                throw error
            }
            throw new Error('Invalid amount format')
        }
    }

    private async validateQuote(quote: SwapQuote): Promise<void> {
        if (!quote.fromToken || !quote.toToken) {
            throw new Error('Invalid quote: missing tokens')
        }

        if (!quote.fromAmount || !quote.toAmount) {
            throw new Error('Invalid quote: missing amounts')
        }

        if (quote.priceImpact > 15) {
            throw new Error('Price impact too high')
        }
    }

    private async monitorTransaction(txHash: string): Promise<void> {
        // TODO: Implement transaction monitoring
        console.log('Monitoring transaction:', txHash)
    }
}
