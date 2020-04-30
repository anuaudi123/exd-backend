const mocks = require('./mocks');
const sprintFieldKeys = `
    _id
    sprintNumber
    status
    startDate
    endDate
`

const sprintfields = { 
    "_id": mocks.ID(),
    "sprintNumber": mocks.Int(),
    "status": expect.any(String),
    "startDate": mocks.Date(),
    "endDate": mocks.Date()
   
}

const sprintMocks = {
    sprintFieldKeys: () =>sprintFieldKeys,
    sprintfields: () => sprintfields
     
}

module.exports = sprintMocks;
