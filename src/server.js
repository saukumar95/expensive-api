import Fastify from 'fastify'
import app from './app/app.js'

const host = process.env.HOST ?? 'localhost'
const port = process.env.PORT ? Number(process.env.PORT) : 5000
const server = Fastify({ logger: true })


await server.register(app)

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