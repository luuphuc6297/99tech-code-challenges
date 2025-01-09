'use client'

import { Box, Container, CssBaseline } from '@mui/material'
import { ReactNode } from 'react'
import { AppBar } from './AppBar'

interface LayoutProps {
    children: ReactNode
}

export function Layout({ children }: LayoutProps) {
    return (
        <>
            <CssBaseline />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                    bgcolor: 'background.default',
                }}
            >
                <AppBar />
                <Container
                    component="main"
                    maxWidth="lg"
                    sx={{
                        flex: 1,
                        py: 4,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {children}
                </Container>
            </Box>
        </>
    )
}
