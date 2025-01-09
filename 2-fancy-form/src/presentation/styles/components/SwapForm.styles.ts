import { Box, Button, IconButton, Paper, TextField } from '@mui/material'
import { styled } from '@mui/material/styles'

export const SwapContainer = styled(Paper)({
    maxWidth: '480px',
    borderRadius: '20px',
    padding: '24px',
    margin: 'auto',
    width: '100%',
    backgroundColor: 'transparent',
    backgroundImage: 'none',
    boxShadow: 'none',
})

export const TokenInputContainer = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.custom.surface,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1),
}))

export const TokenAmountInput = styled(TextField)(({ theme }) => ({
    '& .MuiInputBase-input': {
        color: theme.palette.text.primary,
        fontSize: 24,
        padding: 0,
    },
    '& .MuiInput-underline:before': {
        borderBottom: 'none',
    },
    // '& .MuiInput-underline:after': {
    //     borderBottom: 'none',
    // },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
        borderBottom: 'none',
    },
}))

export const TokenSelector = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.custom.surface,
    color: theme.palette.text.primary,
    padding: theme.spacing(1, 1.5),
    borderRadius: theme.shape.borderRadius,
    textTransform: 'none',
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
}))

export const SwapButton = styled(Button)(({ theme }) => ({
    width: '100%',
    height: 56,
    borderRadius: theme.shape.borderRadius,
    fontSize: theme.typography.button.fontSize,
    fontWeight: theme.typography.button.fontWeight,
    textTransform: 'none',
    '&.Mui-disabled': {
        backgroundColor: theme.palette.action.disabledBackground,
        color: theme.palette.action.disabled,
    },
}))

export const InfoContainer = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.custom.surface,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
}))

export const IconButtonStyled = styled(IconButton)(({ theme }) => ({
    backgroundColor: theme.palette.custom.surface,
    color: theme.palette.text.secondary,
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
    '&.Mui-disabled': {
        backgroundColor: theme.palette.custom.surface,
        color: theme.palette.text.disabled,
    },
}))
