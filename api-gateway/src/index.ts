import "reflect-metadata";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { buildSchema } from "type-graphql";
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import MessageResolver from "./schema/message/message-resolver.js";
import UserResolver from "./schema/user/user-resolver.js";
import ChannelResolver from "./schema/channel/channel-resolver.js";
import FileResolver from "./schema/file/file-resolver.js";
import {SSOResolver} from "./schema/sso/sso-resolver.js";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.mjs";
import EventResolver from "./schema/events/event-resolver.js";



interface MyContext {
  token?: string;
}

// ... Building schema here
const schema = await buildSchema({
  resolvers: [MessageResolver, UserResolver,SSOResolver, ChannelResolver, FileResolver, EventResolver],
  validate: { forbidUnknownValues: false },
  // automatically create `schema.gql` file with schema definition in current folder
  emitSchemaFile: path.resolve(__dirname, "schema.gql"),
});

// Required logic for integrating with Express
const app = express();
// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.
const httpServer = http.createServer(app);

// Create the GraphQL server
const server = new ApolloServer<MyContext>({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

// Ensure we wait for our server to start
await server.start();

// Set up our Express middleware to handle CORS, body parsing,
// and our expressMiddleware function.

app.use(
  '/',
  cors<cors.CorsRequest>(),
  bodyParser.json(),
  graphqlUploadExpress({ maxFileSize: 26214400, maxFiles: 10 }),
  // expressMiddleware accepts the same arguments:
  // an Apollo Server instance and optional configuration options
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  }),
);

// Modified server startup
await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/`);
