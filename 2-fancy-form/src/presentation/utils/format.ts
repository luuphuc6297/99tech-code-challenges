export function shortenAddress(address: string): string {
    if (!address) return ''
    return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export function formatNumber(
    value: number | string,
    options: {
        decimals?: number
        prefix?: string
        suffix?: string
        compact?: boolean
    } = {}
): string {
    const { decimals = 2, prefix = '', suffix = '', compact = false } = options
    const num = typeof value === 'string' ? parseFloat(value) : value

    if (isNaN(num)) return ''

    const formatter = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
        notation: compact ? 'compact' : 'standard',
    })

    return `${prefix}${formatter.format(num)}${suffix}`
}

export function formatUSD(value: number | string): string {
    return formatNumber(value, { prefix: '$', decimals: 2 })
}

export function formatBalance(value: string | number): string {
    const num = typeof value === 'string' ? parseFloat(value) : value
    if (isNaN(num)) return '0.00'

    if (Math.abs(num) < 0.000001) {
        return formatNumber(num, { decimals: 2, compact: true })
    }

    if (Math.abs(num) < 1) {
        const decimalPlaces = Math.min(6, -Math.floor(Math.log10(Math.abs(num))))
        return formatNumber(num, { decimals: decimalPlaces })
    }

    if (Math.abs(num) >= 1000) {
        return formatNumber(num, { decimals: 2, compact: true })
    }

    return formatNumber(num, { decimals: 2 })
}
