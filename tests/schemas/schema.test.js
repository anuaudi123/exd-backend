'use strict';

const { graphql } = require('graphql');
const {
  makeExecutableSchema,
  addMockFunctionsToSchema,
  mockServer
} = require('graphql-tools');
const typeDefs =  require('../../schemas/schema');
var mocks = require('../mocks/mocks');
var projectTestCase = require('./project');
var releaseTestCase = require('./release');
var activitiesTestCases = require('./activities');
var sprintTestCases = require('./sprint');
describe('Schema', () => {
  // Array of case types
  const cases = [projectTestCase, releaseTestCase,activitiesTestCases,sprintTestCases];
  
  const mockSchema = makeExecutableSchema({ typeDefs });

  // Here we specify the return payloads of mocked types
  addMockFunctionsToSchema({
    schema: mockSchema,
    mocks: mocks
  });

  test('has valid type definitions', async () => {
    expect(async () => {
      const MockServer = mockServer(typeDefs);
      var test = await MockServer.query(`{ __schema { types { name } } }`);
      console.log(test);
    }).not.toThrow();
  });

  cases.forEach(testCase => {
    testCase.forEach(obj => {
      const { id, query, variables, context: ctx, expected } = obj;
      test(`${id}`, async () => {
        return await expect(
          graphql(mockSchema, query, null, { ctx }, variables)
        ).resolves.toEqual(expected);
      });
    });
  });
});
