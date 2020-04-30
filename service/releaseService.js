var releaseService = function (projectType) {
	var { releaseSchema } = require('../models/release');
	if (projectType) {
		var Project = require('../tests/resolvers/mocks/project');
	} else {
		var { Project } = require('../models/project');
	}

	// Create Release Including Sprint
	this.createRelease = function (args) {
		return new Promise((resolve, reject) => {
			Project.findById(args.id).then((docs) => {
				docs.releases.push(args.input)
				docs.save(function (err) {
					if (err) reject(err)
					resolve(docs)
				});
			}, (e) => {
				reject(e)
			});
		});
	}

	this.updateRelease = function (args) {
		return new Promise((resolve, reject) => {
			Project.findById(args.id).then((docs) => {
				docs.releases = args.input
				docs.save(function (err) {
					if (err) reject(err)
					resolve(docs.releases)
				});
			});

		});
	}
}
	module.exports = releaseService;
