var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
var { releaseSchema } = require('./release');
// create a schema

var activitiesSchema = new Schema({
	ProjectID: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
	ProjectName: { type: String, required: true},
    type: { type: String,
            enum: ['Release', 'Sprint'],
            default: 'Release' },
    title: { type: String, required: true },
    description: { type: String },
    accomplished:{type: String,
    enum: ['true', 'false']},
    listofTypeNumber :[{
        ID: {
            type: mongoose.Schema.Types.ObjectId
        }
    }]
	
	
}, 
{   
	collection: 'activities'
}
);
// we need to create a model using it
activitiesSchema.plugin(uniqueValidator);
var activitiesSchema = mongoose.model('activities', activitiesSchema);
module.exports = activitiesSchema;
