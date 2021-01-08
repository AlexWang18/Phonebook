require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI

exports.PORT = PORT
exports.MONGODB_URI = MONGODB_URI