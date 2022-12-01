import cheerio from "cheerio";
import fetch from "axios";
import { defaultRequestHeaders } from "../constants";

let labelFilteringCriteria = /(:|\/| |)/gm;
let valueFilteringCriteria = /:/gm;
let fetchRoute =
    "https://studentconnect.bloomfield.org/studentportal/Home/LoadProfileData/Contacts";

async function requestContactsData(sessionToken: string) {
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
            let data: { [key: string]: any } = {
                primaryData: {},
                householdData: {},
            };
            let primaryTable = $("body > table > tbody > tr:nth-child(1)");
            let householdTable = $("body > table > tbody > tr:nth-child(2)");

            primaryTable = primaryTable.find("td > table");
            householdTable = householdTable.find("td > table");

            // getting the labels for the data
            primaryTable
                .find("thead > tr")
                .children()
                .each((_: number, elem) => {
                    let label = $(elem).find("th > label").text();
                    label = label
                        .trim()
                        .replace(labelFilteringCriteria, "")
                        .toLowerCase();

                    console.log(label);

                    data.primaryData[label] = [];
                });

            // assigning data for primaryTable with said labels
            primaryTable
                .find("tbody")
                .children()
                .each((_: number, row) => {
                    $(row)
                        .children()
                        .each((_: number, elem) => {
                            let _data: string | boolean = $(elem)
                                .text()
                                .trim()
                                .replace(valueFilteringCriteria, "");

                            // handle the checkmark
                            if (_ === 5) {
                                _data = $(elem).find("img").length > 0;
                            }

                            console.log(_data);

                            let targetKey: string = Object.keys(
                                data.primaryData
                            )[_];
                            data.primaryData[targetKey].push(_data);
                        });
                });

            householdTable
                .find("thead > tr")
                .children()
                .each((_: number, elem) => {
                    let label = $(elem).find("th > label").text();
                    label = label
                        .trim()
                        .replace(labelFilteringCriteria, "")
                        .toLowerCase();

                    console.log(label);

                    data.householdData[label] = [];
                });

            householdTable
                .find("tbody")
                .children()
                .each((_: number, row) => {
                    $(row)
                        .children()
                        .each((_: number, elem) => {
                            let _data: string | boolean = $(elem)
                                .text()
                                .trim()
                                .replace(valueFilteringCriteria, "");

                            let targetKey: string = Object.keys(
                                data.householdData
                            )[_];
                            data.householdData[targetKey].push(_data);

                            // i am assuming "A" means attending under the "status" section
                        });
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

export default requestContactsData;
