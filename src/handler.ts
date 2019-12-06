import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-lambda'
import { Container } from 'typedi'
import { buildSchemaSync } from 'type-graphql'
import { RecipesResolver } from './recipes/recipes.resolver'
import { sampleRecipes } from './recipes/sample-recipes'

Container.set({ id: 'SAMPLE_RECIPES', factory: () => sampleRecipes.slice() })

const schema = buildSchemaSync({
  container: Container,
  resolvers: [RecipesResolver],
  dateScalarMode: 'timestamp',
})

const server = new ApolloServer({
  schema,
  introspection: true,
  playground: true,
})

export const graphqlHandler = server.createHandler({
  cors: {
    origin: true,
    credentials: true,
  },
})
