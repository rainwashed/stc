import cheerio from "cheerio";
import fetch from "axios";
import { defaultRequestHeaders, isNumeric } from "./constants";

let fetchRoute =
    "https://studentconnect.bloomfield.org/studentportal/Home/LoadProfileData/Assignments";
let labelFilteringCriteria = /(&nbsp;|"| |)/gm;
let nameFilteringCriteria = /(&nbsp;|"| |)/gm;
let valueFilteringCriteria = /(&nbsp;|"|'|)/gm;

async function requestAssignmentsData(sessionToken: string) {
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
            let parentTable = $("body");
            let data: {}[] = [];

            parentTable.children().each((_: number, table) => {
                if (table.name !== "table") return;

                let _data: any = {
                    name: "",
                    session: "",
                    grade: 0,
                    progress_report: "",
                    teacher: {},
                    assignments: [],
                };
                // TODO: Fix name resolution to actually be readable (ex: Per\n\t\t\t\t\tPer: 1   MYP Honors Microeconomics 9 (56202)\n\t\t\t\t   MYP Honors Microeconomics 9 (56202)\n\t\t\t\t -> Per: 1 MYP Honors Microeconomics 9 (56202))
                let courseName =
                    $(table)
                        .find("caption > label")
                        .text()
                        .replace(nameFilteringCriteria, "") +
                    $(table)
                        .find("caption")
                        .text()
                        .replace(nameFilteringCriteria, "") +
                    $(table)
                        .find("caption > b")
                        .text()
                        .replace(nameFilteringCriteria, "");
                let courseSession = $(table)
                    .find("thead > tr:first-child > td:first-child > b")
                    .text()
                    .replace(nameFilteringCriteria, "");

                // TODO: Work on getting the course grade
                let courseGrade: any = $(table)
                    .find("thead > tr:first-child > td:first-child")
                    .children()
                    .each((_: number, e) => {
                        console.log($(e).text());
                    });

                let courseProgressReport = $(table)
                    .find("thead > tr:first-child > td:first-child > a")
                    .attr("href");
                let teacherDetail = {
                    name: $(table)
                        .find("thead > tr:first-child > td:last-child > a")
                        .text()
                        .trim(),
                    email: $(table)
                        .find("thead > tr:first-child > td:last-child > a")
                        .attr("href")
                        ?.toLowerCase()
                        .trim(),
                };

                let courseLabels = $(table)
                    .find("thead > tr:last-child")
                    .children()
                    .map((_: number, elem) => {
                        return $(elem)
                            .text()
                            .toLowerCase()
                            .replace(labelFilteringCriteria, "")
                            .trim();
                    })
                    .toArray();

                /* console.log(
                    courseDetail,
                    courseProgressReport,
                    teacherDetail,
                    courseLabels
                ); */

                _data.name = courseName;
                _data.session = courseSession;
                // _data.grade = courseGrade;
                _data.progress_report = courseProgressReport;
                _data.teacher = teacherDetail;

                let assignmentBody = $(table).find("tbody");

                assignmentBody.children().each((__: number, row) => {
                    let __data: {
                        [key: string]: string | boolean | number | undefined;
                    } = {};
                    let childrenAmount: number = $(row).children().length;

                    $(row)
                        .children()
                        .each((index: number, value) => {
                            // handle print
                            if ($(value).find("a").length > 0) {
                                __data[courseLabels[index]] = $(value)
                                    .find("a")
                                    .attr("href");
                            } else if (index === childrenAmount - 1) {
                                // handle not graded
                                __data[courseLabels[index]] =
                                    $(value).find("img").length > 0;
                            } else {
                                let textContent = $(value).text().trim();

                                if (isNumeric(textContent)) {
                                    __data[courseLabels[index]] =
                                        parseInt(textContent) ??
                                        parseFloat(textContent);
                                } else {
                                    __data[courseLabels[index]] = textContent;
                                }
                            }
                        });

                    _data.assignments.push(__data);
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

export default requestAssignmentsData;
