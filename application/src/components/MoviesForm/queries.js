import { gql } from "apollo-boost";

export const directorsForMovieQuery = gql`
  query directorsQuery($name: String) {
    directors(name: $name) {
      name
      id
    }
  }
`;
