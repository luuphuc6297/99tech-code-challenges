import { debounce } from 'lodash'
import { useEffect, useState } from 'react'

export function useDebounce<T>(value: T, delay = 300): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)

    useEffect(() => {
        const debouncedUpdate = debounce((newValue: T) => {
            setDebouncedValue(newValue)
        }, delay)

        debouncedUpdate(value)

        return () => {
            debouncedUpdate.cancel()
        }
    }, [value, delay])

    return debouncedValue
}
