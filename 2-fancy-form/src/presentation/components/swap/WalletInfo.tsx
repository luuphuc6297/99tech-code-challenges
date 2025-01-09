'use client'

import { SUPPORTED_CHAINS } from '@config/chains'
import { useWeb3 } from '@contexts/Web3Context'
import { ContentCopy, OpenInNew, SwapHoriz } from '@mui/icons-material'
import { Box, IconButton, Menu, MenuItem, Paper, Stack, Tooltip, Typography } from '@mui/material'
import { shortenAddress } from '@utils/format'
import { useState } from 'react'
import { mainnet, polygon } from 'viem/chains'

interface ChainInfo {
    name: string
    explorer: string
}

const CHAINS: Record<number, ChainInfo> = {
    [mainnet.id]: {
        name: 'Ethereum',
        explorer: 'https://etherscan.io',
    },
    [polygon.id]: {
        name: 'Polygon',
        explorer: 'https://polygonscan.com',
    },
}

export function WalletInfo() {
    const { isConnected, address, chainId, switchChain } = useWeb3()
    const [copied, setCopied] = useState(false)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    if (!isConnected || !address) return null

    const chain = CHAINS[chainId]
    const explorerUrl = chain ? `${chain.explorer}/address/${address}` : undefined

    const handleCopy = () => {
        navigator.clipboard.writeText(address)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleOpenChainMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleCloseChainMenu = () => {
        setAnchorEl(null)
    }

    const handleSwitchChain = async (targetChainId: number) => {
        try {
            await switchChain(targetChainId)
        } catch (error) {
            console.error('Failed to switch chain:', error)
        }
        handleCloseChainMenu()
    }

    return (
        <Paper variant="outlined" sx={{ p: 2 }}>
            <Stack spacing={1}>
                <Typography variant="subtitle2" color="text.secondary">
                    Connected Wallet
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
                        {shortenAddress(address)}
                    </Typography>
                    <Tooltip title={copied ? 'Copied!' : 'Copy Address'} placement="top">
                        <IconButton size="small" onClick={handleCopy}>
                            <ContentCopy fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    {explorerUrl && (
                        <Tooltip title="View on Explorer" placement="top">
                            <IconButton
                                size="small"
                                component="a"
                                href={explorerUrl}
                                target="_blank"
                            >
                                <OpenInNew fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    )}
                    <Tooltip title="Switch Network" placement="top">
                        <IconButton size="small" onClick={handleOpenChainMenu}>
                            <SwapHoriz fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleCloseChainMenu}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        {SUPPORTED_CHAINS.map((supportedChain) => (
                            <MenuItem
                                key={supportedChain.id}
                                onClick={() => handleSwitchChain(supportedChain.id)}
                                selected={chainId === supportedChain.id}
                            >
                                {CHAINS[supportedChain.id]?.name || supportedChain.name}
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
                {chain && (
                    <Typography variant="body2" color="text.secondary">
                        Network: {chain.name}
                    </Typography>
                )}
            </Stack>
        </Paper>
    )
}
