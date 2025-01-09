import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import breakpoints from './breakpoints'
import components from './components'
import palette from './palette'
import typography from './typography'

const theme = responsiveFontSizes(
    createTheme({
        breakpoints,
        components,
        palette,
        typography,
        shape: {
            borderRadius: 12,
        },
        spacing: 8,
    })
)

export default theme
