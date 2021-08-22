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
    me: User
  }

  input saveBooks {
    title: String
    link: String
    image: String
    bookId: String
    description: String
    authors: [String]
}

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    loginUser(email: String!, password: String!): Auth
    addBook(input: saveBooks!): User
    removeBook(bookId: ID!): User
  }

`;

module.exports = typeDefs;
