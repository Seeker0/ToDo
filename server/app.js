//=====================
//Mongoose
//=====================
import mongoose from "mongoose";
import mongo from "./mongo.js";
import { User, Todo, Token } from "./models/index.js";
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
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
  context: ({ req }) => {
    console.log(req.body);
    return {
      req,
      mongo,
      models: { User, Todo, Token }
    };
  },
  formatError: e => {
    console.error(e);
    return e;
  }
});

server
  .listen(4000)
  .then(({ url }) => console.log(`Server is running on ${url}`));
