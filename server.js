// set up ========================
var http = require('http');
var bodyParser = require('body-parser');
var express  = require('express');
var twitterAPI = require('node-twitter-api');
var ig = require('instagram-node').instagram();
var app  = express();

app.use(bodyParser.json());
//Twitter configuration ================
var twitter = new twitterAPI({
  consumerKey: 'DrzfkfxgZaNR5X3K6vNxyrxkY',
  consumerSecret: 'ahnTD0jJi7YRIBGdtcZRQHzgVQ5T66UJeB1jbOSCm44nNA5TyN',
  callback: 'http://localhost:3000/twitterAccess'
});

var twitterKeys = {
  token: '',
  secret:''
};

var twitterMessage;

exports.updateMessage = function(req, res) {
  twitterMessage = "There are " + req.body.count +" photos in my Instagram feed using a filter! WhatTheFilter?!";
  console.log(req.body.count);
  res.send('cool');
};


exports.authorizeTwitter = function(req, res) {
  twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results){
    if(error) {
      console.log("Error getting OAuth request token: ", error);
    } else {
      twitterKeys.token = requestToken;
      console.log(twitterKeys.token);
      twitterKeys.secret = requestTokenSecret;
      console.log(twitterKeys.secret);
      res.redirect(twitter.getAuthUrl(requestToken));
    }
  });
};

exports.twitterAccess = function(req, res) {
  var verifier = req.param('oauth_verifier');
  twitter.getAccessToken(twitterKeys.token, twitterKeys.secret, verifier, function(error, accessToken, accessTokenSecret, results){
    if (error) {
      console.log(error);
    } else {
      console.log("Access: ");
      twitterKeys.accessToken = accessToken;
      console.log(twitterKeys.accessToken);
      twitterKeys.accessTokenSecret = accessTokenSecret;
      console.log(twitterKeys.accessTokenSecret);
    }
    resetStreamCount();
    res.on("finish", exports.postStatus);
    res.redirect("http://localhost:3000/#/success");
  });
};

exports.postStatus = function() {
  twitter.statuses("update", {
    status: twitterMessage
  },
  twitterKeys.accessToken,
  twitterKeys.accessTokenSecret,
  function(error, data, response) {
    if (error) {
      console.log(error);
    } else {
      console.log(response);
      }
    }
  );
}

//IG configuration =================
app.use(express.static(__dirname + '/public'));

var redirect_uri = 'http://localhost:3000/handleauth';

exports.authorizeUser = function(req, res) {
  ig.use({
  client_id: '874eb5d83dfb4035a71c97faa154e0a9',
  client_secret: '24a50386213c4d0bba6187a9669707ca'
  });
  resetStreamCount();
  res.redirect(ig.get_authorization_url(redirect_uri, {scope: ['likes'], state: 'a state'}));
};

exports.handleAuth  = function(req, res) {
  ig.authorize_user(req.query.code, redirect_uri, function(err, result) {
    if (err) {
      console.log(err.body);
      res.send("Didn't work");
    } else {
      user_id = result.user.id;
      //console.log("Success: Access token is" + result.access_token);
      ig.use({
        client_id: '874eb5d83dfb4035a71c97faa154e0a9',
        client_secret: '24a50386213c4d0bba6187a9669707ca',
        access_token: result.access_token
      });
      res.redirect('http://localhost:3000/#/stream');

    }
  });
};

var requestCount = 1;
var resetStreamCount = function() {
  //reset visual count
  requestCount = 1;
  //resets to most recent page
  options.max_id = null;
}

var options = {count:15, min_id:null, max_id:null};

exports.loadPhotoFeed = function(req, res) {
  //add options to retrieve next pages
  ig.user_self_feed(options, function(err, medias, pagination, remaining, limit) {
    if(err) {
      console.log(err.body);
    } else {
      console.log("Successfully retrieved page " + requestCount);
      options.max_id = pagination.next_max_id;
      res.send(medias);
      requestCount += 1;
    }
  });
};

exports.logOut = function(req, res) {
  ig.use({
        client_id: '874eb5d83dfb4035a71c97faa154e0a9',
        client_secret: '24a50386213c4d0bba6187a9669707ca'
      });
  res.redirect('https://instagram.com/accounts/logout/');
  resetStreamCount();
}

//send users to authorize
app.get('/authorize_user', exports.authorizeUser);
//redirect uri
app.get('/handleauth', exports.handleAuth);
//for loading self feed
app.get('/loadPhotoFeed', exports.loadPhotoFeed);
//to log user out
app.get('/logOut', exports.logOut);
//send users to authorize twitter
app.get('/authorize_twitter', exports.authorizeTwitter);
//redirect uri 
app.get('/twitterAccess', exports.twitterAccess);
//update message
app.post('/updateMessage', exports.updateMessage);
//post status path
app.get('/postStatus', exports.postStatus);


app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  console.log("Successfully Serving!");
});

