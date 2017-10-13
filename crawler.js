var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');

var token = "464adba848db3ff77c490a2918a504bee6e31a7c";
var baseUrl = "http://github.amil.com.br/api/v3/";
var urlSufix = "?access_token=" + token;
var pageToVisit = baseUrl + "user/repos?access_token="+token;



request(pageToVisit, function(error, response, body) {
  var repositories = JSON.parse(response.body)
  Object.keys(repositories).map(function(objectKey, index) {
    var repo = repositories[objectKey];
    branchesUrl = baseUrl + "repos/clinical/" + repo.name + "/branches" + urlSufix
    request(branchesUrl, function(error, response, body) {
      var branches = JSON.parse(response.body)
      Object.keys(branches).map(function(objectKey, index) {
        var branch = branches[objectKey];
        if(branch.name != "master"){
          pullsUrl = baseUrl + "repos/clinical/" + repo.name + "/pulls" + urlSufix
          var hasPullRequest = false;
          request(pullsUrl, function(error, response, body) {
            var pulls = JSON.parse(response.body)
            Object.keys(pulls).map(function(objectKey, index) {
              var pull = pulls[objectKey];
              if(pull.head.ref == branch.name){
                hasPullRequest = true;
                
                issueUrl = baseUrl + "repos/clinical/" + repo.name + "/issues/" + pull.number + urlSufix
                request(issueUrl, function(error, response, body) {
                  var issue = JSON.parse(response.body);
                  if(issue.labels.length == 0){
                    console.log("Repositório " + repo.name + " na branch " + branch.name + " no Pull Request " + pull.number + " não possui labels");
                  }
                });

              }
            });
            if(!hasPullRequest){
              console.log("Repositório " + repo.name + " na branch " + branch.name + " não possui um pull request!");
            }
          });
        }
      });
    });
  });
});
