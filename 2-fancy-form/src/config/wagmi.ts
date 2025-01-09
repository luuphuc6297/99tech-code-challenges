import { mainnet, polygon } from 'viem/chains'
import { createConfig, http } from 'wagmi'
import { metaMask } from 'wagmi/connectors'

if (!process.env.NEXT_PUBLIC_ETHEREUM_RPC_URL) {
    throw new Error('NEXT_PUBLIC_ETHEREUM_RPC_URL is not defined')
}

const ETHEREUM_RPC_URL = process.env.NEXT_PUBLIC_ETHEREUM_RPC_URL as string
const POLYGON_RPC_URL = process.env.NEXT_PUBLIC_POLYGON_RPC_URL as string

export const config = createConfig({
    chains: [mainnet, polygon],
    connectors: [metaMask()],
    transports: {
        [mainnet.id]: http(ETHEREUM_RPC_URL),
        [polygon.id]: http(POLYGON_RPC_URL),
    },
    syncConnectedChain: true,
})

export const DEFAULT_CHAIN = mainnet

export const RPC_URLS: { [chainId: number]: string } = {
    [mainnet.id]: ETHEREUM_RPC_URL,
    [polygon.id]: POLYGON_RPC_URL!,
}
