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

const resolvers = {
  Query: {
    hello: () => "Hello World!",
    todoList: async (parent, args, context) => {
      const todos = await context.Todo.find();
      return todos;
    },
    user: async (parent, args, context) => {
      const users = await context.User.find();
      return users;
    }
  },
  Mutation: {
    addTodo: async (parent, args, context) => {
      const todo = {
        title: args.title,
        description: args.description || null,
        enteredOn: new Date().toLocaleDateString("en-US"),
        completeBy: args.completeBy || "open",
        completed: false,
        urgent: args.urgent || false
      };

      const newTodo = new context.Todo({ ...todo });
      await newTodo.save();
      return newTodo;
    },
    deleteTodo: async (parent, args, context) => {
      const todo = await context.Todo.findByIdAndDelete(args.id);
      return todo;
    },
    updateTodo: async (parent, args, context) => {
      const todoToRemove = await context.Todo.findByIdAndUpdate(args.id, {
        ...args
      });
      return todoToRemove;
    }
  }
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
    Todo
  }
});

server
  .listen(4000)
  .then(({ url }) => console.log(`Server is running on ${url}`));
