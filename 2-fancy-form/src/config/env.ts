const REQUIRED_ENV_VARS = [
    'NEXT_PUBLIC_ETHEREUM_RPC_URL',
    'NEXT_PUBLIC_ALCHEMY_API_KEY',
    'NEXT_PUBLIC_UNISWAP_ROUTER_ADDRESS',
] as const

type RequiredEnvVar = typeof REQUIRED_ENV_VARS[number]

if (process.env.NODE_ENV === 'development') {
    REQUIRED_ENV_VARS.forEach((key: RequiredEnvVar) => {
        if (!process.env[key]) {
            console.warn(`Warning: Environment variable ${key} is not set`)
        }
    })
}

export const ENV = {
    RPC_URLS: {
        ETHEREUM: process.env.NEXT_PUBLIC_ETHEREUM_RPC_URL || '',
        POLYGON: process.env.NEXT_PUBLIC_POLYGON_RPC_URL || '',
    },
    API_KEYS: {
        ALCHEMY_API_KEY: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || '',
    },
    CONTRACTS: {
        UNISWAP_ROUTER: process.env.NEXT_PUBLIC_UNISWAP_ROUTER_ADDRESS || '',
    },
} as const

type ENV = typeof ENV
