import { responsiveFontSizes, createTheme } from "@mui/material/styles";

let theme = createTheme({
  components: {
    // Name of the component
    MuiLink: {
      defaultProps: {
        underline: "none",
        color: "#000",
      },
    },
  },

  palette: {
    //mode: "dark",
  },
});

theme = responsiveFontSizes(theme);
export default theme;
