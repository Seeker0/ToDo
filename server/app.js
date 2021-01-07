//=====================
//Mongoose
//=====================
import mongoose from "mongoose";
import mongo from "./mongo.js";
import { User, Todo } from "./models/index.js";
mongo();

//=====================
//GraphQL
//=====================
import { Query, Mutation } from "./resolvers/index.js";
const resolvers = {
  Query,
  Mutation
};

import { ApolloServer } from "apollo-server";
import fs from "fs";
import path from "path";

const __dirname = path.resolve();

const server = new ApolloServer({
  cors: {
    origin: "*",
    credentials: true
  },
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
  context: {
    mongo,
    User,
    Todo,
    user: null
  }
});

server
  .listen(4000)
  .then(({ url }) => console.log(`Server is running on ${url}`));
