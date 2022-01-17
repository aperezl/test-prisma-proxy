import { ApolloServer } from 'apollo-server-micro'
import { typeDefs } from '../../graphql/schema'
import { resolvers } from '../../graphql/resolvers'
import { createContext } from '../../graphql/context'
import Cors from 'micro-cors'
import jwtAuth from 'micro-jwt-auth'



const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)))


const cors = Cors()

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: createContext,
})

const startServer = apolloServer.start()


async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }
  console.log({jwt: req.jwt})
  await startServer
  await apolloServer.createHandler({
    path: '/api/graphql'
  })(req, res)
}

export default compose(
  cors,
  jwtAuth('INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw'),
)(handler)

export const config = {
  api: {
    bodyParser: false
  }
}