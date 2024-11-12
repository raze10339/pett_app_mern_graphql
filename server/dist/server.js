import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import typeDefs from './schema/typeDefs.js';
import resolvers from './schema/resolvers.js';
import connection from './config/connection.js';
const app = express();
const PORT = process.env.PORT || 3333;
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
connection.once('open', async () => {
    await server.start();
    app.use('/graphql', express.json(), expressMiddleware(server));
    app.listen(PORT, () => {
        console.log('Express server started on', PORT);
    });
});
