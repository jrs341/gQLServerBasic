const { gql } = require('apollo-server')

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.

const typeDefs = gql`

  type Query {
    user: User
    allMovies: [Movie]
    searchMovies(query: String): [Movie]
    allCustomers: [Customer]
    currentCustomers: [Customer]
    getCustomer(id: String): Customer
    searchCustomer(query: String): [Customer]
    allMeters: [Meter]
    searchMeters: Meter
    getTivoliRiverInfo: TivoliRiverInfo
  }

  type Mutation {
    addMovie(
      title: String,
      genre: String,
      actors: String,
      year: String,
      ): Movie

    updateMovie(
      _id: String,
      title: String,
      genre: String,
      actors: String,
      year: String,
      ): Movie

    deleteMovie(_id: String): Movie

    changeLocation(
      _id: String,
      location: String
    ): Customer

    addCustomerToMeter(
      meterId: String,
      customerId: String
    ): Meter

    addMeterToCustomer(
      meterId: String,
      customerId: String
    ): Customer
  }

  type User {
    userId: String
  }
  
  type Movie {
    title: String
    genre: String
    actors: String
    year: String
    imdbId: String
    _id: String
  }

  type Customer {
    _id: String
    given_name: String
    family_name: String
    phone_number: String
    email: String
    address_line_1: String
    locality: String
    administrative_district_level_1: String
    postal_code: String
    country: String
    drivers_license_num: String
    drivers_license_state: String
    current_customer: Boolean
    meter: String
  }

  type Meter {
    _id: String
    meter: String
    meterId: String
    readings: [Reading]
    customer: String
    amp: String
  }

  type Reading {
    _id: String
    reading: Int
  }

  type RiverInfo {
    date: String
    level: String
  }

  type TrendInfo {
    lastReading: RiverInfo
    sixHourDelta: String
    twelveHourDelta: String
    twentyFourHourDelta: String
    fortyEightHourDelta: String
  }

  type TivoliRiverInfo {
    data: [RiverInfo]
    trendInfo: TrendInfo
  }
`;

module.exports = typeDefs