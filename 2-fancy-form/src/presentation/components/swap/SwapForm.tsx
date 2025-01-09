'use client'

import {
    IconButtonStyled,
    InfoContainer,
    SwapButton,
    SwapContainer,
    TokenAmountInput,
    TokenInputContainer,
    TokenSelector,
} from '@/presentation/styles/components/SwapForm.styles'
import { useSwap } from '@contexts/SwapContext'
import { useWeb3 } from '@contexts/Web3Context'
import { Token } from '@domain/entities/Token'
import { yupResolver } from '@hookform/resolvers/yup'
import { KeyboardArrowDown, Settings, SwapVert } from '@mui/icons-material'
import { Box, Stack, Typography } from '@mui/material'
import { formatBalance, formatNumber, formatUSD } from '@utils/format'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { swapFormSchema } from './schema'
import { SwapSettings } from './SwapSettings'
import { TokenSelectDialog } from './TokenSelectDialog'
import { WalletInfo } from './WalletInfo'

const validateNumberInput = (value: string): boolean => {
    return /^\d*\.?\d*$/.test(value)
}

export function SwapForm() {
    const { isConnected, balances, tokens } = useWeb3()
    const {
        fromToken,
        toToken,
        setFromToken,
        setToToken,
        fromAmount,
        setFromAmount,
        toAmount,
        setToAmount,
        fromTokenPrice,
        toTokenPrice,
        exchangeRate,
        priceImpact,
        slippage,
        setSlippage,
        swap,
        isLoading,
    } = useSwap()

    const [showSettings, setShowSettings] = useState(false)
    const [selectingToken, setSelectingToken] = useState<'from' | 'to' | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: yupResolver(swapFormSchema),
        defaultValues: {
            fromAmount: '',
            toAmount: '',
            fromToken: null,
            balance: null,
        },
        values: {
            fromAmount,
            toAmount,
            fromToken,
            balance: balances,
        },
        mode: 'onChange',
    })

    useEffect(() => {
        setValue('fromToken', fromToken)
        setValue('balance', balances)
    }, [fromToken, balances, setValue])

    const handleSwap = handleSubmit(async (data) => {
        console.log('data', data)
        try {
            await swap()
        } catch (err) {
            console.error('Swap failed:', err)
        }
    })

    const handleSwitchTokens = () => {
        const tempFromToken = fromToken
        const tempFromAmount = fromAmount

        setFromToken(toToken)
        setFromAmount(toAmount.toString())
        setToToken(tempFromToken)
        setToAmount(tempFromAmount.toString())

        setValue('fromAmount', toAmount)
    }

    const handleSelectToken = (token: Token) => {
        if (selectingToken === 'from') {
            setFromToken(token)
        } else if (selectingToken === 'to') {
            setToToken(token)
        }
        setSelectingToken(null)
    }

    const fromTokenUsdValue =
        fromTokenPrice && fromAmount
            ? formatUSD(parseFloat(fromAmount.toString()) * fromTokenPrice)
            : undefined

    const toTokenUsdValue =
        toTokenPrice && toAmount
            ? formatUSD(parseFloat(toAmount.toString()) * toTokenPrice)
            : undefined

    const showExchangeRate = fromToken && toToken
    const exchangeRateDisplay = showExchangeRate
        ? `1 ${fromToken.symbol} = ${formatNumber(exchangeRate || 0, { decimals: 6 })} ${
              toToken.symbol
          }`
        : undefined

    const showPriceImpact = fromToken && toToken
    const priceImpactColor = showPriceImpact
        ? (priceImpact || 0) > 5
            ? '#EF4444' // red
            : (priceImpact || 0) > 3
            ? '#F59E0B' // yellow
            : '#22C55E' // green
        : undefined

    const fromTokenBalance = fromToken ? balances[fromToken.address] : undefined
    const toTokenBalance = toToken ? balances[toToken.address] : undefined

    const hasZeroBalance = fromTokenBalance && parseFloat(fromTokenBalance.balance) === 0

    const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (value === '' || validateNumberInput(value)) {
            register('fromAmount').onChange(e)
            setFromAmount(value)
        }
    }

    const handleToAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (value === '' || validateNumberInput(value)) {
            register('toAmount').onChange(e)
            setToAmount(value)
        }
    }

    return (
        <SwapContainer>
            <Stack spacing={3}>
                <Box
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                >
                    <Typography variant="h6" fontWeight={600}>
                        Swap
                    </Typography>
                    <IconButtonStyled onClick={() => setShowSettings(true)}>
                        <Settings />
                    </IconButtonStyled>
                </Box>

                <WalletInfo />

                <Stack spacing={2} component="form" onSubmit={handleSwap}>
                    <TokenInputContainer>
                        <Typography color="textSecondary" mb={1}>
                            From
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <TokenAmountInput
                                variant="standard"
                                placeholder="0.0"
                                {...register('fromAmount')}
                                onChange={handleFromAmountChange}
                                value={fromAmount}
                                disabled={!isConnected || hasZeroBalance || !fromToken}
                                error={!!errors.fromAmount}
                            />
                            <TokenSelector
                                onClick={() => setSelectingToken('from')}
                                endIcon={<KeyboardArrowDown />}
                            >
                                <Stack direction="row" spacing={1} alignItems="center">
                                    {fromToken && (
                                        <>
                                            <Image
                                                src={fromToken.logoURI}
                                                alt={fromToken.symbol}
                                                width={24}
                                                height={24}
                                                style={{ borderRadius: '50%' }}
                                            />
                                            <Typography>{fromToken.symbol}</Typography>
                                        </>
                                    )}
                                    {/* {!fromToken && <Typography>Select Token</Typography>} */}
                                </Stack>
                            </TokenSelector>
                        </Box>
                        {errors.fromAmount && (
                            <Typography color="error" variant="caption" sx={{ mt: 1 }}>
                                {errors.fromAmount.message}
                            </Typography>
                        )}
                        {hasZeroBalance && (
                            <Typography color="warning.main" variant="caption" sx={{ mt: 1 }}>
                                Your balance is 0
                            </Typography>
                        )}
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{ mt: 1, minHeight: 20 }}
                        >
                            {fromTokenUsdValue && (
                                <Typography color="textSecondary">≈ {fromTokenUsdValue}</Typography>
                            )}
                            {fromTokenBalance && (
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    alignItems="center"
                                    justifyContent="space-between"
                                    width="100%"
                                >
                                    <Typography color="textSecondary">
                                        Balance: {formatBalance(fromTokenBalance.balance)}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        (≈ {formatUSD(fromTokenBalance.balanceUsd)})
                                    </Typography>
                                </Stack>
                            )}
                        </Stack>
                    </TokenInputContainer>

                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <IconButtonStyled
                            onClick={handleSwitchTokens}
                            disabled={!fromToken || !toToken}
                        >
                            <SwapVert />
                        </IconButtonStyled>
                    </Box>

                    <TokenInputContainer>
                        <Typography color="textSecondary" mb={1}>
                            To
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <TokenAmountInput
                                variant="standard"
                                placeholder="0.0"
                                {...register('toAmount')}
                                onChange={handleToAmountChange}
                                value={toAmount}
                                disabled={!isConnected || !toToken}
                                error={!!errors.toAmount}
                            />
                            <TokenSelector
                                onClick={() => setSelectingToken('to')}
                                endIcon={<KeyboardArrowDown />}
                            >
                                <Stack direction="row" spacing={1} alignItems="center">
                                    {toToken && (
                                        <>
                                            <Image
                                                src={toToken.logoURI}
                                                alt={toToken.symbol}
                                                width={24}
                                                height={24}
                                                style={{ borderRadius: '50%' }}
                                            />
                                            <Typography>{toToken.symbol}</Typography>
                                        </>
                                    )}
                                </Stack>
                            </TokenSelector>
                        </Box>
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{ mt: 1, minHeight: 20 }}
                        >
                            {toTokenUsdValue && (
                                <Typography color="textSecondary">≈ {toTokenUsdValue}</Typography>
                            )}
                            {toTokenBalance && (
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    alignItems="center"
                                    justifyContent="space-between"
                                    width="100%"
                                >
                                    <Typography color="textSecondary">
                                        Balance: {formatBalance(toTokenBalance.balance)}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        (≈ {formatUSD(toTokenBalance.balanceUsd)})
                                    </Typography>
                                </Stack>
                            )}
                        </Stack>
                    </TokenInputContainer>

                    <InfoContainer>
                        <Stack spacing={1}>
                            {showExchangeRate && (
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography color="textSecondary">Exchange Rate</Typography>
                                    <Typography>{exchangeRateDisplay}</Typography>
                                </Box>
                            )}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography color="textSecondary">Network Fee</Typography>
                                <Typography>≈ $5.00</Typography>
                            </Box>
                            {showPriceImpact && (
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography color="textSecondary">Price Impact</Typography>
                                    <Typography color={priceImpactColor}>
                                        {formatNumber(priceImpact || 0, {
                                            decimals: 2,
                                            suffix: '%',
                                        })}
                                    </Typography>
                                </Box>
                            )}
                        </Stack>
                    </InfoContainer>

                    <SwapButton
                        type="submit"
                        disabled={
                            !isConnected ||
                            !fromToken ||
                            !toToken ||
                            !fromAmount ||
                            !toAmount ||
                            Object.keys(errors).length > 0 ||
                            isLoading ||
                            hasZeroBalance
                        }
                    >
                        {!isConnected
                            ? 'Connect Wallet'
                            : !fromToken || !toToken
                            ? 'Select Tokens'
                            : !fromAmount || !toAmount
                            ? 'Enter Amount'
                            : hasZeroBalance
                            ? 'Insufficient Balance'
                            : Object.keys(errors).length > 0
                            ? errors.fromAmount?.message || 'Invalid Input'
                            : isLoading
                            ? 'Swapping...'
                            : 'Swap'}
                    </SwapButton>
                </Stack>
            </Stack>

            <SwapSettings
                slippage={slippage}
                onSlippageChange={setSlippage}
                isOpen={showSettings}
                onClose={() => setShowSettings(false)}
            />

            <TokenSelectDialog
                open={selectingToken !== null}
                onClose={() => setSelectingToken(null)}
                tokens={tokens}
                balances={balances}
                selectedToken={selectingToken === 'from' ? fromToken : toToken}
                onSelect={handleSelectToken}
            />
        </SwapContainer>
    )
}
