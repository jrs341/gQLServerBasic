const { ApolloServer } = require('apollo-server')
const typeDefs = require('./types')
const resolvers = require('./resolvers')
const mongoose = require('mongoose')
const faker = require('faker')
const Customer = require('./models/customerModel')
const Employee = require('./models/employeeModel')
const Meter = require('./models/meterReadingsModel')
// Express Port/App Declaration
const PORT = process.env.PORT || 3010

// Database configuration for mongoose
// db: inmotion
mongoose.connect('mongodb://jrs341:HHCwc3et0@ds137687.mlab.com:37687/demo')
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
  cors: true,
  introspection: true,
  playground: true,
  // engine: true,
  context: {}
})

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.

server.listen(PORT).then(() => {
  console.log('\x1b[32m%s\x1b[0m',`🚀  Server ready at ${PORT}`)
})

// for (var i = 0; i < 40; i++) {
//   const body = {
//     given_name:faker.fake('{{name.firstName}}'),
//     family_name:faker.fake('{{name.lastName}}'),
//     phone_number:faker.phone.phoneNumber(),
//     email:faker.internet.email(),
//     address_line_1:faker.address.streetName(),
//     locality:faker.address.city(),
//     administrative_district_level_1:faker.address.stateAbbr(),
//     postal_code:faker.address.zipCode(),
//     drivers_license_num:faker.random.alphaNumeric(),
//     drivers_license_state:faker.address.stateAbbr()
//   }
//   console.log('**** body *****', body)
//   const customer = new Customer(body)
//   console.log('**** customer ****', customer)
//   customer.save((error, doc) => {
//     if (error) {
//       console.log('**** error *****', error)
//     } else {
//       console.log('**** doc ****', doc)
//     }
//   })
// }

// meterIds = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'Cabin 1', 'Cabin 2', 'Cabin 3', 'Cabin 4', 'Office', 'Shop', 'Main Cabin', 'Meter 1', 'Meter 2', 'A1', 'A2']

// meterIds.map(id => {
//   const body = {
//     meter: id,
//     meterId: faker.random.number({min:10000000, max:99999999})
//   }
//   console.log('**** body *****', body)
//   const meter = new Meter(body)
//   console.log('**** meter ****', meter)
//   meter.save((error, doc) => {
//     if (error) {
//       console.log('**** error *****', error)
//     } else {
//       console.log('**** doc ****', doc)
//     }
//   })
// })