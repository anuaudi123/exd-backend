var activitiesServices = function(projectType) {
	
	if(projectType){
		var  Activities  = require('../tests/resolvers/mocks/activitiesTestProject');
	}else{
		var  Activities  = require('../models/activities');
	}

	this.createActivities = function (args) {
		return new Promise((resolve, reject) => {
			var activity = new Activities(args.input);
			activity.save((err, activity) => {
				if (err) {
					reject(err);
				}
				resolve(activity);
			});
		});
	};
	
	this.getAllActivities = function (args) {
			return new Promise((resolve, reject) =>{
				Activities.find({ProjectID:args.ProjectID}).then((docs) => {
				resolve(docs);
			}, (e) => {
				reject(e);
			});
		});
	};
	this.updateActivities = function (args) {
			return new Promise((resolve, reject) => {
			Activities.update({_id:args.ActivityId},
				{$set:args.input}) .then((raw) => {
					resolve({"ok":raw.ok,"nModified":raw.nModified,"n":raw.n}),
				(e) => {
					reject(e)
				}
			  });
			
			});

	};
	

}
module.exports = activitiesServices;
