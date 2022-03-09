import Koa from 'koa'
import Router from 'koa-router'

import next from 'next'

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const koa = new Koa()
    const router = new Router()

    router.all('/api', async (ctx) => {

    })
    router.get('(.*)', async (ctx) => {
        await handle(ctx.req, ctx.res)
        ctx.respond = false
    })

    koa.use(router.routes())
    koa.use(router.allowedMethods())

    koa.listen(port, () => {
        console.log(`> Listen on port ${port}`)
    })
})
