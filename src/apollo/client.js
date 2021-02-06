/**
 * @flow
 * Created by Dima Portenko on 10.10.2020
 */
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { enableFlipperApolloDevtools } from 'react-native-flipper-apollo-devtools';
import { magentoConfig } from '../../magento.config';
import possibleTypes from './data/possibleTypes.json';

export const apolloClient = new ApolloClient({
  uri: `${magentoConfig.url}/graphql`,
  cache: new InMemoryCache({
    possibleTypes,
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

enableFlipperApolloDevtools(apolloClient);
