import { compose } from "recompose";
import { graphql } from 'react-apollo';
import { deleteMovieMutation } from './mutation';
import { moviesQuery } from '../MoviesTable/queries';
import { directorsQuery } from '../DirectorsTable/queries';


const withGraphQLAdd = graphql(deleteMovieMutation, {
  props: ({ mutate }) => ({
    deleteMovie: id => mutate({
      variables: id,
      refetchQueries: [{ query: moviesQuery, variables: { name: '' } }, { query: directorsQuery, variables: { name: '' } }],
    }),
  }),
});

export default compose(withGraphQLAdd);

