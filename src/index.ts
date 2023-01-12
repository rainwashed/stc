import fastify, { FastifyInstance, FastifyRequest } from "fastify";
import middle from "@fastify/middie";
import cors from "@fastify/cors";
import { AddressInfo } from "net";

import apiRoute from "./helpers/api.route";
import {server} from "./settings.json";

const app: FastifyInstance = fastify({
    logger: true,
});

(async () => {
    await app.register(middle);
    await app.register(cors, {
        origin: "*"
    })
    await app.register(apiRoute, {
        prefix: "/api",
    });

    (async (): Promise<void> => {
        try {
            await app.listen({
                port: server.port || 3000,
		        host: server.host || "::1",
            });
            const address: string | AddressInfo | null = app.server.address();
            const port = typeof address === "string" ? address : address?.port;

            console.log(`Access @ ${server.host || "::1"}:${server.port || 3000}`);
        } catch (error) {
            app.log.error(error);
            process.exit(1);
        }
    })();
})();
