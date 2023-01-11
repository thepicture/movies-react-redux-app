import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#0d253f",
    },
    secondary: {
      main: "##01b4e4",
    },
  },
  components: {
    MuiCard: {
      defaultProps: {
        elevation: 5,
      },
      styleOverrides: {
        root: {
          padding: 32,
        },
      },
    },
  },
});
