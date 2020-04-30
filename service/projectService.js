var projectService = function(projectType) {
	var { releaseSchema } = require('../models/release');
	var JiraClient = require('../helpers/jiraIntegration');
	var  Boards  = require('../models/boards');
	if(projectType){
		var  Project  = require('../tests/resolvers/mocks/project');
	}else{
		var { Project } = require('../models/project');
	}

	this.createProject = function (args) {
		return new Promise((resolve, reject) => {
			var project = new Project(args.input);        		
			getrelease(project).then((docs) => {	
			  	getSprint(docs).then((result) =>{					  
						project.save((err, result) => {
							if (err) {
								reject(err);
									}			
							resolve(result);
						});
				});
			});
	
	

	function getrelease(project) {		
		return new Promise((resolve, reject) =>{			
		JiraClient.getAllVersions(project.jira_key).then((release) => {
			project.releases = release;			
			resolve(project);
		    }, (e) => {
			reject(e);
		        });
			});
	       } 

		});
	  };

	  function getSprint(project) {				 
			return new Promise((resolve,reject) =>{ Boards.find({}).then((boardList)=> {
			 var boardid;			 
					for(var i = 0; i < boardList[0].values.length; i++) {
						if(boardList[0].values[i].location.projectId == project.jira_key){
							boardid = boardList[0].values[i].id;										
						}
					  }					    
						JiraClient.getSprintForBoard(boardid).then((Sprints)=>{
						project.sprints=Sprints.values;							
    					resolve(project);					
					},(e) => {
						reject(e);
							},
					);
				});
			});
	 	 };
	



	this.getProjectLists = () => {
		return new Promise((resolve, reject) =>{
			Project.find({}).then((docs) => {
				resolve(docs);
			}, (e) => {
				reject(e);
			});
		});
	};

	this.getProject = function(args) { 
		return new Promise((resolve,reject) => {
		Project.findById(args.id).then((docs) => {
			resolve(docs);
		},(e) => {
			reject(e)
		});
	 });
	};
	
	var getProjectDetail = function(args){
		return new Promise((resolve, reject) =>{
			Project.find({}).then((docs) => {
				resolve(docs);
			}, (e) => {
				reject(e);
			});
		});
	};

	this.updateProject = function (args) {
		return new Promise((resolve, reject) => {
		Project.update({_id:args.id},{$set:args.input} ,function(err, raw) {
		
			if (err) {
			  return reject(err);
			}
			resolve({"ok":raw.ok,"nModified":raw.nModified,"n":raw.n});
		  });
		
		});
	}

	// Create Release Including Sprint
	this.createRelease = function(args){
		return new Promise((resolve,reject) => {
			Project.findById(args.id).then((docs) => {
				docs.releases.push(args.input)
				docs.save(function (err) {
					if (err) reject(err)
					resolve(docs)
				  });
			},(e) => {
				reject(e)
			});
		 });
	}

	this.createSprint = function(args){
		return new Promise((resolve,reject) => {
			Project.findById(args.id).then((docs) => {
				var release = docs.releases.id(args.releaseID);
				release.sprints.push(args.input)
				docs.save(function (err) {
					if (err) reject(err)
					resolve(docs)
				  });
			},(e) => {
				reject(e)
			});
		 });
	}
}
module.exports = projectService;
