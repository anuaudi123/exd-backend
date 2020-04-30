const projectFields = `
    _id: ID
    name: String
    shortDescription: String
    description: String
    startDate: Date
    endDate: Date
    lastUpdated: Date
    releaseDate: Date
    productLogo: String
    jira_id: ID
    jira_name: String
    jira_key: String
    jira_projectTypeKey: String
`
const themeFields = `
    colorName: String
`

module.exports = {
    projectFields,
    themeFields
}
