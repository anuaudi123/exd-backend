var sprintService = function(projectType) {
	var { releaseSchema } = require('../models/release');
	if(projectType){
		var  Project  = require('../tests/resolvers/mocks/sprintTest.js');
	}else{
		var { Project } = require('../models/project');
	}

	this.createSprint = function(args){
		return new Promise((resolve,reject) => {
			Project.findById(args.id).then((docs) => {
				var release = docs.releases.id(args.releaseID);
				release.sprints.push(args.input);
				docs.save(function (err) {
					if (err) reject(err)
					resolve(docs)
				  });
			},(e) => {
				reject(e)
			});
		 });
	}

	this.updateSprintStatus = function(args){
		return new Promise((resolve,reject) => {
			Project.findById(args.id).then((docs) => {
				//Rules can be Applied here to change status in Release Accordingly
				docs.releases.id(args.releaseID).sprints.id(args.sprintID).status=args.input.status
				docs.releases.id(args.releaseID).status=args.input.status
					docs.save(function (err) {
					if (err) reject(err)
					resolve(docs)
				  });
			},(e) => {
				reject(e)
			});
		 });
	}

	this.updateSprint = function(args){
		console.log("args",args);
		return new Promise((resolve, reject) => {
			Project.update({_id:args.id,'releases._id':args.releaseID},{$set: {'releases.$.sprints':args.input}}) .then((raw) => {
					resolve({"ok":raw.ok,"nModified":raw.nModified,"n":raw.n}),
				(e) => {
					reject(e)
				}
			  });
			
			});

	}

}
module.exports = sprintService;
