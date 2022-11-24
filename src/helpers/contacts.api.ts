import cheerio from "cheerio";
import fetch from "axios";
import { defaultRequestHeaders } from "./constants";

let labelFilteringCriteria = /:/gm;
let fetchRoute =
    "https://studentconnect.bloomfield.org/studentportal/Home/LoadProfileData/Contacts";

async function requestContactsData(sessionToken: string) {
    return new Promise(async (resolve, reject) => {
        if (sessionToken.trim() === "") reject("No session token provided.");
        try {
            let req = await fetch.get(fetchRoute, {
                headers: {
                    ...defaultRequestHeaders,
                    cookie: `ASP>.NET_SessionID=${sessionToken}`,
                },
            });

            let $ = cheerio.load(String(req.data));
            let data: { [key: string]: string | null } = {};
            let primaryTable = $("body > table > tbody > tr:nth-child(1)");
            let householdTable = $("body > table > tbody > tr:nth-child(2)");
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

export default requestContactsData;
