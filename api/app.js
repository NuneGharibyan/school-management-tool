const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const { resolvers } = require("./graphql/resolvers");
const { typeDefs } = require("./graphql/typeDefs");
const authenticate = require("./middleware/authMiddleware");

const app = express();
const prisma = new PrismaClient();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
      prisma,
      user: req.user,
    }),
  });

  await server.start();

  app.use(express.json());
  app.use(authenticate);

  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

startServer().catch((err) => {
  console.error("Error starting server", err);
});
