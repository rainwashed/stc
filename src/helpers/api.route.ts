import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { apiRouteMiddleware } from "./constants";
import requestDemographicData from "./demographic.api";
import requestContactsData from "./contacts.api";

function apiRoute(
    fastify: FastifyInstance,
    opts: FastifyPluginOptions,
    done: any
) {
    fastify.use(apiRouteMiddleware);

    fastify.get("/", (req, res) => {
        res.code(200).send(
            JSON.stringify({
                error: false,
                data: {
                    routes: {
                        demographic: "/api/demographic",
                        contacts: "/api/contacts",
                    },
                },
            })
        );
    });

    fastify.get("/demographic", async (req, res) => {
        try {
            let call = await requestDemographicData(
                req.headers["sessioncookie"] as string
            );
            res.code(200).send(
                JSON.stringify({
                    error: false,
                    data: call,
                })
            );
        } catch (error) {
            res.code(500).send(
                JSON.stringify({
                    error: true,
                    message: String(error),
                    reason: "/demographic GET failed.",
                })
            );
        }
    });

    fastify.get("/contacts", async (req, res) => {
        try {
            let call = await requestContactsData(
                req.headers["sessioncookie"] as string
            );
            res.code(200).send(
                JSON.stringify({
                    error: false,
                    data: call,
                })
            );
        } catch (error) {
            res.code(500).send(
                JSON.stringify({
                    error: true,
                    message: String(error),
                    reason: "/contacts GET failed.",
                })
            );
        }
    });

    done();
}

export default apiRoute;
