const { ApolloServer } = require('apollo-server')
const typeDefs = require('./types')
const resolvers = require('./resolvers')
const mongoose = require('mongoose')

// Express Port/App Declaration
// var PORT = process.env.PORT || 3000

// Database configuration for mongoose
// db: inmotion
mongoose.connect('mongodb://jrs341:' + dbPass + '@ds123181.mlab.com:23181/inmotion')
// Hook mongoose connection to db
const db = mongoose.connection

// Log any mongoose errors
db.on('error', (error) => {
  console.log('\x1b[31m%s\x1b[0m', '‼️  Mongoose Error: ', error)
})

// Log a success message when we connect to our mongoDB collection with no issues
db.once('open', () => {
  console.log('\x1b[32m%s\x1b[0m', '✅  Mongoose connection successful.')
})

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {},
  engine: true
})

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log('\x1b[32m%s\x1b[0m',`🚀  Server ready at ${url}`)
})