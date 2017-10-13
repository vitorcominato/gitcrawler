var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');
var GitHub = require('github-api');
var Promise = require("es6-promise").Promise;

// basic auth 
var gh = new GitHub({
  username: 'vitorcominato',
  password: 'c0cac0la',
});


var me = gh.getUser(); // no user specified defaults to the user for whom credentials were provided
console.log(me);
me.listNotifications(function(err, notifications) {
   console.log(notifications);
}).catch(function(){
  console.log('teste');
});

// var vitamorim = gh.getUser('vitamorim');
// vitamorim.listStarredRepos(function(err, repos) {
//    // look at all the starred repos!
//    console.log(err);
// });