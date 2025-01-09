import { PaletteOptions } from '@mui/material'

declare module '@mui/material/styles' {
    interface Palette {
        neutral: {
            main: string
            contrastText: string
        }
        custom: {
            background: string
            surface: string
            text: {
                secondary: string
                disabled: string
            }
        }
    }
    interface PaletteOptions {
        neutral?: {
            main: string
            contrastText: string
        }
        custom?: {
            background: string
            surface: string
            text: {
                secondary: string
                disabled: string
            }
        }
    }
}

const palette: PaletteOptions = {
    mode: 'dark',
    primary: {
        main: '#3f51b5',
        light: '#7986cb',
        dark: '#303f9f',
        contrastText: '#fff',
    },
    secondary: {
        main: '#f50057',
        light: '#ff4081',
        dark: '#c51162',
        contrastText: '#fff',
    },
    neutral: {
        main: '#64748B',
        contrastText: '#fff',
    },
    background: {
        default: '#0C192B',
        paper: '#0C192B',
    },
    custom: {
        background: '#0C192B',
        surface: '#252B36',
        text: {
            secondary: '#717A8C',
            disabled: '#4A5568',
        },
    },
    text: {
        primary: '#fff',
        secondary: '#717A8C',
        disabled: '#4A5568',
    },
    action: {
        active: '#fff',
        hover: '#343434',
        selected: 'rgba(255, 255, 255, 0.16)',
        disabled: '#4A5568',
        disabledBackground: '#252B36',
    },
    error: {
        main: '#EF4444',
        light: '#F87171',
        dark: '#DC2626',
    },
    warning: {
        main: '#F59E0B',
        light: '#FBBF24',
        dark: '#D97706',
    },
    success: {
        main: '#22C55E',
        light: '#34D399',
        dark: '#059669',
    },
}

export default palette
