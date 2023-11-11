import AutoLoad from '@fastify/autoload'
import cors from '@fastify/cors'
import healthCheck from 'fastify-healthcheck'

import path from 'node:path'
import { fileURLToPath } from 'url'

const APP_DIR = path.dirname(fileURLToPath(import.meta.url))

const app = async (instance, opts) => {
    instance.register(healthCheck)
    instance.register(cors)

    await instance.register(AutoLoad, {
        dir: path.join(APP_DIR, 'plugins'),
        options: { ...opts },
    })

    await instance.register(AutoLoad, {
        dir: path.join(APP_DIR, 'routes'),
        options: {
            ...opts,
            prefix: instance.config.BASE_ROUTE_PREFIX
        },
    })

    instance.addHook('onReady', () => {
        instance.swagger()
    })
}

export default app;