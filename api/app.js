const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const { resolvers } = require("./graphql/resolvers");
const { typeDefs } = require("./graphql/typeDefs");
const authenticate = require("./middleware/authMiddleware");

const app = express();
const prisma = new PrismaClient();

async function startServer() {
  // Create Apollo Server instance
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
      prisma,
      user: req.user,
    }),
  });

  // Start Apollo Server
  await server.start();

  // Middleware
  app.use(express.json());
  app.use(authenticate);

  // Apply middleware
  server.applyMiddleware({ app });

  // Start Express server
  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

// Start the server
startServer().catch((err) => {
  console.error("Error starting server", err);
});
