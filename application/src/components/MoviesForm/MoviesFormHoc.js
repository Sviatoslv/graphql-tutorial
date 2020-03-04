import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';

import { graphql } from 'react-apollo';
import { addMovieMutation, updateMovieMutation } from './mutations';
import { moviesQuery } from '../MoviesTable/queries';
import { directorsForMovieQuery } from './queries';
import { directorsQuery } from '../DirectorsTable/queries';

import { styles } from './styles';

const withGraphQL = compose(
  graphql(addMovieMutation, ({
    props: ({ mutate }) => ({
      addMovie: movie => mutate({
        variables: movie, 
        refetchQueries: [{ query: moviesQuery, variables: { name: '' } }, { query: directorsQuery }],
      }),
    }),
  })),
  graphql(updateMovieMutation, ({
    props: ({ mutate }) => ({
      updateMovie: movie => mutate({
        variables: movie,
        refetchQueries: [{ query: moviesQuery, variables: { name: '' } }, { query: directorsQuery }],
      })
    })
  })),
  graphql(directorsForMovieQuery, ({
    options: ({ name = '' }) => ({
      variables: { name },
    })
  }))
)

export default compose(withStyles(styles), withGraphQL);
