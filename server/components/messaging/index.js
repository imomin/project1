var http = require('http'),
	fayeRedis = require('faye-redis'),
	deflate = require('permessage-deflate'),
    faye = require('faye'),
    EventEmitter = require('events').EventEmitter,
    MongoClient = require('mongodb').MongoClient,
	ObjectId = require('mongodb').ObjectID,
	NodeCache = require( "node-cache" ),
	db,
	authCache = new NodeCache({ stdTTL: 3600, checkperiod: 2400 }),
	CronQueue = require('./CronEventQueue');
	cronQueue = new CronQueue(),
	HashMap = require('hashmap'),
	map = new HashMap();

 function isJsonEqual(w, x) {
  var p, x1, x2;
  x1 = JSON.parse(JSON.stringify(w));
  x2 = JSON.parse(JSON.stringify(x));
  p = null;
  for (p in x1) {
    if (typeof x2[p] === 'undefined') {
      return false;
    }
  }
  for (p in x1) {
    if (x1[p]) {
      switch (typeof x1[p]) {
        case 'object':
          if (!isJsonEqual(x1[p],x2[p])) {
            return false;
          }
          break;
        case 'function':
          if (typeof x2[p] === 'undefined' || (p !== 'equals' && x1[p].toString() !== x2[p].toString())) {
            return false;
          }
          break;
        default:
          if (x1[p] !== x2[p]) {
            return false;
          }
      }
    } else {
      if (x2[p]) {
        return false;
      }
    }
  }
  for (p in x2) {
    if (typeof x1[p] === 'undefined') {
      return false;
    }
  }
  return true;
};

var dburl = 'mongodb://localhost:27017/cronbox-dev';
	MongoClient.connect(dburl, function(err, database) {
	    if(err) console.log(err);
	    console.log("DB Connection");
	    db = database;
	    let cursor = db.collection('tasks').find({name:/task/});
	    cursor.on("data", function(task) {
		if (task){
			map.set(task.user+':'+task.name, {'dtorcron':task.cron,'data':task.data});
		}
		else {
			console.log("done populating data");	
		}
	});

	// When the stream is done
	cursor.on("end", function() {
		console.log("cursor ended.");
		initialize();
	});
	    
	});

function initialize() {
	var bayeux = new faye.NodeAdapter({mount: '/cronbox', timeout: 45,
			engine:{
		    type:fayeRedis,
		    host:'localhost',
		    port:6379
		}});

	var client = bayeux.getClient();

		bayeux.addWebsocketExtension(deflate);

	var processAuth = function(id, message, callback){
		if(message.channel === '/meta/subscribe' || message.channel === '/meta/unsubscribe'){
			if(message.ext.data){
				var name = message.subscription.replace("/","");
				var mapData = map.get(id+':'+name) || {};
				if(!isJsonEqual({'dtorcron':message.ext.data.dtorcron,'data':message.ext.data.data}, mapData)){
					try {
						db.collection('tasks').findOneAndUpdate({'name':name, user: new ObjectId(id)},{$set:{cron:message.ext.data.dtorcron,data:message.ext.data.data}}, {upsert:true,returnOriginal:false}, function(err, task){
							console.log(task);
							cronQueue.set(task.value.user, task.value.name, task.value.cron, task.value.data);
						});
					}
					catch (e){
					   console.log(e);
					}
				}
				else {
					cronQueue.set(id, name, message.ext.data.dtorcron, message.ext.data.data);
				}
			}
			message.subscription = '/'+ id + message.subscription;
		}
		delete message.ext.apiKey;
		delete message.ext.apiSecret;
		return callback(message);
	}

	var authorized = function(message, callback){
		var apiKey = message.ext && message.ext.apiKey;
	  	var apiSecret = message.ext && message.ext.apiSecret;
	  	if(!apiKey && !apiSecret){
	  		message.error = '403::Authentication required!';
			return callback(message);
	  	}
	  	var id = authCache.get(apiKey+':'+apiSecret);
	  	if(id) {
			return processAuth(id,message,callback);
	  	}
		db && db.collection('users').findOne({'apikey':apiKey,'secretkey':apiSecret}, {_id:1}, function(err, doc){
			if(err) console.log(err);
			if(doc){
				authCache.set(apiKey+':'+apiSecret,doc._id);
				authCache.set(doc._id,message.ext);
				return processAuth(doc._id,message,callback);
			}
			else {
				console.log('no data found.');
				return callback(message);
			}
		});
	}

		bayeux.addExtension({
			incoming: function(message, callback) {
				authorized(message, callback);
			},

			outgoing: function(message, callback) {
				if (message.ext) {
					delete message.ext.apiKey;
					delete message.ext.apiSecret;
				}
				callback(message);
			}
		});


		process.on('SIGTERM', function () {
		  db.close();
		  console.log('About to exit with code: ${code}');
		});


	// Handle non-Bayeux requests
	var server = http.createServer(function(request, response) {
		response.writeHead(200, {'Content-Type': 'text/plain'});
		response.end('Hello, non-Bayeux request');
	});

		bayeux.attach(server);
		server.listen(8000);
}