import fastify, { FastifyInstance, FastifyRequest } from "fastify";
import middle from "@fastify/middie";
import { AddressInfo } from "net";

import apiRoute from "./helpers/api.route";
import {
    loginifySessionCookie,
    requestNewSessionCookie,
} from "./helpers/authorization";
import { IApiResponse } from "./index.d";

const app: FastifyInstance = fastify({
    logger: true,
});

(async () => {
    await app.register(middle);
    await app.register(apiRoute, {
        prefix: "/api",
    });

    /*
    app.post("/session", async (req, res) => {
        let functionCall: IApiResponse = JSON.parse(
            await requestNewSessionCookie()
        );

        await loginifySessionCookie(
            req.headers["username"] as string,
            req.headers["password"] as string,
            functionCall?.data?.sessionCookie
        );

        // res.code(functionCall.error ? 502 : 200).send(
        //     JSON.stringify(functionCall)
        // );
    });
    */

    (async (): Promise<void> => {
        try {
            await app.listen({
                port: 3000,
            });
            const address: string | AddressInfo | null = app.server.address();
            const port = typeof address === "string" ? address : address?.port;

            console.log(`Access site here: ${port}`);
        } catch (error) {
            app.log.error(error);
            process.exit(1);
        }
    })();
})();
