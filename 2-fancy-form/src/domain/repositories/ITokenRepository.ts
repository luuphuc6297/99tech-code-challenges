import { Token, TokenBalance } from '../entities/Token'

export interface ITokenRepository {
    getTokens(chainId: number): Promise<Token[]>
    getTokenBalance(address: string, token: Token): Promise<TokenBalance>
    getTokenPrice(token: Token): Promise<number>
}
