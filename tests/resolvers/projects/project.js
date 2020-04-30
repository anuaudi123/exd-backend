var Project = require('../mocks/project');
var resolverFunction =  require('../../../schemas/resolvers');
const projectMocks = require('../../mocks/project_mock');
var { resolvers } = new resolverFunction(true);
var glob = require('glob');
var path = require('path');
var fs = require('fs');
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const db = lowdb(new FileSync('db.json'));

var TEST_FILE_PATH_PNG = path.join(process.cwd(), './tests/am_water.jpg');


const getAllProjects = () => {
    const output =  new Promise((resolve, reject) => {
      resolvers.Query.getAllProjects().then((docs) => {
      			resolve(docs);
      		}, (e) => {
      			resolve(e);
          })
        });
    return expect(output).resolves.toEqual(projectMocks.getAllProjects());
    
};

const createProject = () => {
    var project = {input: projectMocks.getProject()};
    const output =  new Promise((resolve, reject) => {
      resolvers.Mutation.createProject("", project).then((docs) => {
      			resolve(docs);
      		}, (e) => {
      			resolve(e);
          })
        });
    return expect(output).resolves.toEqual(projectMocks.getProject());
    
};

 



const getProject = () => {
    var project = {id: projectMocks.updatebyid};
    const output =  new Promise((resolve, reject) => {
      resolvers.Query.getProject("", project).then((docs) => {
      			resolve(docs);
      		}, (e) => {
      			resolve(e);
          })
        });
    return expect(output).resolves.toEqual(projectMocks.getAllProjectByID());
    
};


const updateProject = () => {
    var project = {id:projectMocks.updatebyid(),input: projectMocks.getProject()};
    const output =  new Promise((resolve, reject) => {
      resolvers.Mutation.updateProject("",project).then((docs) => {
      			resolve(docs);
      		}, (e) => {
      			reject(e);
          })
        });
    return expect(output).resolves.toEqual(projectMocks.message());
    
};


const createActivities = () => {
    var project = {input: projectMocks.activitiesMock()};
    const output =  new Promise((resolve, reject) => {
      resolvers.Mutation.createActivities("",project).then((docs) => {
      			resolve(docs);
      		}, (e) => {
      			reject(e);
          })
        });
    return expect(output).resolves.toEqual(projectMocks.activitiesMock());
    
};

const updateActivities = () => {
    var project = {ProjectID:projectMocks.activitiesMock().ProjectID,type:projectMocks.activitiesMock().type, input: projectMocks.activitiesMock()};
    const output =  new Promise((resolve, reject) => {
      resolvers.Mutation.updateActivities("",project).then((docs) => {
      			resolve(docs);
      		}, (e) => {
      			reject(e);
          })
        });
    return expect(output).resolves.toEqual(projectMocks.message());
    
};

const getAllActivities = () => {
    var project = {id: projectMocks.updatebyid};
    const output =  new Promise((resolve, reject) => {
      resolvers.Query.getAllActivities("", project).then((docs) => {
      			resolve(docs);
      		}, (e) => {
      			resolve(e);
          })
        });
    return expect(output).resolves.toEqual(projectMocks.activitiesMock());   
};


const imageUpload = () => {
    var  file_data = new Promise((resolve, reject) => {
        var file = {
            encoding:"7bit",
            filename:"am_water.jpg",
            mimetype:"image/jpg",
            stream:fs.createReadStream(TEST_FILE_PATH_PNG)
        }
        resolve(file);
    });
    const output =  new Promise((resolve, reject) => {
        resolvers.Mutation.singleUpload(undefined, {file: file_data}).then((file) => {
            console.log(file);
                    resolve(file);
                }, (e) => {
                    reject(e);
            })
        });
    return expect(output).resolves.toEqual(expect.objectContaining({
            id: expect.any(String),
            filename: "am_water.jpg",
            mimetype: "image/jpg",
            encoding: expect.any(String),
            path: expect.any(String)
        }) 
    );   
};

module.exports = {
    getAllProjects, 
    createProject,
    updateProject,
    getProject,
    imageUpload,
    createActivities,
    updateActivities,
    getAllActivities
};
