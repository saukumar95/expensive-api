export const getGreetSchema = {
    description: 'Get Greet from API',
    tags: ['Auth Service'],
    response: {
        200: {
            description: 'Successful response',
            type: 'object',
            properties: {
                code: {
                    type: 'string',
                },
                success: { type: 'boolean' },
                message: { type: 'string' },
            },
            examples: [
                {
                    code: '200',
                    success: true,
                    message: 'Hello! XYZ',
                },
            ],
        },
        404: {
            description: 'When endpoint is not present',
            type: 'object',
            properties: {
                code: {
                    type: 'string',
                },
                success: {
                    type: 'boolean',
                },
                message: {
                    type: 'string',
                },
            },
            examples: [
                {
                    code: 'ENDPOINT_NOT_FOUND',
                    success: false,
                    message: 'Enpoint is not available or created yet',
                },
            ],
        },
        500: {
            description: 'Failed response',
            type: 'object',
            properties: {
                code: {
                    type: 'string',
                },
                success: {
                    type: 'boolean',
                },
                message: {
                    type: 'string',
                },
            },
            examples: [
                {
                    code: 'ENDPOINT_ERROR',
                    success: false,
                    message: 'Cannot process the request',
                },
            ],
        },
    },
}
