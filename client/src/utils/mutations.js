import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
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

export const SAVE_BOOK = gql`
  mutation saveBook($title: String!) {
    saveBook(title: $title) {
      _id
      title
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBOOK($bookId: ID!) {
    removeBOOK(Id: $bookId, title: $title) {
      _id
      title
    }
  }
`;
