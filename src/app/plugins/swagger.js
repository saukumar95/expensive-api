import swagger from '@fastify/swagger'
import swaggerUI from '@fastify/swagger-ui'
import fp from 'fastify-plugin'

const swaggerConfigOptions = {
    openapi: {
        info: {
            title: 'Expensify Swagger',
            description: 'Swagger for expensify app',
            version: '1.0.1'
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