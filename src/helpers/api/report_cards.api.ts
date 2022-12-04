import cheerio from "cheerio";
import fetch from "axios";
import { defaultRequestHeaders } from "../constants";

let fetchRoute =
    "https://studentconnect.bloomfield.org/studentportal/Home/LoadProfileData/SPDynamic_409";
let documentLoadRoute =
    "https://studentconnect.bloomfield.org/studentportal/Document/LoadDocument/";
let labelFilteringCriteria = /( )/gm;
let valueFilteringCriteria = /(&nbsp;|"|'|)/gm;

// Note: this returns practically synonymous data as the /marks route; just with added dates
async function requestReportCardsData(sessionToken: string) {
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
            let dataLabels: string[] = [
                "title",
                "notes",
                "document",
                "term",
                "school",
            ];
            let dataTable = $("#Table > tbody");

            dataTable.children().each((_: number, row) => {
                let _data: any = {};

                $(row)
                    .children()
                    .each((index: number, data_point) => {
                        // console.log("reached loop point");
                        // console.log($(data_point).text());

                        if ($(data_point).find("a").length > 0) {
                            let link = $(data_point)
                                .find("a")
                                .attr("href") as string;
                            link = link.substring(241, link.length - 350);
                            link = documentLoadRoute + link;
                            _data["document"] = link;
                        } else {
                            _data[dataLabels[index]] = $(data_point)
                                .text()
                                .replace(/(\t|\n)/g, "");
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

export default requestReportCardsData;
