import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import { deleteDirectorMutation } from './mutation';
import { directorsQuery } from '../DirectorsTable/queries';

const withGraphqlAdd = graphql(deleteDirectorMutation, {
  props: ({ mutate }) => ({
    deleteDirector: id => mutate({
      variables: id,
      refetchQueries: [{ query: directorsQuery, variables: { name: '' } }]
    })
  })
})

export default compose(withGraphqlAdd)
