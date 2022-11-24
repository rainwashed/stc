import { FastifyRequest } from "fastify";

const defaultRequestHeaders = {
    accept: "text/html, */*; q=0.01",
    "accept-encoding": "gzip, deflate, br",
    "accept-language": "en-US,en;q=0.9",
    "content-length": "0",
    origin: "https://studentconnect.bloomfield.org",
    referer: "https://studentconnect.bloomfield.org/",
    "sec-ch-ua": `"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"`,
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Linux"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "user-agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
    "x-requested-with": "XMLHttpRequest",
};

function apiRouteMiddleware(req: FastifyRequest, res: any, next: any) {
    res.setHeader("Content-Type", "application/json");
    if (
        typeof req.headers["sessioncookie"] === "undefined" ||
        req?.headers["sessioncookie"] === null
    ) {
        res.statusCode = 403;
        res.end(
            JSON.stringify({
                error: true,
                message: "Request does not contain authorization token.",
                reason: `sessionCookie was not detected in the req.headers in ${req.url}`,
            })
        );
    } else {
        next();
    }
}

function cheerioCheckExists(this: any, selector: string) {
    return this?.find(selector).length > 0;
}

export { defaultRequestHeaders, apiRouteMiddleware, cheerioCheckExists };
