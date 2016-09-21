var http = require('http'),
	fayeRedis = require('faye-redis'),
	deflate = require('permessage-deflate'),
    faye = require('faye'),
    EventEmitter = require('events').EventEmitter,
    MongoClient = require('mongodb').MongoClient,
	ObjectId = require('mongodb').ObjectID,
	NodeCache = require( "node-cache" ),
	db;
	authCache = new NodeCache({ stdTTL: 3600, checkperiod: 2400 });


var dburl = 'mongodb://localhost:27017/cronbox-dev';
	MongoClient.connect(dburl, function(err, database) {
	    if(err) console.log(err);
	    db = database;
	    console.log("DB Connection");
	});

var bayeux = new faye.NodeAdapter({mount: '/cronbox', timeout: 45,
		engine:{
	    type:fayeRedis,
	    host:'localhost',
	    port:6379
	}});

	bayeux.addWebsocketExtension(deflate);

	var authorized = function(message, callback) {
	  var apiKey = message.ext && message.ext.apiKey;
	  var apiSecret = message.ext && message.ext.apiSecret;
	  if(apiKey === "009e0bccee06bfc7c8e0472b0898d03c" && apiSecret === "blahblah=="){
	  	console.log(message.channel);
		if(message.channel === '/meta/subscribe' || message.channel === '/meta/unsubscribe'){
			message.subscription = '/57a7c0edbd0418f7b299df2e' + message.subscription;
		}
		delete message.ext.apiKey;
		delete message.ext.apiSecret;
	  	return callback(message);
	  }
	  	message.error = '403::Authentication required';
	  	return callback(message);
	};

	var authorized2 = function(message, callback){
		var apiKey = message.ext && message.ext.apiKey;
	  	var apiSecret = message.ext && message.ext.apiSecret;
	  	if(!apiKey && !apiSecret){
	  		message.error = '403::Authentication required!';
			return callback(message);
	  	}
	  	var id = authCache.get(apiKey+':'+apiSecret);
	  	if(id) {
	  		console.log('id2 ' + id);
  			if(message.channel === '/meta/subscribe' || message.channel === '/meta/unsubscribe'){
				message.subscription = '/'+id + message.subscription;
			}
			return callback(message);
	  	}
	  	console.log('apikey: ' + apiKey + ' secretkey: ' + apiSecret);
		db && db.collection('users').findOne({'apikey':apiKey,'secretkey':apiSecret}, {_id:1}, function(err, doc){
			if(err) console.log(err);
			console.log('waiting for data...');
			console.log(doc);
			if(doc){
				authCache.set(apiKey+':'+apiSecret,doc._id);
				authCache.set(doc._id,{'apiKey':apiKey,'apiSecret':apiSecret});
				if(message.channel === '/meta/subscribe' || message.channel === '/meta/unsubscribe'){
					message.subscription = '/'+doc._id + message.subscription;
				}
				delete message.ext.apiKey;
				delete message.ext.apiSecret;
				console.log("MESSAGE");
				console.log(message);
				return callback(message);
			}
			else {
				console.log('no data found.');
				return callback(message);
			}
		});
	}

	bayeux.addExtension({
		incoming: function(message, callback) {
			console.log('*************INCOMING***************');
			console.log(message);
			console.log('*************INCOMING***************');
			//if (!message.channel.match(/^\/meta\//)) {
				authorized2(message, callback);
				// if (!authorized(message)){
				//   message.error = '403::Authentication required';
				// }
			//}
			//callback(message);
		},

		outgoing: function(message, callback) {
			console.log('*************OUTGOING***************');
			console.log(message);
			console.log('*************OUTGOING***************');
			if (message.ext) {
				delete message.ext.apiKey;
				delete message.ext.apiSecret;
			}
			callback(message);
		}
	});






var client = bayeux.getClient();

client.addExtension({
	outgoing: function(message, callback) {

		/*
			id: '3',
			clientId: 'ssegxynygqbqb4iowz0k14gf7jnnyro',
			channel: '/meta/subscribe',
			successful: true,
			subscription: '/57a7c0edbd0418f7b299df2f/ping'
		*/
		console.log('*************CLIENT OUTGOING***************');
		console.log(message);
		console.log('*************CLIENT OUTGOING***************');
		var channel = message.subscription || message.channel;
		var id = channel.substr(channel.indexOf("/"),channel.lastIndexOf("/")).replace("/","");
		var authPair = authCache.get(id);
		message.ext = message.ext || {};
		if(authPair){
			message.ext.apiKey = authPair.apiKey;
			message.ext.apiSecret = authPair.apiSecret;
		}
		else {
			message.ext.apiKey = "adminprivateapikey";
			message.ext.apiSecret = "adminprivatesecretkey";
		}
		callback(message)
	}
});

function publishTask(channel, data){
	client.publish('/'+channel, data);
}

function ticktock(){
	publishTask('57a7c0edbd0418f7b299df2e/marco', {data:'mydata',mydate:new Date().toString()});
	publishTask('57a7c0edbd0418f7b299df2f/ping', {'ding':'dong'});
	setTimeout(function(){
		ticktock();
	},5000);
}
ticktock();

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

