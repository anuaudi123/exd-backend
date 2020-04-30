const releaseMocks = require('../mocks/release_mock');
const projectMocks = require('../mocks/project_mock');
var path = require('path');
var projectVal = projectMocks.activitiesMock();
var projectFields = projectMocks.getProject();
var releaseFields = releaseMocks.releasefields();
const activitiesTestCases = [
    {
        id: 'Add Activities',
        query: `
            mutation{
                createActivities(
                    input:{
                    ProjectID:"${projectVal.ProjectID}",
                    ProjectName:"${projectVal.ProjectName}",
                    type:"${projectVal.type}",
                    description:"${projectVal.description}",
                    title:"${projectVal.title}",
                    accomplished:"${projectVal.accomplished}",
                    listofTypeNumber: [
                        {ID: "${projectVal.ProjectID}" },
                        {ID: "${projectVal.ProjectID}" }
                    ]
                    
               } ){
                    ${projectMocks.activitiesKeys()}
                }
            }
        `,
        variables: { },
        context: { },
        expected: { data: {createActivities:projectMocks.activitiesMock()}}
        },

        {
            id: 'getAllActivities',
            query: `
               query{
                   getAllActivities(ProjectID:"${projectVal.ProjectID}")                                             
                   {
                    ${projectMocks.activitiesKeys()}
                    }
                }
            `,
            variables: { },
            context: { },
            expected: { data: {getAllActivities:[projectMocks.activitiesMock(),projectMocks.activitiesMock()]}}
            },

            {
                id: 'update Activities',
                query: `
                    mutation{
                        updateActivities(
                            ActivityId:"${projectVal.ProjectID}",
                            input:{
                            ProjectID:"${projectVal.ProjectID}",
                            ProjectName:"${projectVal.ProjectName}",
                            type:"${projectVal.type}",
                            description:"${projectVal.description}",
                            title:"${projectVal.title}",
                            accomplished:"${projectVal.accomplished}",
                            listofTypeNumber: [
                                {ID: "${projectVal.ProjectID}" },
                                {ID: "${projectVal.ProjectID}" }
                            ]
                            
                       } ){
                        n
                        ok
                        nModified
                        }
                    }
                `,
                variables: { },
                context: { },
                expected: { data: {updateActivities:projectMocks.message()}}
                }
    

];

module.exports = activitiesTestCases
