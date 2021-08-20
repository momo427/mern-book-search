const { gql } = require('apollo-server-express');

const typeDefs = gql`
type theBooks {
    _id: ID!
    authors: String!
    description: String!
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
     savedBooks: [theBooks]!
     toJSON: Boolean
}

type Auth {
    token: ID!
    user: User
  }
  
type Query {
    users: [User]
    user(username: String!): User
    savedBooks(username: String): [theBooks]
    book(bookId: ID!): theBooks
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addBook(bookId: ID! title: String!): theBooks
    removeBook(bookId: ID!): theBooks
  }

`;

module.exports = typeDefs;
