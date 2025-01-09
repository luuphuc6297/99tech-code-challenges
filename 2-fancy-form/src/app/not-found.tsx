import { Box, Button, Typography } from '@mui/material'
import Link from 'next/link'

export default function NotFound() {
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
            <Typography variant="h1" gutterBottom>
                404
            </Typography>
            <Typography variant="h4" gutterBottom>
                Page Not Found
            </Typography>
            <Typography color="text.secondary" mb={4}>
                The page you are looking for does not exist.
            </Typography>
            <Link href="/" passHref>
                <Button variant="contained">Go Home</Button>
            </Link>
        </Box>
    )
}
