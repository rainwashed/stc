import {
    FastifyInstance,
    FastifyPluginOptions,
    RouteGenericInterface,
} from "fastify";
import { apiRouteMiddleware } from "./constants";
import { routes } from "./api/router";

function apiRoute(
    fastify: FastifyInstance,
    opts: FastifyPluginOptions,
    done: any
) {
    fastify.use(apiRouteMiddleware);

    fastify.get("/", async (req, res) => {
        res.code(200).send(
            JSON.stringify({
                error: false,
                data: Object.keys(routes).map((val: string) => `/api/${val}`),
            })
        );
    });

    interface IRequestRoute {
        route: string;
    }

    fastify.get("/:route", async (req, res) => {
        let route = ((req?.params as IRequestRoute)?.["route"] as string)
            .toLowerCase()
            .trim();

        if (!(route in routes)) {
            res.code(404).send(
                JSON.stringify({
                    error: true,
                    message: "That route does not exist.",
                    reason: `/${route} GET failed.`,
                })
            );

            return;
        }

        try {
            let call = await routes[route as keyof typeof routes](
                req.headers?.["sessioncookie"] as string
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
                    reason: "/",
                })
            );

            return;
        }
    });

    done();
}

export default apiRoute;
