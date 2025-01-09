'use client'

import { Token, TokenBalance } from '@domain/entities/Token'
import { useWeb3 } from '@contexts/Web3Context'
import { Search } from '@mui/icons-material'
import { InputAdornment, TextField, Typography } from '@mui/material'
import { formatBalance, formatUSD } from '@utils/format'
import Image from 'next/image'
import { useState } from 'react'
import {
    TokenListContainer,
    SearchContainer,
    TokenList as StyledTokenList,
    TokenListItem,
    TokenInfo,
    TokenSymbol,
    TokenName,
    TokenBalance as StyledTokenBalance,
} from '@/presentation/styles/components/TokenList.styles'
import { useDebounce } from '@hooks/useDebounce'

interface TokenListProps {
    tokens: Token[]
    balances: Record<string, TokenBalance>
    selectedToken?: Token
    onSelect: (token: Token) => void
}

export function TokenList({ tokens, balances, selectedToken, onSelect }: TokenListProps) {
    const [search, setSearch] = useState('')
    const { isConnected } = useWeb3()
    const debouncedSearch = useDebounce(search, 300)

    const filteredTokens = tokens.filter((token) => {
        const searchLower = debouncedSearch.toLowerCase()
        return (
            token.symbol.toLowerCase().includes(searchLower) ||
            token.name.toLowerCase().includes(searchLower)
        )
    })

    return (
        <TokenListContainer>
            <SearchContainer>
                <TextField
                    fullWidth
                    placeholder="Search by name or paste address"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        ),
                    }}
                />
            </SearchContainer>

            <StyledTokenList>
                {filteredTokens.map((token) => {
                    const balance = balances[token.address]

                    return (
                        <TokenListItem
                            key={token.address}
                            onClick={() => onSelect(token)}
                            selected={selectedToken?.address === token.address}
                        >
                            <Image
                                src={token.logoURI}
                                alt={token.symbol}
                                width={36}
                                height={36}
                                style={{ borderRadius: '50%' }}
                            />
                            <TokenInfo>
                                <TokenSymbol>{token.symbol}</TokenSymbol>
                                <TokenName>{token.name}</TokenName>
                            </TokenInfo>
                            {isConnected && balance && (
                                <StyledTokenBalance>
                                    <Typography className="balance">
                                        {formatBalance(balance.balance)}
                                    </Typography>
                                    {balance.balanceUsd > 0 && (
                                        <Typography className="value">
                                            {formatUSD(balance.balanceUsd)}
                                        </Typography>
                                    )}
                                </StyledTokenBalance>
                            )}
                        </TokenListItem>
                    )
                })}
            </StyledTokenList>
        </TokenListContainer>
    )
} 