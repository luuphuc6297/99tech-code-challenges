import { useWeb3 } from '@contexts/Web3Context'
import { Button, ButtonProps } from '@mui/material'
import { shortenAddress } from '@utils/format'

type ConnectButtonProps = Omit<ButtonProps, 'onClick' | 'children'>

export function ConnectButton(props: ConnectButtonProps) {
    const { isConnected, address, connect, disconnect } = useWeb3()

    const handleClick = () => {
        if (isConnected) {
            disconnect()
        } else {
            connect()
        }
    }

    return (
        <Button variant="contained" onClick={handleClick} {...props}>
            {isConnected ? shortenAddress(address || '') : 'Connect Wallet'}
        </Button>
    )
}
