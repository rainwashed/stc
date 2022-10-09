import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";

import IndexStyles from "../public/styles/modules/index.module.scss";

const Home: NextPage = () => {
    let [demographicData, setDemographicData] = useState({});

    useEffect(() => {
        let sessionCookie: string | null =
            window.localStorage.getItem("sessionCookie");
        if (sessionCookie === null) {
            function promptForCookie() {
                let x = prompt(
                    "Please enter your ASP.NET_SessionId..."
                ) as string;

                if (x === null || /.{24}/g.test(x.trim()) === false) {
                    alert(
                        "This appears to be in the incorrect format. (remember to not include the ASP.NET_SessionID=)"
                    );
                    promptForCookie();
                }

                window.localStorage.setItem("sessionCookie", x.trim());
                window.location.reload();
            }

            promptForCookie();
        }
    }, []);

    function resetSessionCookie() {
        window.localStorage.removeItem("sessionCookie");
        window.location.reload();
    }

    return (
        <>
            <div className={IndexStyles.root}>
                <Button
                    variant="contained"
                    title="Having problems?"
                    onClick={() => resetSessionCookie()}
                >
                    Reset Session Cookie
                </Button>
                <h1>Goodbye World!</h1>
            </div>
        </>
    );
};

export default Home;
