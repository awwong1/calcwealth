import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";

const AppRoot = ({ Component, pageProps }: AppProps): JSX.Element => (
  <ChakraProvider resetCSS>
    <Component {...pageProps} />
  </ChakraProvider>
);

export default AppRoot;
