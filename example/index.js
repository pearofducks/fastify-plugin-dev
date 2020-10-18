const fastify = require('fastify')();
const webpack = require('webpack')
const webpackConfig = require('./webpack.config')

const compiler = webpack(webpackConfig)
const { publicPath } = webpackConfig.output

const setupIndex = fast => {
  fast.get('/', (_, reply) => {
    reply.type('text/html; charset=utf-8').send(`
      <!DOCTYPE html>
      <html lang='en'>
        <head>
          <meta charset='UTF-8'/>
          <title>Fastify dev example</title>
        </head>
        <body>
          <div id='root'></div>
          <script src='/assets/main.js'></script>
        </body>
      </html>`)
  })
}

;(async () => {
  await fastify.register(require('fastify-express'))
  await fastify.register(require('../index'), { compiler, devMiddleware: { publicPath } })
  setupIndex(fastify)
  await fastify.listen(3000)
})()
