const projectMocks = require('../../mocks/project_mock');
const releaseMocks = require('../../mocks/release_mock');

class Project {
	constructor(input_val) {
        this.input_val = input_val;
    }

	static findOne() {
        return new Promise((resolve, reject) =>{
            resolve(projectMocks.getProject());
        });
	}

	static find({}) {
        return new Promise((resolve, reject) =>{
            resolve(projectMocks.getAllProjects());
        });
    }
    
    static findById(root,args) {
        return new Promise((resolve, reject) =>{
           this.input_val = releaseMocks.releaseInputMock();
           this.input_val['__proto__']['save'] = (callback) => {callback(false) };
           this.input_val['__proto__']['id'] = (releaseId) => {return this.input_val.releases[0]};
           resolve(this.input_val);
        });
    }

    static create(root, args) {
        return new Promise((resolve, reject) =>{
            resolve(projectMocks.getProject());
        });
    }

    save(callback){
       callback(false, this.input_val) ;

    }

  
    static update(root,args,callback) {
        return callback(false,{"ok":projectMocks.message().ok,"n":projectMocks.message().n,"nModified":projectMocks.message().nModified});
    }
    
    
}

module.exports =  Project;
