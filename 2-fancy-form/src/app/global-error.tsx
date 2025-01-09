'use client'

import { Box, Button, Typography } from '@mui/material'
import { useEffect } from 'react'

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log error to error reporting service
        console.error('Global Error:', error)
    }, [error])

    return (
        <html>
            <body>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100vh',
                        textAlign: 'center',
                        p: 3,
                        bgcolor: 'background.default',
                        color: 'text.primary',
                    }}
                >
                    <Typography variant="h4" gutterBottom>
                        Lỗi nghiêm trọng
                    </Typography>
                    <Typography color="text.secondary" mb={4}>
                        {error.message || 'Đã xảy ra lỗi nghiêm trọng. Vui lòng tải lại trang.'}
                    </Typography>
                    <Button variant="contained" onClick={reset}>
                        Tải lại trang
                    </Button>
                </Box>
            </body>
        </html>
    )
} 