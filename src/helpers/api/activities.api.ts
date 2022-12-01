import cheerio from "cheerio";
import fetch from "axios";
import { defaultRequestHeaders } from "../constants";

let fetchRoute =
    "https://studentconnect.bloomfield.org/studentportal/Home/LoadProfileData/Activities";
let labelFilteringCriteria = /( )/gm;
let valueFilteringCriteria = /(&nbsp;|"|'|)/gm;

async function requestActivitiesData(sessionToken: string) {
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
            let activitiesTable = $("#SP-Activities > tbody");
            let activitiesTableLabels: string[] = [
                "begin_date",
                "end_date",
                "type",
                "activity",
                "grade_level",
                "service_time",
            ];
            let data: {}[] | null = [];

            activitiesTable.children().each((_: number, row) => {
                if (
                    $(row).find("td > label").length > 0 &&
                    $(row).find("td > label").text().toLowerCase() ===
                        "no data available"
                ) {
                    data = null;
                } else {
                    // NOTE: This section is assumed, not necessarily correct!!
                    let _data: { [key: string]: string } = {};
                    $(row)
                        .children()
                        .each((__: number, value) => {
                            let _value = $(value)
                                .text()
                                .trim()
                                .replace(valueFilteringCriteria, "");

                            _data[activitiesTableLabels[__]] = _value;
                        });

                    data?.push(_data);
                }
            });

            resolve(data);

            // TODO: Work on the activities api (my account doesn't have any data)
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

export default requestActivitiesData;
