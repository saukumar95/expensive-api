import fastifyPassport from '@fastify/passport'
import { getHelloWorldSchema } from "./auth.schema.js";

export default async (instance) => {

    const helloWorld = async (req, reply) => {
        reply.type("application/json");
        try {
            reply.send({ message: `Hello! ${req.user.displayName}` })
        } catch (error) {
            reply.code(500)
            request.log.error(error)
        }
    }

    const loginCallback = async (req, reply) => {
        reply.type("application/json")
        try {
            reply.redirect("/api/auth")
        } catch (error) {
            reply.code(500)
            request.log.error(error)
        }
    }

    const logout = async (req, reply) => {
        req.logout()
        return { success: true }
    }

    instance.get("/greet", { schema: getHelloWorldSchema }, helloWorld);
    instance.get("/google/callback", { preValidation: fastifyPassport.authenticate('google', { scope: ['profile'] }) }, loginCallback);
    instance.get("/login", fastifyPassport.authenticate('google', { scope: ['profile'] }))
    instance.get('/logout', { schema: {} }, logout)
}