import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import {
  ApolloServer,
  gql,
  makeExecutableSchema,
  IFieldResolver,
} from 'apollo-server-lambda';
import * as GraphQLJSON from 'graphql-type-json';
import { GraphQLDateTime } from 'graphql-iso-date';

export const hello: APIGatewayProxyHandler = async (
  event,
  context,
): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Go Serverless Webpack (Typescript) v1.0! Your function executed successfully! ${context.awsRequestId}`,
      input: event,
    }),
  };
};

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  scalar JSON
  scalar GraphQLDateTime

  type Query {
    hello: String
  }
`;

interface ConnectionContext {}

const helloResolver: IFieldResolver<
  undefined,
  ConnectionContext,
  {}
> = (): string => {
  const foobar = 'Hello!!';
  return foobar.toUpperCase();
};

const resolvers = {
  JSON: GraphQLJSON,
  GraphQLDateTime,
  Query: {
    hello: helloResolver,
  },
};

const schema = makeExecutableSchema<ConnectionContext>({ typeDefs, resolvers });

const server = new ApolloServer({
  schema,
  playground: true,
});

export const graphqlHandler = server.createHandler({
  cors: {
    origin: true,
    credentials: true,
  },
});
