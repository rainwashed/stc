import cheerio from "cheerio";
import fetch from "axios";
import { defaultRequestHeaders } from "../constants";

let fetchRoute =
    "https://studentconnect.bloomfield.org/studentportal/Home/LoadProfileData/Marks";
let documentLoadRoute =
    "https://studentconnect.bloomfield.org/studentportal/Document/LoadDocument/";
let labelFilteringCriteria = /( )/gm;
let valueFilteringCriteria = /(&nbsp;|"|'|)/gm;

async function requestMarksData(sessionToken: string) {
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
            let parentalContainer = $("body > center");
            let tableLabels: string[] = [
                "period",
                "course",
                "teacher",
                "acad",
                "comments",
                "notes",
            ];

            parentalContainer.children().each((_: number, table) => {
                if (table.tagName !== "table") return;

                let _data: any = {};
                let tableLabel = $(table)
                    .find("caption")
                    .text()
                    .replace(/ /g, "_")
                    .toLowerCase()
                    .trim();
                let pdfLink = $(table)
                    .find("thead > tr.tblhdr2.mediumHighlight > td > div > a")
                    .attr("href");
                pdfLink = pdfLink?.substring(25, pdfLink.length - 2);
                pdfLink = documentLoadRoute + pdfLink;

                console.log(pdfLink);

                _data["label"] = tableLabel;
                _data["pdf_link"] = pdfLink;
                _data["courses"] = [];

                $(table)
                    .find("tbody")
                    .children()
                    .each((__: number, row) => {
                        let __data: any = {};
                        $(row)
                            .children()
                            .each((index: number, data_point) => {
                                if ($(data_point).find("a").length > 0) {
                                    let x = $(data_point).find("a");
                                    __data["teacher"] = {
                                        name: x.text(),
                                        email: x
                                            .attr("href")
                                            ?.slice(7)
                                            .toLowerCase(),
                                    };
                                } else {
                                    __data[tableLabels[index]] = $(data_point)
                                        .text()
                                        .replace(valueFilteringCriteria, "")
                                        .trim();
                                }
                            });

                        _data["courses"].push(__data);
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

export default requestMarksData;
