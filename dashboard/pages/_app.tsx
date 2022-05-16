import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MoralisProvider } from "react-moralis";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MoralisProvider
      serverUrl="https://elqppuupmm9w.usemoralis.com:2053/server"
      appId="wjPOM758RJ6PghTxoKmjwDs75K1PRz9c9EBOcA4Z"
    >
      {" "}
      <Component {...pageProps} />
    </MoralisProvider>
  );
}

export default MyApp;
