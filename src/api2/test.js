//////////////////////////////////////
// Init
//////////////////////////////////////
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var restify = require('restify');
//////////////////////////////////////

const getPlayerProfile = (username)=>{
	var url = 'http://playoverwatch.com/en-us/career/pc/us/'+username;

	request(url, function(error, response, html){
		if(!error){
			var $ = cheerio.load(html);

			var games, wins, sr;
			var obj = { username, games, wins, sr };

			var rows = $("#competitive .card-stat-block tr");

			obj.sr = $(".u-align-center.h6").first().text();
			obj.games = rows.eq(46).find("td:last-child").text();
			obj.wins = rows.eq(47).find("td:last-child").text();
		}
		console.log(obj);
		// fs.writeFile('output.html', html, function(err){
		// 	console.log('File successfully written!');
		// })
	})
}


// getPlayerProfile('necKros-21595');


console.log('Testing 8081\n-----------------------');

////////////////////////
// RESTIFY
////////////////////////

var restify = require('restify');
var server = restify.createServer({
  name: 'Overattached Api',
  version: '1.0.0'
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());

server.get('/update/:username', function (req, res, next) {
  data = updatePlayer(res, req.params.username);
  return next();
});

server.get('/games/:username/', function (req, res, next) {
  if(req.params.limit) {
    var limit = Math.min(req.params.limit, 50);
  } else {
    var limit = 3;
  }
  var data = getUpdates(res, req.params.username, parseInt(limit));
  return next();
});

server.get('/create/:username/', function (req, res, next) {
  var data = createPlayer(res, req.params.username);
  return next();
});
 
server.listen('5959', function () {
  console.log('%s listening at %s', server.name, server.url);
});