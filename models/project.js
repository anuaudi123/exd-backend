var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
var { releaseSchema } = require('./release');
var {sprintSchema} = require('./sprint');
// create a schema

var projectSchema = new Schema({
	name: { type: String, required: true, unique: true },
	shortDescription: { type: String},
	description: { type: String },
	startDate: { type: Date },
	endDate: {
		type: Date
	},
	lastUpdated: {
		type: Date
	},
	releaseDate: {
		type: Date
	},
	productLogo: {
		type: String
	},
	jira_id: {
		type: String,
		required: true
	},
    jira_name: {
		type: String,
		required: true
	},
    jira_key: {
		type: String,
		required: true
	},
    jira_projectTypeKey: {
		type: String
	},
	themes: {
		colorName: { type: String }
	},
	releases: [releaseSchema],

	sprints:[sprintSchema]

	
	
}, 
{   
	collection: 'projects'
}
);
// we need to create a model using it
projectSchema.plugin(uniqueValidator);
var Project = mongoose.model('Project', projectSchema);
module.exports = { Project };
