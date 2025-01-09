import { Box, List, ListItemButton, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

export const TokenListContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    maxWidth: 420,
    height: '60vh',
    margin: 'auto',
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
}))

export const SearchContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(1, 2),
    position: 'sticky',
    top: 0,
    backgroundColor: theme.palette.background.paper,
    zIndex: 1,
    marginBottom: theme.spacing(1),
    '& .MuiInputBase-root': {
        height: '40px',
    },
    '& .MuiInputBase-input': {
        fontSize: '0.875rem',
        height: '40px',
        padding: '0 14px',
    },
    '& .MuiInputBase-input::placeholder': {
        fontSize: '0.875rem',
        opacity: 0.2,
    },
}))

export const TokenList = styled(List)(({ theme }) => ({
    padding: theme.spacing(0, 2),
    overflowY: 'auto',
    flex: 1,
    '&::-webkit-scrollbar': {
        width: '6px',
    },
    '&::-webkit-scrollbar-track': {
        background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.action.hover,
        borderRadius: '3px',
    },
    '& .MuiListItem-root': {
        padding: 0,
        marginBottom: theme.spacing(1),
        '&:last-child': {
            marginBottom: 0,
        },
    },
}))

export const TokenListItem = styled(ListItemButton)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1.5),
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
    '&.Mui-selected': {
        backgroundColor: theme.palette.action.selected,
        '&:hover': {
            backgroundColor: theme.palette.action.selected,
        },
    },
}))

export const TokenInfo = styled(Stack)({
    flexGrow: 1,
    marginLeft: 12,
})

export const TokenSymbol = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    color: theme.palette.text.primary,
}))

export const TokenName = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontSize: '0.875rem',
}))

export const TokenBalance = styled(Stack)(({ theme }) => ({
    alignItems: 'flex-end',
    '& .balance': {
        color: theme.palette.text.primary,
        fontWeight: 500,
        whiteSpace: 'nowrap',
    },
    '& .value': {
        color: theme.palette.text.secondary,
        fontSize: '0.875rem',
        whiteSpace: 'nowrap',
    },
}))
