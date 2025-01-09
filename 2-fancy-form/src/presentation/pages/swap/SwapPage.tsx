import { Layout } from '@components/layout/Layout'
import { Card, Container } from '@mui/material'
import { SwapForm } from '@components/swap/SwapForm'

export function SwapPage() {
    return (
        <Layout>
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Card
                    sx={{
                        maxWidth: 480,
                        mx: 'auto',
                        width: '100%',
                        p: 3,
                    }}
                >
                    <SwapForm />
                </Card>
            </Container>
        </Layout>
    )
} 