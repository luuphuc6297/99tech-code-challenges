'use client'

import { Box, Button, Typography } from '@mui/material'
import { ReactNode } from 'react'
import { FallbackProps, ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '400px',
                textAlign: 'center',
                p: 3,
                bgcolor: 'background.paper',
                borderRadius: 2,
            }}
        >
            <Typography variant="h5" gutterBottom>
                Erorr
            </Typography>
            <Typography color="text.secondary" mb={4}>
                {error.message || 'Đã có lỗi xảy ra trong component này. Vui lòng thử lại.'}
            </Typography>
            <Button variant="contained" onClick={resetErrorBoundary}>
                Retry
            </Button>
        </Box>
    )
}

interface Props {
    children: ReactNode
    onReset?: () => void
    fallback?: ReactNode
}

export function ErrorBoundary({ children, onReset, fallback }: Props) {
    const handleReset = () => {
        if (onReset) {
            onReset()
        }
    }

    return (
        <ReactErrorBoundary
            FallbackComponent={fallback ? () => <>{fallback}</> : ErrorFallback}
            onReset={handleReset}
            onError={(error) => {
                console.error('Component Error:', error)
            }}
        >
            {children}
        </ReactErrorBoundary>
    )
}
