var userServices = function(projectType) {
	
	if(projectType){
		var  Activities  = require('../tests/resolvers/mocks/activitiesTestProject');
	}else{
		var  { User } = require('../models/user');
	}

	
	this.getAllUsers = (args) => {
		return new Promise((resolve, reject) =>{
            // var texts = args.searchText
            // if(!isNaN(texts)){
            //     texts = parseInt(texts);
            // }
            // var texts = (!isNaN(args.searchText)) ? parseInt(args.searchText) : args.searchText
            let query = User.search(args.searchText);
			User.find(query).then((docs) => {
				resolve(docs);
			}, (e) => {
				reject(e);
			});
		});
	};
}
module.exports = userServices;
