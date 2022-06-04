import * as Types from './graphql';

import * as Operations from './graphql';
import { NextPage } from 'next';
import { NextRouter, useRouter } from 'next/router'
import { QueryHookOptions, useQuery } from '@apollo/client';
import * as Apollo from '@apollo/client';
import type React from 'react';
import { getApolloClient , ApolloClientContext} from '../../lib/withApollo';
export async function getServerPageGetCharacters
    (options: Omit<Apollo.QueryOptions<Types.GetCharactersQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.GetCharactersQuery>({ ...options, query: Operations.GetCharactersDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useGetCharacters = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetCharactersQuery, Types.GetCharactersQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.GetCharactersDocument, options);
};
export type PageGetCharactersComp = React.FC<{data?: Types.GetCharactersQuery, error?: Apollo.ApolloError}>;
export const withPageGetCharacters = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetCharactersQuery, Types.GetCharactersQueryVariables>) => (WrappedComponent:PageGetCharactersComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.GetCharactersDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrGetCharacters = {
      getServerPage: getServerPageGetCharacters,
      withPage: withPageGetCharacters,
      usePage: useGetCharacters,
    }