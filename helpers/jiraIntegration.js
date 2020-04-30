var JiraClient = require('jira-connector');
var fs = require('fs');
var  Boards  = require('../models/boards');

var getJiraToken = () => {
    return new Promise((resolve, reject) => {
        JiraClient.oauth_util.getAuthorizeURL({
            host: process.env.JIRA_HOST,
            oauth: {
                consumer_key: 'OauthKey',
                private_key: fs.readFileSync(process.env.JIRA_PEM_PATH, 'utf8')

            }
        }, function (error, oauth) {
            if(error) reject(error);
            resolve(oauth);
        });
    });
}

var getJiraAccessToken = () => {
    return new Promise((resolve, reject) => {
        JiraClient.oauth_util.swapRequestTokenWithAccessToken({
            host: process.env.JIRA_HOST,
            oauth: {
                token: process.env.JIRA_TOKEN,
                token_secret: process.env.JIRA_SECRET,
                oauth_verifier: process.env.JIRA_OAUTH_CODE,
                consumer_key: 'OauthKey',
                private_key: fs.readFileSync(process.env.JIRA_PEM_PATH, 'utf8')
            }
        }, function (error, accessToken) {
            if(error) reject(error);
            resolve(accessToken);
        });
    });
}

var jira = new JiraClient({
    host: process.env.JIRA_HOST,
    oauth: {
        consumer_key: 'OauthKey',
        private_key: fs.readFileSync(process.env.JIRA_PEM_PATH, 'utf8'),
        token: process.env.JIRA_ACCESS_TOKEN,
        token_secret: process.env.JIRA_SECRET
    }
});

var getAllJiraProjects = () => {
    return new Promise((resolve, reject) => {
        jira.project.getAllProjects({expand: ['description']}, function(error, projects){
            if(error) reject(error);
            console.log(projects)
            resolve(projects);
        })
    });
}



var getJiraProject = (jira_project_id) => {
    return new Promise((resolve, reject) => {
        jira.project.getProject({projectIdOrKey: jira_project_id, expand: ['description']}, function(error, project){
            if(error) reject(error);
            resolve(project)
        })
    })
}

var getAllVersions = (jira_project_id) => {
    return new Promise((resolve, reject) => {
        jira.project.getVersions({projectIdOrKey: jira_project_id}, function(error, versions){
            if(error) reject(error);         
            resolve(versions)
        })
    })
}



var getAllBoards = () => {
    return new Promise((resolve, reject) => {
        jira.board.getAllBoards("", function(error, boards){
            if(error) reject(error);   

            console.log(boards)      
            //resolve(boards)
            var boards = new Boards(boards);            
            boards.save((err, boards) => {
                if (err) {
                    reject(err);
                }			
                resolve(boards);
            });
        })
    })
}


// var getAllSprints = (jira_project_id) => {
//     return new Promise((resolve, reject) => {
//        // jira_project_id=1;
//         jira.board.getIssuesForBoard({boardId:"1"}, function(error, sprints){
//             if(error) reject(error);
//             console.log("-----------------------------------",sprints)
//             resolve(sprints)
//         })
//     })
// }

var getSprintForBoard = (Jira_Board_id) => {
    return new Promise((resolve, reject) => {
       // jira_project_id=1;
        jira.board.getSprintsForBoard({boardId:Jira_Board_id}, function(error, boards){
            if(error) reject(error);           
            resolve(boards)
        })
    })
}



// var getIssuesForBoard = (Jira_Board_id) => {
//     return new Promise((resolve, reject) => {
//        // jira_project_id=1;
//         jira.board.getIssuesForBoard({boardId:Jira_Board_id}, function(error, issues){
//             if(error) reject(error);
//             console.log("-----------------------------------",issues)
//             resolve(issues)
//         })
//     })
// }


module.exports = {
    getJiraToken,
    getJiraAccessToken,
    getAllJiraProjects,
    getJiraProject,
    getAllVersions,
   // getAllSprints,
    getAllBoards,
    getSprintForBoard
   // getIssuesForBoard
}