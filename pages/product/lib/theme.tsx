import { createTheme } from "@mui/material";
import "@fontsource/poppins";

export const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#0569baff",
        },
        secondary: {
            main: "#f5f5f5",
        },
        background: {
            default: "#f9f9f9",
        },
    },
    typography: {
        fontFamily: "Poppins, sans-serif",
        h1: {
            fontWeight: 700,
            fontSize: "3rem",
        },
        body1: {
            fontSize: "1rem",
        },
        button: {
            textTransform: "none",
        },
        body2: {
            fontSize: "1rem",
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: "8px 16px",
                    boxShadow: "none",
                    "&:hover": {
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    },
                },
            },
        },  
    },
})