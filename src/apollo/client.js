/**
 * @flow
 * Created by Dima Portenko on 10.10.2020
 */
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { magentoConfig } from '../../magento.config';

export const apolloClient = new ApolloClient({
  uri: `${magentoConfig.url}/graphql`,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
    },
  },
});
