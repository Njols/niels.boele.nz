import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const styles = {
  global: (props) => ({
    body: {
      bg: mode("#f0e7db", "#202023")(props),
    },
    b: {
      color: "darkOrange",
      fontWeight: "1000",
    },
    a: {
      color: "darkOrange",
      textDecoration: "underline",
    },
  }),
};

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const fonts = {
  heading: "'Bodoni Moda', serif",
  body: "'Alegreya Sans'",
};

const components = {
  Heading: {
    variants: {
      "sub-title": {
        color: "darkOrange",
        fontSize: "0.9rem",
      },
      "section-title": {
        fontSize: "1.5rem",
        textDecoration: "underline",
      },
    },
  },
  Text: {
    baseStyle: {
      fontWeight: "1000",
      fontSize: "1.1rem",
    },
  },
};
const colors = {
  darkOrange: "#ff8c00",
  secondaryGrey: "#3b444b",
};

const theme = extendTheme({ config, styles, components, fonts, colors });
export default theme;
