var projectMocks = require('../../mocks/project_mock');
var resolverFunction =  require('../../../schemas/resolvers');
const sprintMocks = require('../../mocks/sprint_mock');
var { resolvers } = new resolverFunction(true);


const createSprint = () => {
    var release = {id: projectMocks.updatebyid(),releaseID:projectMocks.updatebyid() ,input: sprintMocks.sprintfields()};
    const output =  new Promise((resolve, reject) => {
      resolvers.Mutation.createSprint("", release).then((docs) => {
      			resolve(docs);
      		}, (e) => {
      			resolve(e);
          })
        });
    return expect(output).resolves.toEqual(expect.objectContaining(projectMocks.getProject()));
};

const updateSprint = () => {
    var release = {id: projectMocks.updatebyid(),releaseID:projectMocks.updatebyid() ,input: sprintMocks.sprintfields()};
    const output =  new Promise((resolve, reject) => {
      resolvers.Mutation.updateSprint("", release).then((docs) => {
      			resolve(docs);
      		}, (e) => {
      			resolve(e);
          })
        });
    return expect(output).resolves.toEqual(expect.objectContaining(projectMocks.message()));
};


module.exports = {
   createSprint,
   updateSprint
};
