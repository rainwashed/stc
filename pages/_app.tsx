import type { AppProps } from "next/app";

import FabActionButton from "./components/fab.component";

import "../public/styles/root.scss";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Component {...pageProps} />
            <FabActionButton />
        </>
    );
}

export default MyApp;
