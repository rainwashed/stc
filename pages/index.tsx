import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";

import IndexStyles from "../public/styles/modules/index.module.scss";

import {
    FaIdBadge,
    FaIdCard,
    FaBirthdayCake,
    FaGlobeAmericas,
    FaSchool,
    FaHandHoldingHeart,
    FaPhone,
    FaEnvelope,
} from "react-icons/fa";
import type { IconBaseProps, IconType } from "react-icons/lib";

interface DemographicData {
    error: boolean;
    data: {
        name: string;
        local_id: string;
        nickname: string;
        state_id: string;
        birthdate: string;
        school: string;
        age: string;
        counselor: string;
        birth_place: string;
        birth_verification_doc: string;
        "verification_doc_#": string;
        marital_status: string;
        migrant_number: string;
        "hispanic/latino": string;
        race: string;
        english_proficiency: string;
        primary_language: string;
        home_language: string;
        home_address: string;
        mailing_address: string;
        address_verified: string;
        primary_phone: string;
        email: string;
    };
}

interface CardGridItem {
    title: string;
    description?: string;
    value: string | number;
    icon: any;
}
function CardGridItem(props: CardGridItem) {
    return (
        <div className={IndexStyles["card-grid-item"]}>
            <>
                <span>
                    {props.icon}
                    <h5>{props.title}</h5>
                </span>
                {props.description !== "" ? (
                    <h6>{props.description}</h6>
                ) : (
                    <></>
                )}
                <p>{props.value}</p>
            </>
        </div>
    );
}

const Home: NextPage = () => {
    let [demographicData, setDemographicData]: any = useState({});

    async function retrieveDemographicData() {
        try {
            setDemographicData({}); // empty means that request has started
            let token = localStorage.getItem("sessionCookie") as string;
            let req: Response = await fetch(
                `${window.location.origin}/api/demographic`,
                {
                    method: "GET",
                    headers: {
                        "session-auth": token,
                    },
                }
            );
            // if (!req.ok) throw new Error("Unable fetch! (req was not OK)");

            let x: object = await req.json();
            setDemographicData({ error: false, ...x });
        } catch (e) {
            alert("Error has been encountered! Check console for details!");
            console.log("Error @ fetching demographic data.");
            console.error(e);
            setDemographicData({ error: true }); // error: true means that request has encountered issue
        }
    }

    useEffect(() => {
        let sessionCookie: string | null =
            window.localStorage.getItem("sessionCookie");
        if (sessionCookie === null) {
            let x = prompt(
                "Please enter your ASP.NET_SessionId (without the ASP.NET_SessionId=):"
            ) as string;
            if (x === null || /.{24}/g.test(x?.trim()) === false) {
                window.location.reload();
            } else {
                window.localStorage.setItem("sessionCookie", x.trim());
                window.location.reload();
            }
        } else {
            retrieveDemographicData();
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
                <main>
                    {JSON.stringify(demographicData) !== "{}" ? (
                        <>
                            <p>{JSON.stringify(demographicData)}</p>
                            <h1>
                                Good evening, {demographicData["data"]["name"]}
                            </h1>
                            <h3>I hope your day has been well.</h3>
                            <div className={IndexStyles["card-grid"]}>
                                <CardGridItem
                                    title={"Local ID:"}
                                    value={demographicData["data"]["local_id"]}
                                    icon={<FaIdBadge />}
                                />
                                <CardGridItem
                                    title={"State ID:"}
                                    value={demographicData["data"]["state_id"]}
                                    icon={<FaIdCard />}
                                />
                                <CardGridItem
                                    title={"Birthdate:"}
                                    value={demographicData["data"]["birthdate"]}
                                    description={`You are currently ${demographicData["data"]["age"]} and your birthdate is 203 days away...`}
                                    icon={<FaBirthdayCake />}
                                />
                                <CardGridItem
                                    title={"Birth Location:"}
                                    value={
                                        demographicData["data"]["birth_place"]
                                    }
                                    icon={<FaGlobeAmericas />}
                                />
                                <CardGridItem
                                    title={"School:"}
                                    value={demographicData["data"]["school"]}
                                    icon={<FaSchool />}
                                />
                                <CardGridItem
                                    title={"Counselor Name:"}
                                    value={demographicData["data"]["counselor"]}
                                    icon={<FaHandHoldingHeart />}
                                />
                                <CardGridItem
                                    title={"Primary Phone:"}
                                    value={
                                        demographicData["data"]["primary_phone"]
                                    }
                                    icon={<FaPhone />}
                                />
                                <CardGridItem
                                    title={"Your Email:"}
                                    value={demographicData["data"][
                                        "email"
                                    ].toLowerCase()}
                                    icon={<FaEnvelope />}
                                />
                            </div>
                        </>
                    ) : (
                        <p>Data is still loading....</p>
                    )}
                </main>
            </div>
        </>
    );
};

export default Home;
