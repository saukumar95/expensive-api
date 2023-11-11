export const getHelloWorldSchema = {
    description: 'Get Hello world from API',
    tags: ['First API'],
    response: {
        200: {
            description: 'Successful response',
            type: 'object',
            properties: {
                hello: { type: 'string' }
            },
            examples: [{
                hello: 'World'
            }]
        },
        404: {
            description: 'When endpoint is not present',
            type: 'object',
            properties: {
                code: {
                    type: 'string'
                },
                message: {
                    type: 'string'
                }
            },
            examples: [{
                code: 'ENDPOINT_NOT_FOUND',
                message: 'Enpoint is not available or created yet',
            }]
        },
        500: {
            description: 'Failed response',
            type: 'object',
            properties: {
                code: {
                    type: 'string'
                },
                message: {
                    type: 'string'
                }
            },
            examples: [{
                code: 'ENDPOINT_ERROR',
                message: 'Cannot process the request',
            }]
        }
    }
}