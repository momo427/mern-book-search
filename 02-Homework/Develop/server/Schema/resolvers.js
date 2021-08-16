const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
        return User.find().populate('savedBooks');
      },
      user: async (parent, { username }) => {
        return User.findOne({ username }).populate('savedBooks');
      },
      savedBooks: async (parent, { username }) => {
        const params = username ? { username } : {};
        return Book.find(params).sort({ createdAt: -1 });
      },
      book: async (parent, { bookId }) => {
        return Book.findOne({ _id: bookId });
      },
      me: async (parent, args, context) => {
        if (context.user) {
          return User.findOne({ _id: context.user._id }).populate('thoughts');
        }
        throw new AuthenticationError('You need to be logged in!');
      },
    },
    book: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return Book.find(params);
    },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      },
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
  
        if (!user) {
          throw new AuthenticationError('No user found with this email address');
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }
  
        const token = signToken(user);
  
        return { token, user };
      },
      addBook: async (parent, { title }, context) => {
        if (context.user) {
          const thought = await Book.create({
            title,
          });
  
          await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { savedBooks: book._id } }
          );
  
          return thought;
        }
        throw new AuthenticationError('You need to be logged in!');
      },
      removeBook: async (parent, { bookId }, context) => {
        if (context.user) {
          const thought = await Book.findOneAndDelete({
            _id: bookId,
            // savedbooks: context.user.username,
          });
  
          await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { savedBooks: book._id } }
          );
  
          return thought;
        }
        throw new AuthenticationError('You need to be logged in!');
      },
    }
};

module.exports = resolvers;