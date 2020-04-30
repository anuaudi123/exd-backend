var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// create a schema


var sprintSchema = new Schema({
	sprintNumber: {
		type: Number,
		min: 0
	},
	status: {
		type: String,
		enum: ['YET_TO_START', 'IN_PROGRESS', 'AT_RISK', 'ACCOMPLISHED'],
		default: 'YET_TO_START',
	},
	startDate: {
		type: Date
	},
	endDate: {
		type: Date
	},

	id: {
		type: Number	
	},
	self: {
		type: String	
	},
	state: {
		type: String	
	},
	name: {
		type: String	
	},
	startDate: {
		type: Date	
	},
	endDate: {
		type: Date	
	},
	completeDate:{
		type: Date	
	},
	originBoardId: {
		type: Number	
	},
});

module.exports = { sprintSchema };