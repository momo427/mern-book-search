const { Tech, Matchup, User } = require('../models');

const resolvers = {
  Query: {
    user: async () => {
      return User.find({});
    },
    book: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return Book.find(params);
    },
  },
  Mutation: {
    createUser: async (parent, args) => {
      const matchup = await Matchup.create(args);
      return matchup;
    },
    createBookList: async (parent, { _id, techNum }) => {
      const vote = await Matchup.findOneAndUpdate(
        { _id },
        { $inc: { [`tech${techNum}_votes`]: 1 } },
        { new: true }
      );
      return vote;
    },
  },
};

module.exports = resolvers;