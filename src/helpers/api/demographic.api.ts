import cheerio from "cheerio";
import fetch from "axios";
import { defaultRequestHeaders } from "../constants";

let labelFilteringCriteria = /(:|#| )/gm;
let fetchRoute =
    "https://studentconnect.bloomfield.org/studentportal/Home/LoadProfileData/Demographics";

async function requestDemographicData(sessionToken: string) {
    return new Promise(async (resolve, reject) => {
        if (sessionToken.trim() === "") reject("No session token provided.");
        try {
            let req = await fetch.get(fetchRoute, {
                headers: {
                    ...defaultRequestHeaders,
                    cookie: `ASP.NET_SessionId=${sessionToken}`,
                },
            });
            console.log(req);

            let $ = cheerio.load(String(req.data));
            let table = $(
                "body > table > tbody > tr > td:nth-child(2) > table > tbody"
            );

            let data: { [key: string]: string | null } = {};

            table.children().each((index: number, row) => {
                let label1 = $(row).find("td:nth-child(1) > b > label").text();
                let value1 = $(row).find("td:nth-child(2)").text();
                let label2 = $(row).find("td:nth-child(3) > b > label").text();
                let value2 = $(row).find("td:nth-child(4)").text();

                label1 = label1
                    .trim()
                    .replace(labelFilteringCriteria, "")
                    .toLowerCase();
                label2 = label2
                    .trim()
                    .replace(labelFilteringCriteria, "")
                    .toLowerCase();
                value1 = value1.trim();
                value2 = value2.trim();

                data[label1] = value1 !== "" ? value1 : null;
                data[label2] = value2 !== "" ? value2 : null;
            });

            resolve(data);
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

export default requestDemographicData;
