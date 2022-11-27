import cheerio from "cheerio";
import fetch from "axios";
import { defaultRequestHeaders, isNumeric } from "./constants";

let fetchRoute =
    "https://studentconnect.bloomfield.org/studentportal/Home/LoadProfileData/Pulse";
let labelFilteringCriteria = /( )/gm;
let valueFilteringCriteria = /(&nbsp;|"|'|)/gm;

async function requestPulseData(sessionToken: string) {
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
            let data: {}[] = [];
            let tableLabels = [
                "class",
                "teacher",
                "period",
                "room",
                "term",
                "letter_grade",
                "percent_grade",
                "absence_count",
                "tardie_count",
                "missing_assignment_count",
            ];
            let table = $("#SP-Pulse > tbody");

            table.children().each((_: number, row) => {
                let _data: any = {};
                $(row)
                    .children()
                    .each((index: number, elem) => {
                        let val: string | number = $(elem).text().trim();

                        if (isNumeric(val) && tableLabels[index] !== "period") {
                            val = parseInt(val);
                        } else if (val.endsWith("%")) {
                            val = parseFloat(val.slice(0, -1));
                        }

                        _data[tableLabels[index]] = val;
                    });

                data.push(_data);
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

export default requestPulseData;
