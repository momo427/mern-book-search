const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Book {
    _id: ID!
    authors: String!
    description: [String]!
    bookId: String!
    image: String!
    link: String!
    title: String!
  }

type User {
     _id: ID!
     username: String!
     email: String!
     password: String!
     savedBooks: [Book]!
     toJSON: Boolean
}

type Auth {
    token: ID!
    users: User
  }
  
type Query {
    users: [User]
    user(username: String!): User
    savedBooks(username: String): [Book]
    book(bookId: ID!): Book
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    loginUser(email: String!, password: String!): Auth
    addBook(bookId: ID! title: String!): Book
    removeBook(bookId: ID!): Book
  }

`;

module.exports = typeDefs;
