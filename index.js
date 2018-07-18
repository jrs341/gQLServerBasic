const { ApolloServer } = require('apollo-server')
const typeDefs = require('./types')
const resolvers = require('./resolvers')
const mongoose = require('mongoose')

// Express Port/App Declaration
const PORT = process.env.PORT || 4000

// Database configuration for mongoose
// db: inmotion
mongoose.connect('mongodb://jrs341:HHCwc3et0@ds123181.mlab.com:23181/inmotion')
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
  context: {}
  // apiKey: 'service:jrs341-1669:Z68Ajb4D0_enyvDJa6nsaQ',
  // engine: true
})

server.get('/', (req, res) => {
	console.log('***** req *****', req)
	console.log('***** res *****', res)
})

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
// server.applyMiddleware()
server.listen(PORT).then(() => {
	// console.log('**** url ****', url)
	// console.log('**** subscriptionsPath ****', subscriptionsPath)
	// console.log('***** server *****', server)
	console.log('**** port ****', process.env.PORT)
	// console.log('\x1b[32m%s\x1b[0m',`🚀  Server ready at `)
  console.log('\x1b[32m%s\x1b[0m',`🚀  Server ready at ${PORT}`)
})