var projectMocks = require('../../mocks/project_mock');
var resolverFunction =  require('../../../schemas/resolvers');
const releaseMocks = require('../../mocks/release_mock');
var { resolvers } = new resolverFunction(true);


const createRelease = () => {
    var release = {id: projectMocks.updatebyid(), input: releaseMocks.releasefields()};
    const output =  new Promise((resolve, reject) => {
      resolvers.Mutation.createRelease("", release).then((docs) => {
      			resolve(docs);
      		}, (e) => {
      			resolve(e);
          })
        });
    return expect(output).resolves.toEqual(expect.objectContaining(releaseMocks.releaseExpectedProjectMock()));
};

const updateRelease = () => {
    var release = {id: projectMocks.updatebyid(), input: [releaseMocks.releasefields(),releaseMocks.releasefields()]};
    const output =  new Promise((resolve, reject) => {
      resolvers.Mutation.updateRelease("", release).then((docs) => {
      			resolve(docs);
      		}, (e) => {
      			resolve(e);
          })
        });
    return expect(output).resolves.toEqual(expect.objectContaining([releaseMocks.releasefields(),releaseMocks.releasefields()]));
};

module.exports = {
    createRelease,
    updateRelease
};
