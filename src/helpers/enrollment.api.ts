import cheerio from "cheerio";
import fetch from "axios";
import { defaultRequestHeaders } from "./constants";

let labelFilteringCriteria = /(:|\/| |)/gm;
let valueFilteringCriteria = /:/gm;
let fetchRoute =
    "https://studentconnect.bloomfield.org/studentportal/Home/LoadProfileData/SPDynamic_346";

async function requestEnrollmentData(sessionToken: string) {
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

            let mainInformationTable = $(
                "#Table > tbody > tr > td > table:nth-child(1) > tbody"
            );
            let lockerInformationTable = $(
                "#Table > tbody > tr > td > table:nth-child(6)"
            );
            let enrollmentHistoryTable = $(
                "#Table > tbody > tr > td > table:nth-child(11)"
            );

            let data: { [key: string]: { [key: string]: string | null } } = {
                mainInformation: {},
                lockerInformation: {},
                enrollmentInformation: {},
            };

            mainInformationTable.children().each((_: number, row) => {
                let labelElems = $(row)
                    .children()
                    .filter((__: number, elem) => {
                        return (
                            $(elem).attr("style")?.toLowerCase() ===
                            "white-space:nowrap"
                        );
                    });

                $(labelElems).each((_: number, elem) => {
                    let label = $(elem).text();
                    let value: string | null = $(elem).next().text();

                    label = label
                        .toLowerCase()
                        .replace(labelFilteringCriteria, "")
                        .trim();
                    value = value.replace(valueFilteringCriteria, "").trim();
                    if (value === "" || value === "<Unset>") {
                        value = null;
                    }

                    data.mainInformation[label] = value;
                });
            });

            let lockerInformationTableLabels = $(lockerInformationTable).find(
                "thead > tr"
            );
            let lockerInformationTableValues = $(lockerInformationTable).find(
                "tbody > tr"
            );
            let lockerInformationLabels: string[] = [];

            lockerInformationTableLabels.children().each((_: number, label) => {
                let _label = $(label)
                    .text()
                    .toLowerCase()
                    .replace(labelFilteringCriteria, "")
                    .trim();
                lockerInformationLabels.push(_label);
            });

            lockerInformationTableValues.children().each((_: number, value) => {
                let _value: string | null = $(value)
                    .text()
                    .replace(valueFilteringCriteria, "")
                    .trim();

                if (_value === "") {
                    _value = null;
                }

                data.lockerInformation[lockerInformationLabels[_]] = _value;
            });

            let enrollmentHistoryTableLabels = $(enrollmentHistoryTable).find(
                "thead > tr"
            );
            let enrollmentHistoryTableValues = $(enrollmentHistoryTable)
                .find("tbody > tr")
                .children();

            enrollmentHistoryTableLabels.children().each((_: number, label) => {
                let _label = $(label)
                    .text()
                    .toLowerCase()
                    .replace(labelFilteringCriteria, "")
                    .trim();
                let _value: string | null = $(enrollmentHistoryTableValues[_])
                    .text()
                    .replace(valueFilteringCriteria, "")
                    .trim();

                if (_value === "") {
                    _value = null;
                }

                data.enrollmentInformation[_label] = _value;
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

export default requestEnrollmentData;
