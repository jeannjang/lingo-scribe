import { createTheme } from '@mui/material/styles';

// MUI theme customization
const theme = createTheme({
    typography: {
        fontSize: 18, // Set the default font size in px
        h6: {
            fontSize: '24px',
        },
        subtitle1: {
            fontSize: '20px',
        },
        body1: {
            // Default text style
            fontSize: '18px', // Set the body text size to 18px
        },
    },
    components: {
        // Override styles for specific components
        MuiButton: {
            styleOverrides: {
                root: {
                    fontSize: '14px',
                    padding: '10px 20px',
                },
            },
        },
    },
});

export default theme;