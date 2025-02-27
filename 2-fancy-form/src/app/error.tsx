'use client'

import { Box, Button, Typography } from '@mui/material'
import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log error to error reporting service
        console.error('Application Error:', error)
    }, [error])

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                textAlign: 'center',
                p: 3,
            }}
        >
            <Typography variant="h4" gutterBottom>
                Error
            </Typography>
            <Typography color="text.secondary" mb={4}>
                {error.message}
            </Typography>
            <Button variant="contained" onClick={reset}>
                Retry
            </Button>
        </Box>
    )
}
