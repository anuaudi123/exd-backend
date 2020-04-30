const projectMocks = require('../../mocks/project_mock');
class Project {
	constructor(input_val) {
        this.input_val = input_val;
    }
    save(callback){
        callback(false, this.input_val) ;

    }   
    
    static update(root,args,callback) {
        return new Promise((resolve, reject) =>{
        resolve({"ok":projectMocks.message().ok,"n":projectMocks.message().n,"nModified":projectMocks.message().nModified});
    });
   
      
    }

    static find({}) {
        return new Promise((resolve, reject) =>{
            resolve(projectMocks.activitiesMock());
        });
    }
}

module.exports = Project;
