import { Token, TokenBalance } from '@domain/entities/Token'
import * as yup from 'yup'

export const swapFormSchema = yup.object({
    fromAmount: yup
        .string()
        .required('Please enter an amount')
        .test('is-number', 'Please enter a valid number', (value) => {
            console.log('Testing is-number:', value)
            if (!value) return true
            const num = parseFloat(value)
            return !isNaN(num) && num > 0
        })
        .test('has-sufficient-balance', 'Insufficient balance', function (value) {
            console.log('Testing has-sufficient-balance:', {
                value,
                fromToken: this.parent.fromToken,
                balance: this.parent.balance,
            })
            if (!value) return true
            const fromToken = this.parent.fromToken as Token | null
            const balance = this.parent.balance as Record<string, TokenBalance> | null

            if (!fromToken || !balance) return true

            const amount = parseFloat(value)
            const tokenBalance = balance[fromToken.address]
            if (!tokenBalance) return true

            const balanceNum = parseFloat(tokenBalance.balance)

            if (fromToken.address.toLowerCase() === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
                const estimatedGas = 0.01 // ETH
                return balanceNum - estimatedGas >= amount
            }

            return balanceNum >= amount
        }),
    toAmount: yup
        .string()
        .required('Please enter an amount')
        .test('is-number', 'Please enter a valid number', (value) => {
            console.log('Testing to-amount is-number:', value)
            if (!value) return true
            const num = parseFloat(value)
            return !isNaN(num) && num > 0
        })
        .test('has-sufficient-balance', 'Insufficient balance', function (value) {
            console.log('Testing to-amount has-sufficient-balance:', {
                value,
                toToken: this.parent.toToken,
                balance: this.parent.balance
            })
            if (!value) return true
            const toToken = this.parent.toToken as Token | null
            const balance = this.parent.balance as Record<string, TokenBalance> | null

            if (!toToken || !balance) return true

            const amount = parseFloat(value)
            const tokenBalance = balance[toToken.address]
            if (!tokenBalance) return true

            const balanceNum = parseFloat(tokenBalance.balance)

            if (toToken.address.toLowerCase() === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
                const estimatedGas = 0.01 // ETH
                return balanceNum - estimatedGas >= amount
            }

            return balanceNum >= amount
        }),
    fromToken: yup.mixed().nullable(),
    balance: yup.mixed().nullable(),
})
