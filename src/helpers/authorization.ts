import fetch, { AxiosResponse } from "axios";
import { defaultRequestHeaders } from "./constants";
import { mainRoute, loginRoute } from "../settings.json";
import FormData from "form-data";

async function requestNewSessionCookie(): Promise<string> {
    let req = await fetch.get(mainRoute, {
        method: "GET",
        headers: defaultRequestHeaders,
    });

    if (req.status !== 200)
        return JSON.stringify({
            error: true,
            message: `Request status code to ${mainRoute} did not return 200!`,
            reason: "req.status != 200",
        });

    console.log(req.status, req.headers);

    return JSON.stringify({
        error: false,
        data: {
            sessionCookie: (req.headers["set-cookie"]?.[0] as string)
                .split(" ")[0]
                .split("=")[1]
                .slice(0, -1),
        },
    });
}

// TODO: Continue the efforts on reverse-engineering the authentication of the MiStar site.
// NOTE: Now the axios request is not showing a 500 code, but still the username and password do not work. Could be a problem with the request structure.

async function loginifySessionCookie(
    username: string | number,
    password: string | number,
    cookie: string
) {
    let submissionFormData: FormData = new FormData();
    submissionFormData.append("districtid", "connect");
    submissionFormData.append("Pin", username.toString().trim());
    submissionFormData.append("Password", password.toString().trim());
    submissionFormData.append("GuildFromQ", "");

    let req = await fetch.post(loginRoute, {
        headers: {
            // ...defaultRequestHeaders,
            cookie: `ASP.NET_SessionId=${cookie}`,
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        data: `districtid=connect&Pin=${username}&Password=${password}&GuidFromQ=`,
    });

    let responseStatus = await req.data;

    console.log("USED_FORM_DATA", submissionFormData);
    console.log("RESPONSE STATUS", responseStatus);
}

export { requestNewSessionCookie, loginifySessionCookie };
