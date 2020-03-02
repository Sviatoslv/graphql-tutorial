import { gql } from 'apollo-boost';

export const moviesQuery = gql`
  query moviesQuery {
    movies {
      name
      genre
      id
    }
  }
`
