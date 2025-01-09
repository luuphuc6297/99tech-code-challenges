export const ACTION_TYPES = {
    SET_LOADING: 'SET_LOADING',
    SET_ERROR: 'SET_ERROR',
    SET_ADDRESS: 'SET_ADDRESS',
    SET_CHAIN_ID: 'SET_CHAIN_ID',
    SET_CONNECTED: 'SET_CONNECTED',
    SET_TOKENS: 'SET_TOKENS',
    SET_BALANCES: 'SET_BALANCES',
    SET_FROM_TOKEN: 'SET_FROM_TOKEN',
    SET_TO_TOKEN: 'SET_TO_TOKEN',
    SET_FROM_AMOUNT: 'SET_FROM_AMOUNT',
    SET_QUOTE: 'SET_QUOTE',
    SET_TRANSACTION: 'SET_TRANSACTION',
} as const

export const ERROR_MESSAGES = {
    WEB3_CONTEXT: 'useWeb3 must be used within a Web3Provider',
    SWAP_CONTEXT: 'useSwap must be used within a SwapProvider',
} as const
