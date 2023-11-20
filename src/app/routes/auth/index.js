import fastifyPassport from '@fastify/passport'
import { getGreetSchema } from './auth.schema.js'

const defaultErrorMessage = 'Uh! Something went wrong.'

export default async (instance) => {
    const greet = async (req, reply) => {
        reply.type('application/json')
        try {
            reply.send({
                success: true,
                message: `Hello! ${req.user.displayName}`,
            })
        } catch (error) {
            reply.code(500)
            reply.send({
                success: false,
                message: error ? error.message : defaultErrorMessage,
            })
            request.log.error(error)
        }
    }

    const loginCallback = async (req, reply) => {
        reply.type('application/json')
        try {
            reply.redirect('/api/auth/greet')
        } catch (error) {
            reply.code(500)
            reply.send({
                success: false,
                message: error ? error.message : defaultErrorMessage,
            })
            request.log.error(error)
        }
    }

    const logout = async (req, reply) => {
        reply.type('application/json')
        try {
            req.logout()
            reply.code(200)
            reply.send({ success: true })
        } catch (error) {
            reply.code(500)
            reply.send({
                success: false,
                message: error ? error.message : defaultErrorMessage,
            })
            req.log.error(error)
        }
    }

    instance.get('/greet', { schema: getGreetSchema }, greet)
    instance.get(
        '/google/callback',
        {
            schema: { hide: true },
            preValidation: fastifyPassport.authenticate('google', {
                scope: ['profile'],
            }),
        },
        loginCallback
    )
    instance.get(
        '/login',
        fastifyPassport.authenticate('google', { scope: ['profile'] })
    )
    instance.get('/logout', { schema: {} }, logout)
}
