import type { AppProps } from "next/app";

import "../public/styles/root.scss";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
