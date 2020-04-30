const releaseMocks = require('../mocks/release_mock');
const projectMocks = require('../mocks/project_mock');
var path = require('path');
var releaseVal = releaseMocks.releaseExpectFields();
var projectFields = projectMocks.getProject();
var releaseFields = releaseMocks.releasefields();
const sprintTestCases = [
  {
    id: 'create Sprint',
    query: `
        mutation{
            createSprint(id: "${projectMocks.getProject()._id}",
                  releaseID:"${projectMocks.getProject()._id}",
                  input: {
                  sprintNumber:${releaseVal.noOfSprints},
                  status: YET_TO_START
                  startDate: "${releaseVal.startDate}",
                  endDate: "${releaseVal.releaseDate}"
                 
                  }
            ){
                ${projectMocks.projectFieldKeys()}
            }
        }
    `,
    variables: { },
    context: { },
    expected: {
        data: {
            createSprint: releaseMocks.releaseProjectMock()
        }
      }
    },
   
    {
        id: 'update Sprint',
        query: `
            mutation{
                updateSprint(id: "${projectMocks.getProject()._id}",
                      releaseID:"${projectMocks.getProject()._id}",
                      input: {
                      sprintNumber:${releaseVal.noOfSprints},
                      status: YET_TO_START
                      startDate: "${releaseVal.startDate}",
                      endDate: "${releaseVal.releaseDate}"
                      }
                ){
                    n
                    ok
                    nModified
                }
            }
        `,
        variables: { },
        context: { },
        expected: {
            data: {
                updateSprint: projectMocks.message()
            }
          }
        }
];

module.exports = sprintTestCases
