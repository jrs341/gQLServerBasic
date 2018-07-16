const { gql } = require('apollo-server')

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.

const typeDefs = gql`

  type Query {
    allMovies: [Movie]
    searchMovies(query: String): [Movie]
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
  }

  type Movie {
    title: String
    genre: String
    actors: String
    year: String
    imdbId: String
    _id: String
  }
`;

module.exports = typeDefs