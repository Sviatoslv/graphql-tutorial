import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';

import { graphql } from 'react-apollo';
import { addDirectorMutation, updateDirectorMutaion } from './mutations';
import { directorsQuery } from '../DirectorsTable/queries';

import { styles } from './styles';

const withGraphQL = (
  graphql(addDirectorMutation, {
    props: ({ mutate }) => ({
      addDirector: director => mutate({
        variables: director,
        refetchQueries: [{ query: directorsQuery, variables: { name: '' } }],
      }),
    }),
  }),
  graphql(updateDirectorMutaion, {
    props: ({ mutate }) => ({
      updateDirector: director => mutate({
        variables: director,
        refetchQueries: [{ query: directorsQuery, variables: { name: '' } }],
      })
    })
  })
)

export default compose(withStyles(styles), withGraphQL);
