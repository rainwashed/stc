import type { AppProps } from "next/app";

import FooterComponent from "./components/footer.component";

import "../public/styles/root.scss";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Component {...pageProps}></Component>
            <FooterComponent />
        </>
    );
}

export default MyApp;
