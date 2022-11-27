import cheerio from "cheerio";
import fetch from "axios";
import { defaultRequestHeaders } from "./constants";

let fetchRoute =
    "https://studentconnect.bloomfield.org/studentportal/Home/LoadProfileData/Health";
let labelFilteringCriteria = /( )/gm;
let valueFilteringCriteria = /(&nbsp;|"|'|)/gm;

async function requestHealthData(sessionToken: string) {
    return new Promise(async (resolve, reject) => {
        if (sessionToken.trim() === "") reject("No session token provided.");
        try {
            let req = await fetch.get(fetchRoute, {
                headers: {
                    ...defaultRequestHeaders,
                    cookie: `ASP.NET_SessionID=${sessionToken}`,
                },
            });

            let $ = cheerio.load(String(req.data));

            // TODO: Work on the health api (my account doesn't have any data)
        } catch (error: any) {
            if (error.response) {
                reject(
                    `Request to ${fetchRoute} returned a server status of ${error?.response?.status}. (This is most likely because of a poor token)`
                );
            } else if (error.request) {
                reject(
                    `Request to ${fetchRoute} was unable to be sent. (This is most likely because the server is down)`
                );
            } else {
                reject(error);
            }
        }
    });
}

export default requestHealthData;
