import { SwapQuote, SwapTransaction } from '@domain/entities/Swap'
import { UniswapService } from '@infra/services/UniswapService'
import { formatUnits, parseUnits } from 'viem'
import { ISwapStrategy, SwapCalculationParams } from './ISwapStrategy'

export class UniswapStrategy implements ISwapStrategy {
    constructor(private readonly uniswapService: UniswapService) {}

    async calculateAmountOut(params: SwapCalculationParams): Promise<SwapQuote> {
        const { route } = await this.uniswapService.getAmountsOut({
            tokenIn: params.fromToken,
            tokenOut: params.toToken,
            amountIn: parseUnits(params.amount, params.fromToken.decimals).toString(),
            recipient: params.userAddress,
            slippage: 0.5,
        })

        const toAmount = formatUnits(BigInt(route.quote.toString()), params.toToken.decimals)

        return {
            fromToken: params.fromToken,
            toToken: params.toToken,
            fromAmount: params.amount,
            toAmount,
            exchangeRate: parseFloat(toAmount) / parseFloat(params.amount),
            priceImpact: Number(route.estimatedGasUsedQuoteToken.toFixed(2)),
            route: [params.fromToken.address, params.toToken.address],
            userAddress: params.userAddress,
            minAmountOut: formatUnits(
                BigInt(route.quote.multiply(95).divide(100).toString()),
                params.toToken.decimals
            ),
        }
    }

    async executeSwap(quote: SwapQuote): Promise<SwapTransaction> {
        const { route } = await this.uniswapService.getAmountsOut({
            tokenIn: quote.fromToken,
            tokenOut: quote.toToken,
            amountIn: parseUnits(quote.fromAmount, quote.fromToken.decimals).toString(),
            recipient: quote.userAddress,
            slippage: 0.5,
        })

        const calldata = await this.uniswapService.buildSwapTransaction({
            route,
            recipient: quote.userAddress,
            slippage: 0.5,
        })

        return {
            hash: calldata,
            fromAddress: quote.userAddress,
            toAddress: quote.userAddress,
            quote,
            status: 'pending',
            timestamp: Date.now(),
        }
    }
}
