var resolversFunction = function(projectType) {
	var projectService  = require('../service/projectService');
	var ProjectService = new projectService(projectType);
	var releaseService = require('../service/releaseService');
	var sprintService = require('../service/sprintService');
	var ReleaseService = new releaseService(projectType);
	var SprintService = new sprintService(projectType);
	var activitiesServices= require('../service/activitiesServices')
	var ActivitiesServices= new activitiesServices(projectType);
	var userService= require('../service/userService');
	var UserActivity = new userService(projectType);
	var UploadService = require('../service/uploadService');
	var authHelper = require('../helpers/auth');
	const { GraphQLUpload } = require('apollo-upload-server');
	const GraphQLJSON = require('graphql-type-json');
	const { GraphQLScalarType } = require('graphql');
	const { Kind } = require('graphql/language');
	const JiraIntegration = require('../helpers/jiraIntegration');
	this.resolvers = {
		Upload: GraphQLUpload,
		JSON: GraphQLJSON,
		Date: new GraphQLScalarType({
			name: 'Date',
			description: 'Date custom scalar type',
			parseValue(value) {
				return new Date(value);  // value from the client
			},
			serialize(value) {
			  return new Date(value.getTime()); // value sent to the client
			},
			parseLiteral(ast) {
			  if (ast.kind === Kind.INT) {
				return parseInt(ast.value, 10); // ast value is always in string format
			  }
			  return ast.value;
			},
		  }) ,
		Query: {
			info: () => { 
				return 'This Application is designed to provide API for Executive Dashboard App.';
			},
			getAllProjects: () => {
				return ProjectService.getProjectLists();
			},
			getProject: (root,args) => {
					return ProjectService.getProject(args);
			},
			uploads: () => {
				return UploadService.getFile()
			},
			getLoginUrl: () => {
				return authHelper.getAuthUrl();
			},
			getToken: (root, args, context) => {
				console.log(context);
				var token = ""
				if(args.token){
					token = authHelper.getTokenFromCode(args.token, context.res);
				}else{
					context.res.status = 400
				}

				return token;
			},
			signOut: (root, args, context) => {
				console.log(context);
				return authHelper.clearCookies(context.res)
			},
			getAllActivities: (root,args) => {
				return ActivitiesServices.getAllActivities(args);
			},
			getAllUsers: (root, args) => {
				console.log(args);
				return UserActivity.getAllUsers(args);
			},
			getJiraToken: (root, args) => {
				return JiraIntegration.getJiraToken();
			},
			getJiraAccessToken: (root, args) => {
				return JiraIntegration.getJiraAccessToken();
			},
			getAllJiraProjects: (root, args) => {
				return JiraIntegration.getAllJiraProjects();
			},
			getJiraProject: (root, args) => {
				return JiraIntegration.getJiraProject();
			},
			getAllVersions: (root, args) => {
				return JiraIntegration.getAllVersions(args.id);
			},
			getAllBoards: (root, args) => {
				return JiraIntegration.getAllBoards();
			},
		},
		Mutation: {
				createProject: (root, args) => {
					return ProjectService.createProject(args);
				},
				updateProject: (root,args) => {
					return ProjectService.updateProject(args);
				},
				createRelease: (root, args) => {
					console.log(args);
					return ReleaseService.createRelease(args);
				},
				createSprint: (root, args) => {
					return SprintService.createSprint(args);
				},
				singleUpload: (obj, { file }) => {
					return UploadService.processUpload(file)
				},
				multipleUpload: async (obj, { files }) => {
					const { resolve, reject } = await promisesAll.all(
						files.map(UploadService.processUpload)
					)
					if (reject.length)
						reject.forEach(({ name, message }) =>
						// eslint-disable-next-line no-console
						console.error(`${name}: ${message}`)
						)
						return resolve
				},
				updateRelease: (root,args) => {
					return ReleaseService.updateRelease(args);
				},
				updateSprint: (root,args) => {
					return SprintService.updateSprint(args);
				},

				updateSprintStatus: (root,args) => {
					return SprintService.updateSprintStatus(args);
				},
				createActivities: (root,args) => {
					return ActivitiesServices.createActivities(args);
				},

				updateActivities: (root,args) => {
					return ActivitiesServices.updateActivities(args);
				},
			}

		};
	}
module.exports = resolversFunction;
