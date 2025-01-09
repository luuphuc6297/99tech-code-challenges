'use client'

import { Close } from '@mui/icons-material'
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Stack,
    Typography,
} from '@mui/material'

const SLIPPAGE_OPTIONS = [0.1, 0.5, 1.0]

export interface SwapSettingsProps {
    slippage: number
    onSlippageChange: (value: number) => void
    isOpen: boolean
    onClose: () => void
}

export function SwapSettings({ slippage, onSlippageChange, isOpen, onClose }: SwapSettingsProps) {
    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    bgcolor: 'background.paper',
                    borderRadius: 3,
                },
            }}
        >
            <DialogTitle>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="h6">Settings</Typography>
                    <IconButton onClick={onClose} size="small">
                        <Close />
                    </IconButton>
                </Box>
            </DialogTitle>

            <DialogContent>
                <Stack spacing={2}>
                    <Box>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                            Slippage Tolerance
                        </Typography>
                        <Stack direction="row" spacing={1}>
                            {SLIPPAGE_OPTIONS.map((value) => (
                                <Button
                                    key={value}
                                    variant={slippage === value ? 'contained' : 'outlined'}
                                    onClick={() => onSlippageChange(value)}
                                    sx={{
                                        minWidth: 64,
                                        borderRadius: 2,
                                    }}
                                >
                                    {value}%
                                </Button>
                            ))}
                        </Stack>
                    </Box>
                </Stack>
            </DialogContent>
        </Dialog>
    )
}
