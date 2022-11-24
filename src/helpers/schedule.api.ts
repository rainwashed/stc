import cheerio from "cheerio";
import fetch from "axios";
import { defaultRequestHeaders } from "./constants";

let fetchRoute =
    "https://studentconnect.bloomfield.org/studentportal/Home/LoadProfileData/Schedule";
let labelFilteringCriteria = /( )/gm;
let valueFilteringCriteria = /(&nbsp;|"|'|)/gm;

async function requestScheduleData(sessionToken: string) {
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
            let labelRow = $("#SP-Schedule > thead > tr");
            let contentRow = $("#SP-Schedule > tbody");
            let labelArray: string[] = [];

            labelRow.children().each((_: number, elem) => {
                if (elem.name !== "th") return;
                let label = $(elem)
                    .find("label")
                    .text()
                    .trim()
                    .replace(labelFilteringCriteria, "")
                    .toLowerCase();

                labelArray.push(label);
            });

            console.log(labelArray);

            contentRow.children().each((_: number, row) => {
                let _data: { [key: string]: string | {} } = {};
                $(row)
                    .children()
                    .each((__: number, elem) => {
                        let targetKey = labelArray[__ - 1];
                        if (typeof targetKey === "undefined") return;

                        // teacher name has an email
                        if ($(elem).find("a").length > 0) {
                            let teacherName = $(elem)
                                .find("a")
                                .text()
                                .replace(valueFilteringCriteria, "")
                                .trim();
                            let teacherEmail = $(elem)
                                .find("a")
                                .attr("href")
                                ?.slice(7)
                                .toLowerCase();

                            _data[targetKey] = {
                                name: teacherName,
                                email: teacherEmail,
                            };
                        } else {
                            _data[targetKey] = $(elem)
                                .text()
                                .replace(valueFilteringCriteria, "")
                                .trim();
                        }
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

export default requestScheduleData;
