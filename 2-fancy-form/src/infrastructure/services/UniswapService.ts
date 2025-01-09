import { ENV } from '@config/env'
import { Token } from '@domain/entities/Token'
import { JsonRpcProvider } from '@ethersproject/providers'
import { CurrencyAmount, Percent, TradeType, Token as UniToken } from '@uniswap/sdk-core'
import { AlphaRouter } from '@uniswap/smart-order-router/build/main/routers'
import { SwapRoute } from '@uniswap/smart-order-router/build/main/routers/router'
import { mainnet } from 'viem/chains'

export class UniswapService {
    private router: AlphaRouter
    private provider: JsonRpcProvider

    constructor() {
        const rpcUrl = `${ENV.RPC_URLS.ETHEREUM}/${ENV.API_KEYS.ALCHEMY_API_KEY}`
        this.provider = new JsonRpcProvider(rpcUrl)
        this.router = new AlphaRouter({
            chainId: mainnet.id,
            provider: this.provider,
        })
    }

    private convertToUniswapToken(token: Token): UniToken {
        return new UniToken(
            token.chainId,
            token.address as `0x${string}`,
            token.decimals,
            token.symbol,
            token.name
        )
    }

    async getAmountsOut(params: {
        tokenIn: Token
        tokenOut: Token
        amountIn: string
        recipient: string
        slippage: number
    }): Promise<{
        amountOut: CurrencyAmount<UniToken>
        route: SwapRoute
        priceImpact: Percent
    }> {
        const tokenIn = this.convertToUniswapToken(params.tokenIn)
        const tokenOut = this.convertToUniswapToken(params.tokenOut)
        const amount = CurrencyAmount.fromRawAmount(tokenIn, params.amountIn)

        const route = await this.router.route(amount, tokenOut, TradeType.EXACT_INPUT, {
            recipient: params.recipient as `0x${string}`,
            slippageTolerance: new Percent(Math.floor(params.slippage * 100), 10_000),
            deadline: Math.floor(Date.now() / 1000 + 1800),
        })

        if (!route) {
            throw new Error('No route found')
        }

        return {
            amountOut: route.quote as CurrencyAmount<UniToken>,
            route: route,
            priceImpact: new Percent(
                route.estimatedGasUsedQuoteToken.numerator,
                route.estimatedGasUsedQuoteToken.denominator
            ),
        }
    }

    async buildSwapTransaction(params: {
        route: SwapRoute
        recipient: string
        slippage: number
    }): Promise<`0x${string}`> {
        const { calldata } = params.route.methodParameters || {}

        if (!calldata) {
            throw new Error('No calldata found in route')
        }

        return calldata as `0x${string}`
    }
}
