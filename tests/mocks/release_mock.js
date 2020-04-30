const mocks = require('./mocks');
const sprintFields = require('./sprint_mock');
const releaseFieldKeys = `
    _id
    releaseNumber
    status
    startDate
    releaseDate
    noOfSprints
    duration
    sprintType
    sprints{
    ${sprintFields.sprintFieldKeys()}
    }
`

const releasefields = { 
    "_id": mocks.ID(),
    "releaseNumber": mocks.String(),
    "status": mocks.Enum(),
    "startDate": mocks.Date(),
    "releaseDate": mocks.Date(),
    "noOfSprints": mocks.Int(),
    "duration": mocks.Int(),
    "sprintType": mocks.SprintType(),
     "sprints" :[sprintFields.sprintfields(),sprintFields.sprintfields()]
}

const releaseExpectFields = {
    "_id": mocks.ID(),
    "releaseNumber": mocks.String(),
    "status": expect.any(String),
    "startDate": mocks.Date(),
    "releaseDate": mocks.Date(),
    "noOfSprints": mocks.Int(),
    "duration": mocks.Int(),
    "sprintType": expect.any(String),
     "sprints" :[sprintFields.sprintfields(),sprintFields.sprintfields()]

    
}


const releaseProjectMock = {
    "_id": mocks.ID(),
    "description": mocks.String(),
    "endDate": mocks.Date(),
    "lastUpdated": mocks.Date(),
    "name": mocks.String(),
    "productLogo": mocks.String(),
    "releaseDate": mocks.Date(),
    "releases": [releaseExpectFields,releaseExpectFields],
    "shortDescription": mocks.String(),
    "startDate": mocks.Date(),
    "themes": {
        "colorName": mocks.String()
    }  
}

const releaseInputMock = {
    "_id": mocks.ID(),
    "description": mocks.String(),
    "endDate": mocks.Date(),
    "lastUpdated": mocks.Date(),
    "name": mocks.String(),
    "productLogo": mocks.String(),
    "releaseDate": mocks.Date(),
    "releases": [releasefields],
    "shortDescription": mocks.String(),
    "startDate": mocks.Date(),
    "themes": {
        "colorName": mocks.String()
    }  
}

const releaseExpectedProjectMock = {
    "_id": mocks.ID(),
    "description": mocks.String(),
    "endDate": mocks.Date(),
    "lastUpdated": mocks.Date(),
    "name": mocks.String(),
    "productLogo": mocks.String(),
    "releaseDate": mocks.Date(),
    "releases": [releaseExpectFields,releaseExpectFields],
    "shortDescription": mocks.String(),
    "startDate": mocks.Date(),
    "themes": {
        "colorName": mocks.String()
    }  
}



const releaseMocks = {
    releaseFieldKeys: () => releaseFieldKeys,
    releasefields: () => releasefields,
    releaseProjectMock: () => releaseProjectMock,
    releaseExpectFields: () => releaseExpectFields,
    releaseInputMock: () => releaseInputMock,
    releaseExpectedProjectMock: () => releaseExpectedProjectMock
  
}

module.exports = releaseMocks;
