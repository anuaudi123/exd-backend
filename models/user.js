var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
mongoose.plugin(require('mongoose-regex-search'));
// create a schema

var userSchema = new Schema({
	employeeNumber: {
		type: Number, 
		required: true,
		searchable: true
	},
	employeeName: { 
		type: String, 
		required: true,
		searchable: true
	},
	employeeStatus: { 
		type: String 
	},
    employeeStatusDesc: { 
		type: String 
	},
	birthDate: {
		 type: Date 
	},
	gender: { 
		type: String 
	},
    originalHireDate: {type: Date},
    awHireDate: {type: Date},
    userId: {type: String, searchable: true },
    emailAddress: {type: String, searchable: true },
    businessCellPhone: {type: Number, searchable: true },
    personalCellPhone: {type: Number },
    workPhoneNumber: {type: Number},
    Permanent_Residence: {
        street1: { type: String },
        street2: { type: String },
    	city: { type: String },
        state: { type: String },
        zipCode:{ type: Number },
    	telephone: {type: Number } 
    },
    managerName: { type: String , searchable: true},
    managerPosition: { type: String },
    employee_manager: { type: String },
    jobDescription: { type: String },
    positionDescription: { type: String },
    workLocation: { type: String },
    union_nonunion_flag: { type: String },
    costCenter: { type: String },
    costCenterDescription: { type: String },
	orgUnitDescription: { type: String },
	roles: [{type: String}]
}, 
{   
	collection: 'User'
}
);
// we need to create a model using it
userSchema.plugin(uniqueValidator);
// userSchema.index({'$**': 'text'});
var User = mongoose.model('User', userSchema);
module.exports = { User };
