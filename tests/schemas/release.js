const releaseMocks = require('../mocks/release_mock');
const projectMocks = require('../mocks/project_mock');
var path = require('path');
var releaseVal = releaseMocks.releaseExpectFields();
var projectFields = projectMocks.getProject();
var releaseFields = releaseMocks.releasefields();
const releaseTestCase = [
  {
    id: 'Create Release',
    query: `
        mutation{
            createRelease(id: "${projectMocks.getProject()._id}",
                  input: {
                  releaseNumber: "${releaseVal.releaseNumber}"
                  status: YET_TO_START
                  startDate: "${releaseVal.startDate}"
                  releaseDate: "${releaseVal.releaseDate}"
                  noOfSprints: ${releaseVal.noOfSprints}
                  duration: ${releaseVal.duration}
                  sprintType: CUSTOM
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
          createRelease: releaseMocks.releaseProjectMock()
        }
      }
    },
    {
        id: 'Update Release',
        query: `
            mutation{
                updateRelease(id: "${projectMocks.getProject()._id}",
                      input: [{
                      releaseNumber: "${releaseVal.releaseNumber}"
                      status: YET_TO_START
                      startDate: "${releaseVal.startDate}"
                      releaseDate: "${releaseVal.releaseDate}"
                      noOfSprints: ${releaseVal.noOfSprints}
                      duration: ${releaseVal.duration}
                      sprintType: CUSTOM
                      },
                      {
                        releaseNumber: "${releaseVal.releaseNumber}"
                        status: YET_TO_START
                        startDate: "${releaseVal.startDate}"
                        releaseDate: "${releaseVal.releaseDate}"
                        noOfSprints: ${releaseVal.noOfSprints}
                        duration: ${releaseVal.duration}
                        sprintType: CUSTOM
                        }
                      ]
                ){
                    ${releaseMocks.releaseFieldKeys()}
                }
            }
        `,
        variables: { },
        context: { },
        expected: {
            data: {
                updateRelease:[releaseMocks.releaseExpectFields(),releaseMocks.releaseExpectFields()]
            }
          }
        }
];

module.exports = releaseTestCase
