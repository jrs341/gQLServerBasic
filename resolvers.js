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

    cabinAvailability: () => {
      const cabinAvailability = Meter.find({meter: /^Cabin/, $and:[{ customer:''}]}, (error, data) => {
        if(error){
          return error
        }else{
          return data
        }
      })
      return cabinAvailability
    },

    rvAvailability: () => {
      const rvAvailability = Meter.find({meter: /^[A-J]$/, $and:[{ customer:''}]}, (error, data) => {
        if(error){
          return error
        } else {
          return data
        }
      })
      return rvAvailability
    },

    currentCustomers: async () => {
      const currentCustomers = await Customer.find({meter: { $ne: ''} }, (error, data) => {
        if(error) {
          return error
        } else {
          return data
        }
      })
      const newData = Promise.all(currentCustomers.map((obj, i) => {
        return Meter.find({_id:obj.meter}, (error, res) => {
        }).then(res => {
            currentCustomers[i].meter = res[0].meter
            return currentCustomers})
        .catch(error => {console.log('**** error ****', error)
            return error})
      }))
        return newData.then((value) => {
          return value[0]
        })
    },

    getCustomer: (parent, id) => {
      console.log('**** id ****', id)
      const customer = Customer.findOne({_id: id.id}, (error, data) => {
        if(error){
          return error
        } else {
          return data
        }
      })
      return customer
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
    getTivoliRiverInfo: (parent, query) => {
      const arrowColor = (delta) => {
        if (delta < 0) {
          return 'green'
        } else if (delta === 0) {
          return 'yellow'
        } else {
          return 'red'
        }
      }
      const data = axios.get('https://waterservices.usgs.gov/nwis/iv/?format=json&indent=on&sites=08188800&period=P5D&parameterCd=00065&siteStatus=all')
      .then(res => {
        // this function makes sure the first data point is at the begining of the hour
        const response = res.data.value.timeSeries[0].values[1].value
        const firstFour = response.slice(0,4)
        let riverInfo = {
          data:[],
          trendInfo:{}
        }
        firstFour.map((obj, i) => {
          if (obj.dateTime.indexOf(':00') < 16) {
            riverInfo['data'] = [...response].splice(i)
          } else {
            return
          }
        })
        const lastValue = Number(riverInfo.data[riverInfo.data.length - 1].value)
        riverInfo.trendInfo['lastReading'] = riverInfo.data[riverInfo.data.length - 1]
        riverInfo.trendInfo['sixHourDelta'] = arrowColor(lastValue - Number(riverInfo.data[riverInfo.data.length - 25].value))
        riverInfo.trendInfo['twelveHourDelta'] = arrowColor(lastValue - Number(riverInfo.data[riverInfo.data.length - 49].value))
        riverInfo.trendInfo['twentyFourHourDelta'] = arrowColor(lastValue - Number(riverInfo.data[riverInfo.data.length - 97].value))
        riverInfo.trendInfo['fortyEightHourDelta'] = arrowColor(lastValue - Number(riverInfo.data[riverInfo.data.length - 193].value))
        return riverInfo
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
    },

    addCustomerToMeter: (parent, {meterId, customerId}) => {
      console.log('meterId', meterId)
      console.log('customerId', customerId)
      const addCustomerToMeter = Meter.findOneAndUpdate({_id: meterId}, {customer: customerId}, {upsert: true}, (error, data) => {
        if(error) {
          return error
        } else {
          return data
        }
      })
      return addCustomerToMeter
    },

    addMeterToCustomer: (parent, {meterId, customerId}) => {
      console.log('meterId', meterId)
      console.log('customerId', customerId)
      const addMeterToCustomer = Customer.findOneAndUpdate({_id: customerId}, {meter: meterId}, {upsert: true}, (error, data) => {
        if(error) {
          return error
        } else {
          return data
        }
      })
      return addMeterToCustomer
    },

    changeLocation: (parent, id) => {
      const changeLocation = Customer.update({_id: id}, (error, data) => {
        if (error) {
          return error
        } else {
          return data
        }
      })
      return changeLocation
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
    },
    current_customer: (parent) => {
      return parent.current_customer
    },
    meter: (parent) => {
      return parent.meter
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
    data: (parent) => {
      return parent.data
    }
  },

  TrendInfo: {
    lastReading: (parent) => {
      return parent.lastReading
    },
    sixHourDelta: (parent) => {
      return parent.sixHourDelta
    },
    twelveHourDelta: (parent) => {
      return parent.twelveHourDelta
    },
    twentyFourHourDelta: (parent) => {
      return parent.twentyFourHourDelta
    },
    fortyEightHourDelta: (parent) => {
      return parent.fortyEightHourDelta
    }
  },

  RiverInfo: {
    date: (parent) => {
      return parent.dateTime
    },
    level: (parent) => {
      return parent.value
    }
  }
}

module.exports = resolvers