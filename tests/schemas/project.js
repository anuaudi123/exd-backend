const projectMocks = require('../mocks/project_mock');

var projectVal = projectMocks.getProject();
const projectTestCase = [{
    id: 'Get All Projects',
    query: `
        query{
            getAllProjects{
                ${projectMocks.projectFieldKeys()}
            }
        }
    `,
    variables: { },
    context: { },
    expected: { data: { getAllProjects: projectMocks.getAllProjects()}}
  },

  {
    id: 'Get Project by ID',
    query: `
        query{
            getProject(id:"${projectMocks.updatebyid}"){
                ${projectMocks.projectFieldKeys()}
            }
        }
    `,
    variables: { },
    context: { },
    expected: { data: { getProject: projectMocks.getProject()}}
  },
  {
    id: 'Create Project',
    query: `
        mutation{
            createProject(
                input: {
                    name: "${projectVal.name}"
                    shortDescription: "${projectVal.shortDescription}"
                    description: "${projectVal.description}"
                    startDate: "${projectVal.startDate}"
                    endDate: "${projectVal.endDate}"
                    lastUpdated: "${projectVal.lastUpdated}"
                    releaseDate: "${projectVal.releaseDate}"
                    productLogo: "${projectVal.productLogo}"
                    themes: {
                        colorName: "${projectVal.themes.colorName}"
                    }
                }
            ){
                ${projectMocks.projectFieldKeys()}
            }
        }
    `,
    variables: { },
    context: { },
    expected: { data: { createProject: projectMocks.getProject()}}
  },
  {
    id: 'Update Project',
    query: `
        mutation{
            updateProject(
                id:"${projectMocks.updatebyid}",
                input: {
                    name: "${projectVal.name}"
                    shortDescription: "${projectVal.shortDescription}"
                    description: "${projectVal.description}"
                    startDate: "${projectVal.startDate}"
                    endDate: "${projectVal.endDate}"
                    lastUpdated: "${projectVal.lastUpdated}"
                    releaseDate: "${projectVal.releaseDate}"
                    productLogo: "${projectVal.productLogo}"
                    themes: {
                        colorName: "${projectVal.themes.colorName}"
                    }
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
    expected: { data: { updateProject:projectMocks.message()}}
    },
    {
        id: 'Image Upload',
        query: `
            mutation ($file: Upload!) { singleUpload(file: $file)
                {  id
                    path
                    filename
                    mimetype
                    encoding 
                } 
            }
        `,
        variables: {"file": `@/Users/marina/Documents/2018_Projects/Am_Water/apollo-upload-example-master/test.png`  },
        context: { },
        expected: { data: { singleUpload: projectMocks.uploadMock()}}
        },
    
];

module.exports = projectTestCase;
