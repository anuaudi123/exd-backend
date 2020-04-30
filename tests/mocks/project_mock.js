const mocks = require('./mocks');
const releaseFields = require('./release_mock');


const projectFieldKeys = `
    _id
    name
    shortDescription
    description
    startDate
    endDate
    lastUpdated
    releaseDate
    productLogo
    themes{
        colorName
    }
    releases{
        ${releaseFields.releaseFieldKeys()}
    }
`

const projectfields = { 
    "_id": mocks.ID(),
    "name": mocks.String(),
    "shortDescription": mocks.String(),
    "description": mocks.String(),
    "startDate": mocks.Date(),
    "endDate": mocks.Date(),
    "lastUpdated": mocks.Date(),
    "releaseDate": mocks.Date(),
    "productLogo": mocks.String(),
    "themes": {
      "colorName": mocks.String()
    },
    "releases": [releaseFields.releaseExpectFields(), releaseFields.releaseExpectFields()]
}

const getAllProjectByID = {
    "_id": mocks.ID(),
    "name": mocks.String(),
    "shortDescription": mocks.String(),
    "description": mocks.String(),
    "startDate": mocks.Date(),
    "endDate": mocks.Date(),
    "lastUpdated": mocks.Date(),
    "releaseDate": mocks.Date(),
    "productLogo": mocks.String(),
    "themes": {
      "colorName": mocks.String()
    },
    releases: [releaseFields.releaseExpectFields()]
}

const listOfTypeIds = [{
    "ID":  mocks.ID() 
}, {
    "ID":  mocks.ID()
}]

const activitiesMock = {
    "ProjectID": mocks.ID(),
    "ProjectName": mocks.String(),
    "type": mocks.String(),
    "title": mocks.String(),
    "description": mocks.String(),
    "accomplished": mocks.String(),
    "listofTypeNumber": listOfTypeIds
}


const activitiesKeys = `
    ProjectID
    ProjectName
    type
    title
    description
    accomplished
    listofTypeNumber{
        ID
    }
`
const updatebyID = {
    "id": mocks.ID()
}
const messagebody = { 
   "ok": mocks.Int(),
   "n": mocks.Int(),
   "nModified":mocks.Int()
}
const updateMessage= `message`

const uploadMock = {
    id: mocks.ID(),
    path: mocks.String(),
    filename: mocks.String(),
    mimetype: mocks.String(),
    encoding: mocks.String(),  
}

const projectMocks = {
    getAllProjects: () => [ projectfields, projectfields ],
    getProject: () => projectfields,
    projectFieldKeys: () => projectFieldKeys,
    message: () => messagebody,
    updatebyid: () => updatebyID,
    updateMessage: () => updateMessage,
    uploadMock: () => uploadMock,
    activitiesMock :() => activitiesMock,
    activitiesKeys :() => activitiesKeys,
    getAllProjectByID: () => getAllProjectByID
}

module.exports = projectMocks;
