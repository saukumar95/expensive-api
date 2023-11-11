import env from '@fastify/env'
import fp from 'fastify-plugin'

const schema = {
    type: 'object',
    properties: {
        BASE_ROUTE_PREFIX: {
            type: 'string',
            default: ''
        },
        CLIENT_ID: {
            type: 'string',
            default: ''
        },
        CLIENT_SECRET: {
            type: 'string',
            default: ''
        }


    }
}

const options = {
    schema: schema,
    dotenv: true,
}

export default fp(async (instance) => {
    await instance.register(env, options)
})