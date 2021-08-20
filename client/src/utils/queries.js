import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    users(username: $username) {
      _id
      username
      email
      savedBooks {
        _id
        title
      }
    }
  }
`;

export const QUERY_BOOKS = gql`
  query getBooks {
    book {
      _id
      title
    }
  }
`;

export const QUERY_SINGLE_THOUGHT = gql`
  query getSingleThought($thoughtId: ID!) {
    thought(thoughtId: $thoughtId) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      savedbooks {
        _id
        title
      }
    }
  }
`;
