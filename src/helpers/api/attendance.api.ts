import cheerio from "cheerio";
import fetch from "axios";
import { defaultRequestHeaders, isNumeric } from "../constants";

let fetchRoute =
    "https://studentconnect.bloomfield.org/studentportal/Home/LoadProfileData/Attendance";
let labelFilteringCriteria = /( )/gm;
let valueFilteringCriteria = /(&nbsp;|"|'|)/gm;

interface ISummaryByReason {
    present: number;
    present1st: number;
}
interface IData {
    summaryByReason: ISummaryByReason;
    summaryByClass: [];
    detail: [];
}

async function requestAttendanceData(sessionToken: string) {
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
                summaryByReason: {
                    present: 0,
                    present1st: 0,
                },
                summaryByClass: [],
                detail: [],
            };
            let summaryByReasonTable = $("#SP-AttendanceByReason > tbody");
            let summaryByClassTable = $("#SP-AttendanceByClass > tbody");
            let detailTable = $("#SP-AttendanceDetail > tbody");

            summaryByReasonTable.children().each((_: number, row) => {
                let periodCount = $(row).find("td:last-child").text();

                data.summaryByReason[["present", "present1st"][_]] =
                    parseInt(periodCount);
            });

            let summaryByClassLabels: string[] = [
                "period",
                "term",
                "course",
                "teacher",
                "tardy",
                "excused",
                "unexcused",
            ];

            summaryByClassTable.children().each((_: number, row) => {
                let _data: { [key: string]: string | {} } = {};

                $(row)
                    .children()
                    .each((__: number, value) => {
                        let targetKey = summaryByClassLabels[__];

                        if ($(value).find("a").length > 0) {
                            let teacherName = $(value)
                                .find("a")
                                .text()
                                .replace(valueFilteringCriteria, "")
                                .trim();
                            let teacherEmail = $(value)
                                .find("a")
                                .attr("href")
                                ?.slice(7)
                                .toLowerCase();

                            _data[targetKey] = {
                                name: teacherName,
                                email: teacherEmail,
                            };
                        } else {
                            let _value = $(value)
                                .text()
                                .replace(valueFilteringCriteria, "")
                                .trim();

                            if (isNumeric(_value) && targetKey !== "period") {
                                _data[targetKey] = parseInt(_value);
                            } else {
                                _data[targetKey] = _value;
                            }
                        }
                    });

                data.summaryByClass.push(_data);
            });

            let detailTableLabels: string[] = [
                "date",
                "period",
                "attendance",
                "course",
                "teacher",
            ];

            detailTable.children().each((_: number, row) => {
                let _data: { [key: string]: string | {} } = {};

                $(row)
                    .children()
                    .each((__: number, value) => {
                        let targetKey = detailTableLabels[__];

                        if ($(value).find("a").length > 0) {
                            let teacherName = $(value)
                                .find("a")
                                .text()
                                .replace(valueFilteringCriteria, "")
                                .trim();
                            let teacherEmail = $(value)
                                .find("a")
                                .attr("href")
                                ?.slice(7)
                                .toLowerCase();

                            _data[targetKey] = {
                                name: teacherName,
                                email: teacherEmail,
                            };
                        } else {
                            let _value = $(value)
                                .text()
                                .replace(valueFilteringCriteria, "")
                                .trim();

                            _data[targetKey] = _value;
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

export default requestAttendanceData;
