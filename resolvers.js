const axios = require('axios')
const Customer = require('./models/customerModel')
const Meter = require('./models/meterReadingsModel')
const Movies = require('./models/movies')
const Users = require('./models/users')

const resolvers = {
  Query: {
    user: () => {
      const user = Users.find({}, (error, data) => {
        if (error) {
          return error
        } else {
          return data
        }
      })
      return user
    },

    allMovies: () => {
      const allMovies = Movies.find({}, (error, data) => {
        if (error) {
            return error
        } else {
            return data
        }
      })
      return allMovies
    },

    searchMovies: (parent, query) => {
      const searchResults = Movies.find({$text:
          { $search: query.query}}, (error, data) => {
        if (error) {
          return error
        } else {
          return data
        }
      })
      return searchResults
    },

    allCustomers: () => {
      const customers = Customer.find({}, (error, data) => {
        if (error) {
          return error
        } else {
          return data
        }
      })
      return customers
    },

    searchCustomer: (parent, query) => {
      const searchResults = Customer.find({$or: [
        {given_name: new RegExp(query.query, 'i')}, 
        {family_name: new RegExp(query.query, 'i')},
        {email: new RegExp(query.query, 'i')}
        ]},
        (error, data) => {
          if (error) {
            return error
          } else {
            return data
          }
        }).limit(10)
      return searchResults
    },

    allMeters: () => {
      const meters = Meter.find({}, (error, data) => {
        if (error) {
          return error
        } else {
          return data
        }
      })
      return meters
    },

    searchMeters: (parent, query) => {
      const searchResults = Meter.find({$text:
        {$search: query.query}}, (error, data) => {
          if (error) {
            return error
          } else {
            return data
          }
        return searchResults
      })
    },
    // TODO reduce this to res.data and let resolver handle
    getTivoliRiverInfo: (parent, query) => {
      const data = axios.get('https://waterservices.usgs.gov/nwis/iv/?format=json&indent=on&sites=08188800&period=P1D&parameterCd=00065&siteStatus=all')
      .then(res => {
        return res.data.value.timeSeries[0].values[1].value
      })
      .catch(error => {
        console.log('river error', error)
      })
      return data
    }
},
   Mutation: {
    addMovie: (parent, newData) => {
      const newMovie = new Movies(newData)
      newMovie.save((error, data) => {
        if (error) {
          return error
        } else {
          return data
        }
      })
      return newMovie
    },

    updateMovie: (parent, updateData) => {
      const updatedMovie = Movies.update(
        {_id: updateData.id},{ $set: updateData}, (error, data) => {
        if (error) {
          return error
        } else {
          return data
        }
      })
      return updatedMovie
    },

    deleteMovie: (parent, id) => {
      const deletedMovie = Movies.remove({_id: id}, (error, data) => {
        if (error) {
          return error
        } else {
          return data
        }
      })
      return deletedMovie
    }
},
  
  User: {
    userId: (parent) => {
      return parent.userId
    }
  },

  Movie: {
    title: (parent) => {
      return parent.title
    },
    genre: (parent) => {
      return parent.genre
    },
    actors: (parent) => {
      return parent.actors
    },
    year: (parent) => {
      return parent.year
    },
    imdbId: (parent) => {
      return parent.imdbId
    },
    _id: (parent) => {
      return parent._id
    }
  },

  Customer: {
    _id: (parent) => {
      return parent._id
    },
    given_name: (parent) => {
      return parent.given_name
    },
    family_name: (parent) => {
      return parent.family_name
    },
    phone_number: (parent) => {
      return parent.phone_number
    },
    email: (parent) => {
      return parent.email
    },
    address_line_1: (parent) => {
      return parent.address_line_1
    },
    locality: (parent) => {
      return parent.locality
    },
    administrative_district_level_1: (parent) => {
      return parent.administrative_district_level_1
    },
    postal_code: (parent) => {
      return parent.postal_code
    },
    country: (parent) => {
      return parent.country
    },
    drivers_license_num: (parent) => {
      return parent.drivers_license_num
    },
    drivers_license_state: (parent) => {
      return parent.drivers_license_state
    }
  },

  Meter: {
    _id: (parent) => {
      return parent._id
    },
    meter: (parent) => {
      return parent.meter
    },
    meterId: (parent) => {
      return parent.meterId
    },
    readings: (parent) => {
      return parent.readings
    },
    customer: (parent) => {
      return parent.customer
    },
    amp: (parent) => {
      return parent.amp
    }
  },

  TivoliRiverInfo: {
    date: (parent) => {
      return parent.dateTime
    },
    level: (parent) => {
      return parent.value
    }
  }
}

module.exports = resolvers