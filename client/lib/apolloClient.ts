import { ApolloClient, HttpLink, ApolloLink, InMemoryCache, concat } from '@apollo/client'

const httpLink = new HttpLink({ uri: process.env.NEXT_PUBLIC_FAUNA_GRAPHQL_ENDPOINT })

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: `Bearer ${process.env.NEXT_PUBLIC_FAUNA_TOKEN}`
    }
  }))

  return forward(operation)
})

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink)
})

export default apolloClient
