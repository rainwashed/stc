import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { apiRouteMiddleware } from "./constants";
import requestDemographicData from "./demographic.api";

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
                    },
                },
            })
        );
    });

    fastify.get("/demographic", async (req, res) => {
        let call = await requestDemographicData(
            req.headers["sessioncookie"] as string
        );
        res.send(call);
    });

    done();
}

export default apiRoute;
