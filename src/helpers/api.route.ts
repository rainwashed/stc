import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { apiRouteMiddleware } from "./constants";
import requestDemographicData from "./demographic.api";
import requestContactsData from "./contacts.api";
import requestScheduleData from "./schedule.api";
import requestEnrollmentData from "./enrollment.api";
import requestHealthData from "./health.api";
import requestAttendanceData from "./attendance.api";
import requestCafeteriaData from "./cafeteria.api";
import requestActivitiesData from "./activities.api";
import requestGPAData from "./gpa.api";
import requestAssignmentsData from "./assignments.api";

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

    fastify.get("/schedule", async (req, res) => {
        try {
            let call = await requestScheduleData(
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
                    reason: "/schedule GET failed.",
                })
            );
        }
    });

    fastify.get("/enrollment", async (req, res) => {
        try {
            let call = await requestEnrollmentData(
                req.headers["sessioncookie"] as string
            );
            res.code(200).send(
                JSON.stringify({
                    error: true,
                    data: call,
                })
            );
        } catch (error) {
            res.code(500).send(
                JSON.stringify({
                    error: true,
                    message: String(error),
                    reason: "/enrollment GET failed.",
                })
            );
        }
    });

    fastify.get("/health", async (req, res) => {
        try {
            let call = await requestHealthData(
                req.headers["sessioncookie"] as string
            );
            res.code(200).send(
                JSON.stringify({
                    error: true,
                    data: call,
                })
            );
        } catch (error) {
            res.code(500).send(
                JSON.stringify({
                    error: true,
                    message: String(error),
                    reason: "/health GET failed.",
                })
            );
        }
    });

    fastify.get("/attendance", async (req, res) => {
        try {
            let call = await requestAttendanceData(
                req.headers["sessioncookie"] as string
            );
            res.code(200).send(
                JSON.stringify({
                    error: true,
                    data: call,
                })
            );
        } catch (error) {
            res.code(500).send(
                JSON.stringify({
                    error: true,
                    message: String(error),
                    reason: "/attendance GET failed.",
                })
            );
        }
    });

    fastify.get("/cafeteria", async (req, res) => {
        try {
            let call = await requestCafeteriaData(
                req.headers["sessioncookie"] as string
            );
            res.code(200).send(
                JSON.stringify({
                    error: true,
                    data: call,
                })
            );
        } catch (error) {
            res.code(500).send(
                JSON.stringify({
                    error: true,
                    message: String(error),
                    reason: "/cafeteria GET failed.",
                })
            );
        }
    });

    fastify.get("/activities", async (req, res) => {
        try {
            let call = await requestActivitiesData(
                req.headers["sessioncookie"] as string
            );
            res.code(200).send(
                JSON.stringify({
                    error: true,
                    data: call,
                })
            );
        } catch (error) {
            res.code(500).send(
                JSON.stringify({
                    error: true,
                    message: String(error),
                    reason: "/activities GET failed.",
                })
            );
        }
    });

    fastify.get("/gpa", async (req, res) => {
        try {
            let call = await requestGPAData(
                req.headers["sessioncookie"] as string
            );
            res.code(200).send(
                JSON.stringify({
                    error: true,
                    data: call,
                })
            );
        } catch (error) {
            res.code(500).send(
                JSON.stringify({
                    error: true,
                    message: String(error),
                    reason: "/gpa GET failed.",
                })
            );
        }
    });

    fastify.get("/assignments", async (req, res) => {
        try {
            let call = await requestAssignmentsData(
                req.headers["sessioncookie"] as string
            );
            res.code(200).send(
                JSON.stringify({
                    error: true,
                    data: call,
                })
            );
        } catch (error) {
            res.code(500).send(
                JSON.stringify({
                    error: true,
                    message: String(error),
                    reason: "/assignments GET failed.",
                })
            );
        }
    });

    done();
}

export default apiRoute;
