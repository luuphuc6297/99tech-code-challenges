'use client'

import { Token, TokenBalance } from '@domain/entities/Token'
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material'
import { Close } from '@mui/icons-material'
import { TokenList } from './TokenList'
import { styled } from '@mui/material/styles'

const CloseButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    right: theme.spacing(2),
    top: theme.spacing(2),
    color: theme.palette.text.secondary,
}))

interface TokenSelectDialogProps {
    open: boolean
    onClose: () => void
    tokens: Token[]
    balances: Record<string, TokenBalance>
    selectedToken: Token | null
    onSelect: (token: Token) => void
}

export function TokenSelectDialog({
    open,
    onClose,
    tokens,
    balances,
    selectedToken,
    onSelect,
}: TokenSelectDialogProps) {
    const handleSelect = (token: Token) => {
        onSelect(token)
        onClose()
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                Select Token
                <CloseButton onClick={onClose} size="small">
                    <Close />
                </CloseButton>
            </DialogTitle>
            <DialogContent>
                <TokenList
                    tokens={tokens}
                    balances={balances}
                    selectedToken={selectedToken || undefined}
                    onSelect={handleSelect}
                />
            </DialogContent>
        </Dialog>
    )
} 