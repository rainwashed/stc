// packages
import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";
import { load as cheerioLoad } from "cheerio";

// libraries
import { FetchResponse } from "../../index";
import { checkValidRequest, defaultHeaders } from "./_constants";

const endroute: string =
    "https://studentconnect.bloomfield.org/studentportal/Home/LoadProfileData/Demographics";

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
    let tableContent = $(
        "html > body > table > tbody > tr > td:nth-child(2) > table > tbody"
    ).children();
    let data: any = {};

    tableContent.each((index, tableRow) => {
        let c = $(tableRow);
        let labels = c.find("td b label");
        let values = c.children().filter((_, match) => {
            let m = $(match).text().trim().toLowerCase();

            return m.includes(":") === false;
        });

        labels.each((i, e) => {
            let name = $(e)
                .text()
                .toLowerCase()
                .trim()
                .replaceAll(" ", "_")
                .replaceAll(":", "");
            let val = $(values[i]).text().trim();

            data[name] = val;
        });
    });

    return res.status(200).json({
        error: false,
        data,
    });
}
