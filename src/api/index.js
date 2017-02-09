////////////////////////
// MySQL
////////////////////////

var mysql = require('mysql');
const config = {
  host: 'localhost',
  user: 'overattached',
  password: 'Ti56SA',
  database: 'overattached'
}
/*
  CREATE PLAYER
*/
const createPlayer = (res, username)=>{
  var connection = mysql.createConnection(config);
  connection.connect();
  // CHECK IF USER EXISTS IN OUR DB
  var query = connection.query('select * from users where username = ?',username, (err, result)=>{
    if(err) {
      console.error(err);
      connection.end();
      return;
    }
    if(result.length != 0) {
        res.send({ error : {code: 200, message: "This user already exists"}});
        connection.end();
        return;
    }
    // CHECK IF USER EXISTS IN OW API
    var client = restify.createJsonClient({
      url: 'https://api.lootbox.eu',
      version: '*'
    });
    console.log("--Calling OW Api...");
    var count = setInterval(()=>{ console.log("...")},3000);
    client.get('/pc/eu/'+username+'/profile', function(err, req, res2, obj) {
      clearInterval(count);
      console.log("--Data received.");
      if(obj) {
        if(obj.statusCode == 404) {
          res.send({ error : {code: 404, message: "This battletag doesn't exist. Remember battletags are case sensitive."}});
          connection.end();
          return;
        }
        // INSERT USER
        var user = {
          username: username,
          games: obj.data.games.competitive.played,
          wins: obj.data.games.competitive.wins,
          avatar: obj.data.avatar,
        }
        var query = connection.query('insert into users set ?', user, (err, result)=>{
          if(err) {
            console.error(err);
            connection.end();
            return;
          }
          res.send({ message : "User "+username+" successfully created"});
          connection.end();
          return;
        });
      }
    });
  });
}
/*
  UPDATE PLAYER
*/
const updatePlayer = (res, username)=>{
  var connection = mysql.createConnection(config);
  connection.connect();
  var query = connection.query('select games, wins from users where username = ?',username, (err, result)=>{
    if(err) {
      console.error(err);
      connection.end();
      return;
    }
    if(result != 'undefined') {
      // if there's no register for this user, try to create new one
      if(result.length == 0) {
        res.send({ error : {code: 404, message: "This user doesn't exist"}});
        connection.end();
        return;
      }
      console.log(result);
      var games = result[0].games;
      var wins  = result[0].wins;
      var client = restify.createJsonClient({
        url: 'https://api.lootbox.eu',
        version: '*'
      });
      console.log("--Calling OW Api...");
      var count = setInterval(()=>{ console.log("...")},3000);
      client.get('/pc/eu/'+username+'/profile', function(err, req, res2, obj) {
        clearInterval(count);
        console.log("--Data received.");
        if(obj) {
          // Check if there's new games
          var totalGames = obj.data.games.competitive.played;
          var totalWins = obj.data.games.competitive.wins;
          var avatar = obj.data.avatar;
          if(totalGames > games) {
            // Make update object
            var update = {
              username : username,
              sr       : parseInt(obj.data.competitive.rank),
              games    : totalGames - games,
              wins     : totalWins - wins,
              date     : Math.ceil(+ new Date()/1000) // unix timestamp (seconds)
            }
            console.log(update);
            // Update to users ()
            connection.query('UPDATE users SET games = ?, wins = ?, avatar = ? WHERE username = ?', [totalGames, totalWins, avatar, username], (err)=>{
              if(err){
                res.send(err);
                connection.end();
                return;
              }
              // Post to updates
              connection.query('INSERT into updates set ?', update, (err)=>{
                if(err) {
                  res.send(err);
                  connection.end();
                  return;
                }
                success = "Successfully updated database";
                console.log(obj.data.avatar);
                res.send({
                  message: success,
                  update: update
                });
                console.log(success);
                connection.end();
              })
            });
          } else {
            // Answer with 'no updates needed'
            connection.query('UPDATE users SET avatar = ? WHERE username = ?',[avatar, username], (err)=>{
              if(err) {
                res.send(err);
                connection.end();
                return;
              }
              res.send({message: "No updates needed", player: {username: username, avatar: avatar}});
              connection.end();
              return;
            });
          }
        }
      });
    }
  });
}
/*
  GET PLAYER UPDATES
*/
const getUpdates = (res, username, limit)=>{
  var connection = mysql.createConnection(config);
  connection.connect();
  var query = connection.query('select * from updates where username = ? order by date desc limit ?',[username,limit], (err, result)=>{
    if(err) {
      console.error(err);
      res.send({message: err});
      connection.end();
      return;
    }
    var query = connection.query('select * from users where username = ?', username, (err, result2)=>{
      if(err) {
        console.error(err);
        res.send({message: err});
        connection.end();
        return;
      }
      res.send(
        { 
          updates: result,
          player: result2[0]
        }
      );
      connection.end();
    });
  });
}
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