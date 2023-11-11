import swagger from '@fastify/swagger'
import swaggerUI from '@fastify/swagger-ui'
import fp from 'fastify-plugin'

const swaggerConfigOptions = {
    openapi: {
        info: {
            title: 'Test swagger',
            description: 'testing the fastify swagger api',
            version: '0.1.0'
        },
    },
}

const createSwaggerUiConfigOptions = (prefix) => ({
    routePrefix: `${prefix}/swagger`,
    staticCSP: true,
    exposeRoute: true
});

export default fp(async (instance) => {
    const prefix = instance.config.BASE_ROUTE_PREFIX
    await instance.register(swagger, swaggerConfigOptions)
    await instance.register(swaggerUI, createSwaggerUiConfigOptions(prefix))
})