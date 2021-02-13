/**
 * @flow
 * Created by Dima Portenko on 10.10.2020
 */
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { magentoConfig } from '../../magento.config';
import possibleTypes from './data/possibleTypes.json';
import { enableFlipperApolloDevtools } from 'react-native-flipper-apollo-devtools';

export const apolloClient = new ApolloClient({
  uri: `${magentoConfig.url}/graphql`,
  cache: new InMemoryCache({
    possibleTypes,
    // typePolicies: {
    //   ProductInterface: {
    //     keyFields: ['sku'],
    //   },
    // },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-first',
    },
  },
});

enableFlipperApolloDevtools(apolloClient);
