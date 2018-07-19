const Movies = require('./models/movies')
const Users = require('./models/users')

const resolvers = {
  Query: {
    user: () => {
      const user = Users.find({}, (error, data) => {
        if (error) {
          console.log('*** user error ***', error)
          return error
        } else {
          console.log('**** user data ***', data)
          return data
        }
      })
      return user
    },

    allMovies: () => {
      console.log('*** allMovies *****')
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
          console.log('*** error ****', error)
          return error
        } else {
          console.log('***** data *****', data)
          return data
        }
      })
      console.log('**** deletedMovie *****', deletedMovie)
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
  }
}

module.exports = resolvers