// packages
import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";
import { Cheerio, Element, load as cheerioLoad } from "cheerio";

// libraries
import { FetchResponse } from "../../index";
import { checkValidRequest, defaultHeaders } from "./_constants";

const endroute: string =
    "https://studentconnect.bloomfield.org/studentportal/Home/LoadProfileData/Contacts";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {
    let headerCookie = req.headers?.["session-auth"];
    let dataReq: Promise<FetchResponse> = fetch(endroute, {
        method: "GET",
        headers: {
            ...defaultHeaders,
            cookie: `ASP.NET_SessionId=${headerCookie}`,
        },
    });

    if ((await checkValidRequest(dataReq)) === false) {
        // either corrupted request or (commonly) missing auth cookie

        return res.status(403).json({
            error: true,
            data: "Unable to obtain the specified data, did you check your auth session cookie?",
        });
    }

    let $ = cheerioLoad(await (await dataReq).text());

    let table1Content: Cheerio<Element> = $(
        "body > table > tbody > tr:nth-child(1) > td > table"
    ).children(); // this is the primary contacts table
    let table1LabelsElement: Element = table1Content[1];
    let table1ValuesElement: Element = table1Content[2];

    let table1LabelsArr: string[] = [];
    let table1ValuesArr: any[] = [];

    $(table1LabelsElement)
        .find("tr")
        .children()
        .each((_: number, e: Element) => {
            table1LabelsArr.push(
                ($(e).find("label").attr("for") as string).trim().toLowerCase()
            );
        });

    $(table1ValuesElement)
        .children()
        .each((_: number, e: Element) => {
            let v: (string | boolean)[] = [];
            $(e)
                .children()
                .each((_, f: Element) => {
                    let b: boolean = $(f).children().length > 0;
                    if (b === false) {
                        v.push(
                            $(f)
                                .text()
                                .replace(/(\\n)|(\\t)/g, "")
                                .trim()
                        );
                    } else {
                        v.push(b);
                    }
                });

            let v2: any = {};
            v.forEach((val: string | boolean, i: number) => {
                let l = table1LabelsArr[i];
                v2[l] = val;
            });

            table1ValuesArr.push(v2);
        });

    // console.log("labels:", table1LabelsArr);
    // console.log("values:", table1ValuesArr);

    // this will be the household table

    let table2Content: Cheerio<Element> = $(
        "body > table > tbody > tr:nth-child(2) > td > table"
    ).children();
    let table2LabelsElement: Element = table2Content[1];
    let table2ValuesElement: Element = table2Content[2];

    let table2LabelsArr: string[] = [];
    let table2ValuesArr: any[] = [];

    $(table2LabelsElement)
        .find("tr")
        .children()
        .each((_: number, e: Element) => {
            table2LabelsArr.push(
                ($(e).find("label").text() as string).trim().toLowerCase()
            );
        });

    $(table2ValuesElement)
        .children()
        .each((_: number, e: Element) => {
            let v: (string | boolean)[] = [];
            $(e)
                .children()
                .each((_, f: Element) => {
                    v.push(
                        $(f)
                            .text()
                            // .replace(/(\\n)|(\\t)/g, "")
                            .trim()
                    );
                });

            let v2: any = {};
            v.forEach((val: string | boolean, i: number) => {
                let l = table2LabelsArr[i];
                v2[l] = val;
            });

            table2ValuesArr.push(v2);
        });

    console.log(table2ValuesArr);

    return res.status(200).json({
        error: false,
        data: {
            contacts: table1ValuesArr,
            household: table2ValuesArr,
        },
    });
}
