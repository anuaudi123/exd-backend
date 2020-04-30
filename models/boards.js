var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

// create a schema

var boardsSchema = new Schema({
	maxResults: { type: Number},
	startAt: { type: Number},
	total: { type: Number },
	isLast: { type: Boolean },
	values:[{
        id:{ type: Number},        
        self: { type: String},
        name: { type: String },
        type: { type: String },
                location: { 
                    projectId: { type: Number },
                    name: { type: String },
                    projectTypeKey: { type: String },
                    avatarURI: { type: String },
                    projectTypeKey: { type: String },
                }
       
    }],
	
}, 
{   
	collection: 'boards'
}
);
// we need to create a model using it
boardsSchema.plugin(uniqueValidator);
var Boards = mongoose.model('Boards', boardsSchema);
module.exports = Boards;
