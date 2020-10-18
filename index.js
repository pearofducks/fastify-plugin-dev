const hotClient = require('webpack-hot-client')
const devMiddleware = require('webpack-dev-middleware').default
const fp = require('fastify-plugin')

const setupHot = (wpCompiler) => {
  return new Promise((resolve) => {
    const client = hotClient(wpCompiler)
    const { server: hotServer } = client
    hotServer.on('listening', () => resolve(client))
  })
}

const dev = fp(async (fastify, opts, done) => {
  // TODO: uncomment when fastify-express has been updated
  // if (!fastify.hasDecorator('express')) throw 'fastify-express must be registered before this plugin'

  await setupHot(opts.compiler)
  await fastify.use(devMiddleware(opts.compiler, opts.devMiddleware))

  done()
}, { fastify: '3.x', name: 'dev' })

module.exports = dev
