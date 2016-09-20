var http = require('http'),
	fayeRedis = require('faye-redis'),
	deflate = require('permessage-deflate'),
    faye = require('faye'),
    EventEmitter = require('events').EventEmitter;

var bayeux = new faye.NodeAdapter({mount: '/cronbox', timeout: 45,
		engine:{
	    type:fayeRedis,
	    host:'localhost',
	    port:6379
	}});

	bayeux.addWebsocketExtension(deflate);

	var authorized = function(message) {
	  var apiKey = message.ext && message.ext.apiKey;
	  var apiSecret = message.ext && message.ext.apiSecret;
	  if(apiKey === "009e0bccee06bfc7c8e0472b0898d03c" && apiSecret === "blahblah=="){
	  	console.log(message.channel);
		if(message.channel === '/meta/subscribe' || message.channel === '/meta/unsubscribe'){
			message.subscription = '/1234567890' + message.subscription;
		}
		delete message.ext.apiKey;
		delete message.ext.apiSecret;
	  	return true;
	  }
	  	return false;
	};

	bayeux.addExtension({
		incoming: function(message, callback) {
			//if (!message.channel.match(/^\/meta\//)) {
				if (!authorized(message)){
				  message.error = '403::Authentication required';
				}
			//}
			console.log('*************INCOMING***************');
			console.log(message);
			console.log('*************INCOMING***************');
			callback(message);
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




// Handle non-Bayeux requests
var server = http.createServer(function(request, response) {
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.end('Hello, non-Bayeux request');
});

var client = bayeux.getClient();

client.addExtension({
	outgoing: function(message, callback) {
		console.log('>>>> '+ JSON.stringify(message));
		message.ext = message.ext || {};
		message.ext.apiKey = "009e0bccee06bfc7c8e0472b0898d03c";
		message.ext.apiSecret = "blahblah==";
		callback(message);
	}
});

function publishTask(channel, data){
	client.publish('/'+channel, data);
}

function ticktock(){
		publishTask('1234567890/marco', {data:'mydata',mydate:new Date().toString()});
		setTimeout(function(){
			ticktock();
		},5000);
}
ticktock();

process.on('SIGTERM', function () {
  db.close();
  console.log('About to exit with code: ${code}');
});

bayeux.attach(server);
server.listen(8000);

