import Fastify from 'fastify'
import fastifyPassport from '@fastify/passport'
import fastifySecureSession from '@fastify/secure-session'
import { OAuth2Strategy } from 'passport-google-oauth'
import app from './app/app.js'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'url'

const host = process.env.HOST ?? 'localhost'
const port = process.env.PORT ? Number(process.env.PORT) : 5000
const server = Fastify({ logger: true })

await server.register(app)
// set up secure sessions for @fastify/passport to store data in
server.register(fastifySecureSession, {
    key: fs.readFileSync(
        path.join(
            path.dirname(fileURLToPath(import.meta.url)),
            'not-so-secret-key'
        )
    ),
    cookie: { path: '/' },
})

// initialize @fastify/passport and connect it to the secure-session storage. Note: both of these plugins are mandatory.
server.register(fastifyPassport.initialize())
server.register(fastifyPassport.secureSession())

fastifyPassport.use(
    'google',
    new OAuth2Strategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: process.env.CALLBACK_URL,
        },
        function (accessToken, refreshToken, profile, cb) {
            cb(undefined, profile)
        }
    )
)

fastifyPassport.registerUserDeserializer(async (user, req) => {
    return user
})

fastifyPassport.registerUserSerializer(async (user, req) => {
    return user
})

console.log('Routes: \n', server.printRoutes())
/**
 * Run the server!
 */
const start = async () => {
    try {
        await server.listen({ host, port })
    } catch (err) {
        server.log.error(err)
        process.exit(1)
    }
}
start()
