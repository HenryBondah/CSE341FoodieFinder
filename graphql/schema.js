const { gql } = require('apollo-server-express');
const Food = require('../models/Food');
const User = require('../models/User');

const typeDefs = gql`
  type Food {
    id: ID!
    name: String!
    price: Float!
    discount: Float!
    location: String!
    available: Boolean!
    category: String!
    vendor: String!
    createdAt: String!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    location: String!
    foodPreferences: [String]
  }

  type Query {
    getFoods: [Food]
    getFood(id: ID!): Food
    getUsers: [User]
    getUser(id: ID!): User
  }

  type Mutation {
    createFood(name: String!, price: Float!, discount: Float!, location: String!, category: String!, vendor: String!): Food
    updateFood(id: ID!, name: String, price: Float, discount: Float, location: String, category: String, vendor: String): Food
    deleteFood(id: ID!): String

    createUser(username: String!, email: String!, password: String!, location: String!, foodPreferences: [String]!): User
    updateUser(id: ID!, username: String, email: String, password: String, location: String, foodPreferences: [String]): User
    deleteUser(id: ID!): String
  }
`;

const resolvers = {
  Query: {
    getFoods: async () => await Food.find(),
    getFood: async (parent, args) => await Food.findById(args.id),
    getUsers: async () => await User.find(),
    getUser: async (parent, args) => await User.findById(args.id),
  },
  Mutation: {
    createFood: async (parent, args) => {
      const newFood = new Food(args);
      return await newFood.save();
    },
    updateFood: async (parent, args) => {
      const updatedFood = await Food.findByIdAndUpdate(args.id, args, { new: true });
      if (!updatedFood) throw new Error('Food not found');
      return updatedFood;
    },
    deleteFood: async (parent, args) => {
      const deletedFood = await Food.findByIdAndDelete(args.id);
      if (!deletedFood) throw new Error('Food not found');
      return 'Food deleted';
    },
    createUser: async (parent, args) => {
      const newUser = new User(args);
      return await newUser.save();
    },
    updateUser: async (parent, args) => {
      const updatedUser = await User.findByIdAndUpdate(args.id, args, { new: true });
      if (!updatedUser) throw new Error('User not found');
      return updatedUser;
    },
    deleteUser: async (parent, args) => {
      const deletedUser = await User.findByIdAndDelete(args.id);
      if (!deletedUser) throw new Error('User not found');
      return 'User deleted';
    },
  },
};

module.exports = { typeDefs, resolvers };
