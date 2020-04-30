var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var { sprintSchema } = require('./sprint');
// create a schema

var releaseSchema = new Schema({
	releaseNumber: {
		type: String,
       // required: true
	},
	status: {
		type: String,
		enum: ['YET_TO_START', 'IN_PROGRESS', 'AT_RISK', 'ACCOMPLISHED'],
        default: 'YET_TO_START'
	},
	startDate: {
		type: Date
	},

    name: {
        type:String
    },
    archived: {
        type:String
    },
    released: {
        type:String
    },
    overdue: {
        type:String
    },
    userReleaseDate: {
        type:Date
    },
    projectId: {
        type:String
    },
    self: {
        type:String
    },
    id: {
        type:String
    },


});
// we need to create a model using it
module.exports = { releaseSchema };
