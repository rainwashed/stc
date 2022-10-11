// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<string>
) {
    res.status(200)
        .setHeader("Content-Type", "application/text")
        .send(
            "This is the generated api route from the Next.js creator. Use this to check the server status."
        );
}
