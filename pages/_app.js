import { ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";
import theme from "../lib/theme";
import Fonts from "../components/fonts";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
