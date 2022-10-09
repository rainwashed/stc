import { FetchResponse } from "../../index";

const defaultHeaders: object = {
    accept: "text/html, */*; q=0.01",
    "accept-encoding": "gzip, deflate, br",
    "accept-language": "en-US,en;q=0.9",
    "content-length": "0",
    origin: "https://studentconnect.bloomfield.org",
    referer: "https://studentconnect.bloomfield.org/",
    "sec-ch-ua": `"Google Chrome";v="105", "Not)A;Brand";v="8", "Chromium";v="105"`,
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "Windows",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36",
    "x-requested-with": "XMLHttpRequest",
};

async function checkInvalidRequest(requestObject: Promise<FetchResponse>) {
    return (await requestObject).status !== 500;
}

export { defaultHeaders };
export { checkInvalidRequest as checkValidRequest };
