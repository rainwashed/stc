import cheerio from "cheerio";
import fetch from "axios";
import { defaultRequestHeaders } from "./constants";

async function requestDemographicData(sessionToken: string) {
    return new Promise(async (resolve, reject) => {
        if (sessionToken.trim() === "") reject("No session token provided.");
        try {
            let req = await fetch.get(
                "https://studentconnect.bloomfield.org/studentportal/Home/LoadProfileData/Demographics",
                {
                    headers: {
                        ...defaultRequestHeaders,
                        cookie: `ASP.NET_SessionId=${sessionToken}`,
                    },
                }
            );

            let $ = cheerio.load(String(req.data));

            resolve(
                $(
                    "body > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(1) > td:nth-child(2)"
                ).text()
            );
        } catch (error) {
            reject(error);
        }
    });
}

export default requestDemographicData;
