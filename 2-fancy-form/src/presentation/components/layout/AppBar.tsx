'use client'

import { ConnectButton } from '@components/common/ConnectButton'
import { Box, Container, AppBar as MuiAppBar, Toolbar, Typography } from '@mui/material'

export function AppBar() {
    return (
        <MuiAppBar position="static" elevation={0}>
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Fancy Form
                    </Typography>
                    <Box>
                        <ConnectButton />
                    </Box>
                </Toolbar>
            </Container>
        </MuiAppBar>
    )
}
