import cheerio from "cheerio";
import fetch from "axios";
import { defaultRequestHeaders, isNumeric } from "../constants";

let fetchRoute =
    "https://studentconnect.bloomfield.org/studentportal/Home/LoadProfileData/Cafeteria";
let labelFilteringCriteria = /( )/gm;
let valueFilteringCriteria = /(&nbsp;|"|'|\$|)/gm;

async function requestCafeteriaData(sessionToken: string) {
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
            let data: any = {
                summary: {
                    charges: 0.0,
                    payments: 0.0,
                    balance: 0.0,
                },
                detail: [],
            };

            let cafeteriaSummaryValues = $("#tblBalance > tbody > tr");
            let cafeteriaDetail = $("#SP-Cafeteria > tbody");

            let cafeteriaSummaryLabels: string[] = [
                "charges",
                "payments",
                "balance",
            ];
            cafeteriaSummaryValues.children().each((_: number, value) => {
                let _value = $(value)
                    .text()
                    .trim()
                    .replace(valueFilteringCriteria, "");

                data.summary[cafeteriaSummaryLabels[_]] = parseFloat(_value);
            });

            let cafeteriaDetailLabel: string[] = [
                "date",
                "description",
                "location",
                "charge",
                "payment",
            ];
            cafeteriaDetail.children().each((_: number, row) => {
                let _data: { [key: string]: string | number } = {};
                $(row)
                    .children()
                    .each((__: number, value) => {
                        let _value = $(value)
                            .text()
                            .trim()
                            .replace(valueFilteringCriteria, "");

                        if (isNumeric(_value)) {
                            _data[cafeteriaDetailLabel[__]] =
                                parseFloat(_value);
                        } else {
                            _data[cafeteriaDetailLabel[__]] = _value;
                        }
                    });

                data.detail.push(_data);
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

export default requestCafeteriaData;
