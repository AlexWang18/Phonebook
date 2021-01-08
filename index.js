const app = require('./app') //our express server
const http = require('http') //built in node http module
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

server.listen(config.PORT, (err) => {
    if (err) console.log('error in running the server ' + err.message)
    logger.info(`Server running on port ${config.PORT}`)
})
