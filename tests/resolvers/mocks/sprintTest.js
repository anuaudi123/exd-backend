var BaseModel = require('./project');
const releaseMocks = require('../../mocks/release_mock');
const projectMocks= require('../../mocks/project_mock');

function SprintModel() {
    SprintModel.super_.apply(this, arguments);
}

SprintModel.super_ = BaseModel;

SprintModel.prototype = Object.create(BaseModel.prototype, {
    constructor: {
        value: SprintModel,
        enumerable: false
    }
});

SprintModel.findById = function (root,args) {
    return new Promise((resolve, reject) =>{
       this.input_val = releaseMocks.releaseInputMock();
       this.input_val['__proto__']['save'] = (callback) => {callback(false) };
       this.input_val['__proto__']['id'] = (releaseId) => {return this.input_val.releases[0]};
       if (this.input_val.releases){
           this.input_val.releases[0].sprints = [this.input_val.releases[0].sprints[0]]
           if (this.input_val.releases.length == 1) this.input_val.releases.push(this.input_val.releases[0]) 
       }
       resolve(this.input_val);
    });

    
};


SprintModel.update= function(root,args,callback) {
    return new Promise((resolve,reject) => {
        resolve({"ok":projectMocks.message().ok,"n":projectMocks.message().n,"nModified":projectMocks.message().nModified});

});
}

var Project = SprintModel;

module.exports = Project;