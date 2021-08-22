const { AuthenticationError } = require('apollo-server-express');
const { User, Book} = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // users: async () => {
    //     return User.find().populate('savedBooks');
    //   },
    //   user: async (parent, { username }) => {
    //     return User.findOne({ username }).populate('savedBooks');
    //   },
    //   savedBooks: async (parent, { username }) => {
    //     const params = username ? { username } : {};
    //     return Book.find(params).sort({ createdAt: -1 });
    //   },
    //   book: async (parent, { bookId }) => {
    //     return Book.findOne({ _id: bookId });
    //   },
      me: async (parent, args, context) => {
        if (context.users) {
          return User.findOne({ _id: context.users._id }).populate('books');
        }
        throw new AuthenticationError('You need to be logged in!');
      },
    },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
        const user = await Users.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      },
      loginUser: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
  
        if (!user) {
          throw new AuthenticationError('No user found with this email address');
        }
  
        const correctPw = await User.isCorrectPassword(password);
  
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
  
          await Users.findOneAndUpdate(
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