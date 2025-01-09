import { SwapRepository } from '@infra/repositories/SwapRepository'
import { ExecuteSwapUseCase } from './ExecuteSwapUseCase'
import { GetSwapQuoteUseCase } from './GetSwapQuoteUseCase'

export function createSwapUseCases() {
    const swapRepository = new SwapRepository()

    return {
        getSwapQuote: new GetSwapQuoteUseCase(swapRepository),
        executeSwap: new ExecuteSwapUseCase(swapRepository),
    }
}
