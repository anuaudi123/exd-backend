const { projectFields, themeFields } = require('./schema_fields/project_fields');
const { releaseFields } = require('./schema_fields/release_fields');
const { sprintFields } = require('./schema_fields/sprint_fields');
const {activitiesFields}=require('./schema_fields/activities_fields.js');
const { userFields } = require('./schema_fields/user_fields');
const {listofTypeNumberFields}= require('./schema_fields/listofTypeNumber.js');
const typeDefs = `
    scalar Date
    scalar Upload
    scalar JSON

    enum Status {
        YET_TO_START
        IN_PROGRESS
        AT_RISK
        ACCOMPLISHED
    }

    enum SprintType{
        CUSTOM
        STANDARD
    }

    input ProjectInput {
        ${projectFields}
        themes: ThemeInput
        releases: [ReleaseInput]
        sprints:[SprintInput]
    }

    type File {
        id: ID!
        path: String!
        filename: String!
        mimetype: String!
        encoding: String!
        
    }

    type Project{
        ${projectFields}
        themes: Theme
        releases: [Release]
        sprints:[Sprint]

    }

    type ActivitiesFields{
        ${activitiesFields}
        listofTypeNumber:[ListoftypeNumberInputs]


    }
    type ListoftypeNumberInputs{
        ${listofTypeNumberFields}
    }
        

    input ThemeInput {
        ${themeFields}
    }

    type Theme{
        ${themeFields}
    }

    type Sprint{
        ${sprintFields}
    }

    input SprintInput{
        ${sprintFields}
    }
    
    
    input ReleaseInput {
        ${releaseFields}
        
    }

    input ActivityInput{
        ${activitiesFields}
        listofTypeNumber:[ListoftypeNumberInput]

    }

    input ListoftypeNumberInput{
        ${listofTypeNumberFields}
    }

    type Release{
        ${releaseFields}
        sprints: [Sprint]
    }
    
    type message{
        ok:Int
        nModified:Int
        n:Int
    }

    type User{
        ${userFields}
    }
    
    type Query{
        info: String
        getAllProjects: [Project]
        getAllActivities(ProjectID:ID!):[ActivitiesFields]
        getProject(id:ID!):Project
        uploads: [File]
        getLoginUrl: String
        getToken(token: String): String
        signOut: String
        getUser(id: ID!): User
        getAllUsers(searchText: String!): [User]
        getJiraToken: JSON
        getJiraAccessToken: String
        getAllJiraProjects: JSON
        getJiraProject: JSON
        getAllVersions(id: ID!): JSON
        getAllBoards: JSON
    }

    type Mutation{
        createProject(input: ProjectInput): Project
        updateProject(id: ID!, input: ProjectInput):message
        createRelease(id: ID!, input: ReleaseInput): Project
        createSprint(id: ID!, releaseID: ID!, input: SprintInput): Project
        singleUpload(file: Upload!): File!
        multipleUpload(files: [Upload!]!): [File!]!
        updateRelease(id:ID!,input:[ReleaseInput]):[Release]
        updateSprint(id:ID!,releaseID:ID!,input:[SprintInput]):message
        createActivities(input:ActivityInput): ActivitiesFields
        updateActivities(ActivityId:ID!,input:ActivityInput):message
        updateSprintStatus(id:ID!,releaseID:ID!,sprintID:ID!,input:SprintInput):Project
    }
`;
module.exports = typeDefs;
