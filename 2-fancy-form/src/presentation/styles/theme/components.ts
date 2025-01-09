import { Components, Theme } from '@mui/material'

const components: Components<Theme> = {
    MuiButton: {
        styleOverrides: {
            root: {
                borderRadius: 12,
                textTransform: 'none',
                fontWeight: 600,
            },
            contained: ({ theme }) => ({
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                },
                '&.Mui-disabled': {
                    backgroundColor: theme.palette.action.disabledBackground,
                    color: theme.palette.action.disabled,
                },
            }),
        },
    },
    MuiPaper: {
        styleOverrides: {
            root: ({ theme }) => ({
                backgroundColor: theme.palette.custom.background,
                color: theme.palette.text.primary,
            }),
        },
    },
    MuiIconButton: {
        styleOverrides: {
            root: ({ theme }) => ({
                backgroundColor: theme.palette.custom.surface,
                color: theme.palette.text.secondary,
                '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                },
                '&.Mui-disabled': {
                    backgroundColor: theme.palette.custom.surface,
                    color: theme.palette.text.disabled,
                },
            }),
        },
    },
    MuiTextField: {
        styleOverrides: {
            root: ({ theme }) => ({
                '& .MuiInputBase-input': {
                    color: theme.palette.text.primary,
                    fontSize: 24,
                    padding: 0,
                },
                '& .MuiInput-underline:before': {
                    borderBottom: 'none',
                },
                '& .MuiInput-underline:after': {
                    borderBottom: 'none',
                },
                '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                    borderBottom: 'none',
                },
            }),
        },
    },
}

export default components
