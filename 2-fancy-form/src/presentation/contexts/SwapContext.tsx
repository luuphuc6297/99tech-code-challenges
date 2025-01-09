'use client'

import { createSwapUseCases } from '@application/useCases'
import { Token, TokenBalance } from '@domain/entities/Token'
import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react'

import { useWeb3 } from './Web3Context'

interface SwapContextType {
    fromToken: Token | null
    toToken: Token | null
    fromAmount: string
    toAmount: string
    fromTokenPrice: number | null
    toTokenPrice: number | null
    fromTokenBalance: TokenBalance | null
    exchangeRate: number | null
    priceImpact: number | null
    slippage: number
    setSlippage: (value: number) => void
    setFromToken: (token: Token | null) => void
    setToToken: (token: Token | null) => void
    setFromAmount: (amount: string) => void
    setToAmount: (amount: string) => void
    swap: () => Promise<void>
    isLoading: boolean
    error: string | undefined
    // validateAmount: (amount: string, token: Token) => string | undefined
}

const defaultContext: SwapContextType = {
    fromToken: null,
    toToken: null,
    fromAmount: '0',
    toAmount: '0',
    fromTokenPrice: null,
    toTokenPrice: null,
    fromTokenBalance: null,
    exchangeRate: null,
    priceImpact: null,
    slippage: 0.5,
    setSlippage: () => {},
    setFromToken: () => {},
    setToToken: () => {},
    setFromAmount: () => {},
    setToAmount: () => {},
    swap: async () => {},
    isLoading: false,
    error: undefined,
}

const SwapContext = createContext<SwapContextType>(defaultContext)

export function SwapProvider({ children }: { children: ReactNode }) {
    const { address } = useWeb3()
    const [fromToken, setFromToken] = useState<Token | null>(null)
    const [toToken, setToToken] = useState<Token | null>(null)
    const [fromAmount, setFromAmount] = useState<string>('0')
    const [toAmount, setToAmount] = useState<string>('0')

    const [fromTokenPrice, setFromTokenPrice] = useState<number | null>(null)
    const [toTokenPrice, setToTokenPrice] = useState<number | null>(null)

    const [fromTokenBalance, setFromTokenBalance] = useState<TokenBalance | null>(null)

    const [exchangeRate, setExchangeRate] = useState<number | null>(null)
    const [priceImpact, setPriceImpact] = useState<number | null>(null)
    const [slippage, setSlippage] = useState(0.5) // Default 0.5%
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | undefined>()

    const swapUseCases = useMemo(() => createSwapUseCases(), [])

    const updateQuote = useCallback(async () => {
        if (!fromToken || !toToken || !address) {
            setToAmount('0')
            setExchangeRate(null)
            setPriceImpact(null)
            return
        }

        const amount = fromAmount || '1'

        try {
            setIsLoading(true)
            setError(undefined)
            const quote = await swapUseCases.getSwapQuote.execute({
                fromToken,
                toToken,
                amount,
                userAddress: address,
            })

            if (fromAmount) {
                const maxAllowedAmount = parseFloat(fromAmount) * 1.5
                const gasFee = 0.01
                const finalMaxAmount = maxAllowedAmount - gasFee

                if (parseFloat(quote.toAmount) > finalMaxAmount) {
                    setError('Amount exceeds maximum allowed (including gas fee)')
                    setToAmount('0')
                    return
                }

                setToAmount(quote.toAmount)
            }

            setExchangeRate(quote.exchangeRate)
            setPriceImpact(quote.priceImpact)
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError('Failed to get quote. Please try again.')
            }
        } finally {
            setIsLoading(false)
        }
    }, [fromToken, toToken, fromAmount, address, swapUseCases])

    useEffect(() => {
        updateQuote()
    }, [updateQuote])

    const handleFromTokenChange = useCallback((token: Token | null) => {
        setFromToken(token)
        setFromTokenPrice(null)
        setFromTokenBalance(null)
        setToAmount('0')
    }, [])

    const handleToTokenChange = useCallback((token: Token | null) => {
        setToToken(token)
        setToTokenPrice(null)
        setToAmount('0')
    }, [])

    const handleFromAmountChange = useCallback((amount: string) => {
        setFromAmount(amount)
        setToAmount('0')
    }, [])

    const handleToAmountChange = useCallback((amount: string) => {
        setToAmount(amount)
    }, [])

    const swap = async () => {
        if (!fromToken || !toToken || !fromAmount || !address) {
            return
        }
        // TODO: Implement logic swap here
    }

    const value: SwapContextType = {
        fromToken,
        toToken,
        fromAmount,
        toAmount,
        fromTokenPrice,
        toTokenPrice,
        fromTokenBalance,
        exchangeRate,
        priceImpact,
        slippage,
        setSlippage,
        setFromToken: handleFromTokenChange,
        setToToken: handleToTokenChange,
        setFromAmount: handleFromAmountChange,
        setToAmount: handleToAmountChange,
        swap,
        isLoading,
        error,
    }

    return <SwapContext.Provider value={value}>{children}</SwapContext.Provider>
}

export function useSwap() {
    const context = useContext(SwapContext)
    if (context === undefined) {
        throw new Error('useSwap must be used within a SwapProvider')
    }
    return context
}
