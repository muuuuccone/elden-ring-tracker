import {createTheme, responsiveFontSizes} from "@mui/material/styles";

export const eldenRingTheme = responsiveFontSizes(createTheme({
    typography:{

    },
    palette: {
        mode: 'dark',
        primary: {
            main: '#c19d53',
        }
    }
}));