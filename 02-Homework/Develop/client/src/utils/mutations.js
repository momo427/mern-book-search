import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_BOOK = gql`
  mutation addBook($title: String!) {
    addBook(title: $title) {
      _id
      title
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation addBOOK($bookId: ID!) {
    addComment(Id: $bookId, title: $title) {
      _id
      title
    }
  }
`;