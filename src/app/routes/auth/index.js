import { getHelloWorldSchema } from "./auth.schema.js";

export default async (instance) => {

    const helloWorld = async (req, reply) => {
        reply.type("application/json");
        try {
            return reply.send({ hello: 'world' })
        } catch (error) {
            reply.code(500)
            request.log.error(error)
        }
    }

    instance.get("", { schema: getHelloWorldSchema }, helloWorld);
}