// set up ========================
var http = require('http');
var express  = require('express');
var ig = require('instagram-node').instagram();
var Twitter = require('twitter');
var app  = express();

//Twitter configuration
var client = new Twitter({
	consumer_key: '',
	consumer_secret:'',
	access_token:'',
	access_token_secret:'',
});

//IG configuration =================
app.use(express.static(__dirname + '/public'));

ig.use({
	client_id: '874eb5d83dfb4035a71c97faa154e0a9',
	client_secret: '24a50386213c4d0bba6187a9669707ca'
});

var redirect_uri = 'http://localhost:3000/handleauth';


exports.authorize_user = function(req, res) {
	res.redirect(ig.get_authorization_url(redirect_uri, {scope: ['likes'], state: 'a state'}));
};

exports.handleauth  = function(req, res) {
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
	requestCount = 1;
	options.max_id = null;
}

//send users to authorize
app.get('/authorize_user', exports.authorize_user);
//redirect uri
app.get('/handleauth', exports.handleauth);
//for loading self feed
app.get('/loadPhotoFeed', exports.loadPhotoFeed);
//to log user out
app.get('/logOut', exports.logOut);


app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  console.log("Successfully Serving!");
});

