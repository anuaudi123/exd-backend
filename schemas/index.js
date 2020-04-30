const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools');
const resolversFunction = require('./resolvers');
const typeDefs =  require('./schema');
// const mocks = require('./mocks');
var { resolvers } = new resolversFunction();
const schema = makeExecutableSchema({
	typeDefs,
	resolvers
});

// Using mock data to return
//addMockFunctionsToSchema({ schema, mocks });
module.exports = schema;
