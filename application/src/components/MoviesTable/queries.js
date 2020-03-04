import { gql } from 'apollo-boost';

export const moviesQuery = gql`
  query moviesQuery($name: String!) {
    movies(name: $name) {
      name
      genre
      id
      rate
      watched
      director {
        name
        id
      }
    }
  }
`
