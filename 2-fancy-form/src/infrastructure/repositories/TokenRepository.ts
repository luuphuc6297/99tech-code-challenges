import { RPC_URLS } from '@/config/wagmi'
import { Token, TokenBalance } from '@domain/entities/Token'
import { ITokenRepository } from '@domain/repositories/ITokenRepository'

import { ERC20_ABI } from '@infra/constants/abis'
import { createPublicClient, formatUnits, http } from 'viem'

const TOKENS: Record<number, Token[]> = {
    1: [
        {
            address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
            symbol: 'BNB',
            name: 'BNB',
            decimals: 18,
            chainId: 1,
            logoURI: 'https://tokens.pancakeswap.finance/images/symbol/bnb.png',
        },
        {
            address: '0x55d398326f99059fF775485246999027B3197955',
            symbol: 'USDT',
            name: 'Tether USD',
            decimals: 18,
            chainId: 1,
            logoURI: 'https://tokens.pancakeswap.finance/images/symbol/usdt.png',
        },
        {
            address: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
            symbol: 'CAKE',
            name: 'PancakeSwap Token',
            decimals: 18,
            chainId: 1,
            logoURI: 'https://tokens.pancakeswap.finance/images/symbol/cake.png',
        },
        {
            address: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
            symbol: 'BTCB',
            name: 'Bitcoin BEP2',
            decimals: 18,
            chainId: 1,
            logoURI:
                'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/bitcoin/info/logo.png',
        },
        {
            address: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
            symbol: 'ETH',
            name: 'Ethereum Token',
            decimals: 18,
            chainId: 1,
            logoURI:
                'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png',
        },
        {
            address: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
            symbol: 'BUSD',
            name: 'Binance USD',
            decimals: 18,
            chainId: 1,
            logoURI: 'https://tokens.pancakeswap.finance/images/symbol/busd.png',
        },
        {
            address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
            symbol: 'USDC',
            name: 'USD Coin',
            decimals: 18,
            chainId: 1,
            logoURI: 'https://tokens.pancakeswap.finance/images/symbol/usdc.png',
        },
        {
            address: '0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402',
            symbol: 'DOT',
            name: 'Polkadot Token',
            decimals: 18,
            chainId: 1,
            logoURI: 'https://assets.coingecko.com/coins/images/12171/small/polkadot.png',
        },
        {
            address: '0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47',
            symbol: 'ADA',
            name: 'Cardano Token',
            decimals: 18,
            chainId: 1,
            logoURI: 'https://assets.coingecko.com/coins/images/975/small/cardano.png',
        },
        {
            address: '0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE',
            symbol: 'XRP',
            name: 'XRP Token',
            decimals: 18,
            chainId: 1,
            logoURI: 'https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png',
        },
        {
            address: '0x85EAC5Ac2F758618dFa09bDbe0cf174e7d574D5B',
            symbol: 'DOGE',
            name: 'Dogecoin Token',
            decimals: 18,
            chainId: 1,
            logoURI: 'https://assets.coingecko.com/coins/images/5/small/dogecoin.png',
        },
        {
            address: '0x14016E85a25aeb13065688cAFB43044C2ef86784',
            symbol: 'TUSD',
            name: 'TrueUSD',
            decimals: 18,
            chainId: 1,
            logoURI: 'https://assets.coingecko.com/coins/images/3449/small/tusd.png',
        },
    ],
    137: [
        {
            address: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
            symbol: 'WMATIC',
            name: 'Wrapped Matic',
            decimals: 18,
            chainId: 137,
            logoURI: 'https://assets.coingecko.com/coins/images/4713/thumb/matic-token-icon.png',
        },
        {
            address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
            symbol: 'WETH',
            name: 'Wrapped Ether',
            decimals: 18,
            chainId: 137,
            logoURI:
                'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
        },
        {
            address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
            symbol: 'USDC',
            name: 'USD Coin',
            decimals: 6,
            chainId: 137,
            logoURI: 'https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png',
        },
        {
            address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
            symbol: 'USDT',
            name: 'Tether USD',
            decimals: 6,
            chainId: 137,
            logoURI: 'https://assets.coingecko.com/coins/images/325/thumb/Tether-logo.png',
        },
        {
            address: '0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6',
            symbol: 'WBTC',
            name: 'Wrapped Bitcoin',
            decimals: 8,
            chainId: 137,
            logoURI:
                'https://assets.coingecko.com/coins/images/7598/thumb/wrapped_bitcoin_wbtc.png',
        },
        {
            address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
            symbol: 'DAI',
            name: 'Dai Stablecoin',
            decimals: 18,
            chainId: 137,
            logoURI: 'https://assets.coingecko.com/coins/images/9956/thumb/4943.png',
        },
    ],
}

export class TokenRepository implements ITokenRepository {
    private getClient(chainId: number) {
        return createPublicClient({
            transport: http(RPC_URLS[chainId]),
        })
    }

    async getTokens(chainId: number): Promise<Token[]> {
        return TOKENS[chainId] || []
    }

    async getTokenBalance(address: string, token: Token): Promise<TokenBalance> {
        try {
            const client = this.getClient(token.chainId)
            let balance: bigint

            // Mock balance cho testing
            if (process.env.NODE_ENV === 'development') {
                const mockBalances: Record<string, string> = {
                    BNB: '1000000000000000000',
                    WBNB: '1000000000000000000',
                    ETH: '1000000000000000000',
                    WETH: '1000000000000000000',
                    USDT: '1000000000',
                    USDC: '1000000000',
                    BUSD: '1000000000000000000000',
                    CAKE: '10000000000000000000',
                    BTCB: '100000000000000000',
                    DOT: '10000000000000000000',
                    WMATIC: '100000000000000000',
                    ADA: '1000000000000000000',
                    XRP: '500000000000000',
                    DOGE: '100000000000000000000000',
                    TUSD: '500000000000000',
                }
                balance = BigInt(mockBalances[token.symbol] || '0')
            } else {
                balance = (await client.readContract({
                    address: token.address as `0x${string}`,
                    abi: ERC20_ABI,
                    functionName: 'balanceOf',
                    args: [address as `0x${string}`],
                })) as bigint
            }

            const price = await this.getTokenPrice(token)
            const formattedBalance = formatUnits(balance, token.decimals)

            return {
                balance: formattedBalance,
                balanceUsd: parseFloat(formattedBalance) * (price || 0),
            }
        } catch (error) {
            console.error('Failed to get token balance:', error)
            return {
                balance: '0',
                balanceUsd: 0,
            }
        }
    }

    async getTokenPrice(token: Token): Promise<number> {
        const mockPrices: Record<string, number> = {
            BNB: 300,
            WBNB: 300,
            ETH: 2200,
            WETH: 2200,
            USDT: 1,
            USDC: 1,
            BUSD: 1,
            CAKE: 2.5,
            BTCB: 43000,
            DOT: 7,
            WMATIC: 0.8,
            ADA: 0.5,
            XRP: 0.6,
            DOGE: 0.08,
            TUSD: 1,
        }
        return mockPrices[token.symbol] || 0
    }
}
