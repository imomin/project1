var util = require('util');
var EventEmitter = require('events').EventEmitter;
var CronEvent = require('faye');

//https://faye.jcoglan.com/security/push.html

function CronBox(apiKey, apiSecret) {
	let self = this;
	this.apiKey = apiKey;
	this.apiSecret = apiSecret;
	this.client;
	this.cronbox = new CronEvent.Client('http://localhost:8000/cronbox');
	this.pendingQueue = [];
	this.attachedData = {};
	if (!this.apiKey) {
    	throw new Error('No apiKey found');
	}
	if (!this.apiSecret) {
    	throw new Error('No apiSecret found');
	}
	this.cronbox.addExtension({
		incoming: function(message, callback) {
			// console.log('*************INCOMING***************');
			// console.log(message);
			// console.log('*************INCOMING***************');
			// if(message.channel === '/meta/subscribe') {
			// 	if(!self.client) self.client = message.subscription.substr(message.subscription.indexOf("/"),message.subscription.lastIndexOf("/"));
			// 	console.log(self.pendingQueue);
			// 	while(self.pendingQueue.length === 0){
			// 		var item = self.pendingQueue.shift();
			// 		self.set(item.eventName, item.dtorcron, item.data);
			// 	}
			// }
			if (!message.channel.match(/^\/meta\//) && message.data !== 'undefined') {
				self.emit(message.channel.substr(message.channel.lastIndexOf("/")+1,message.channel.length),message.data);
			}
			callback(message);
		},
		outgoing: function(message, callback) {
			// { channel: '/meta/subscribe',
			//   clientId: 'mhgl0p4hhavqn8hnn7p8b50fp29bp6y',
			//   subscription: '/marco',
			//   id: '3',
			//   ext: 
			//    { apiKey: '009e0bccee06bfc7c8e0472b0898d03c',
			//      apiSecret: 'blahblah==' } 
			// }
			message.ext = message.ext || {};
			message.ext.apiKey = self.apiKey;
			message.ext.apiSecret = self.apiSecret;
			try	{
				if(message.subscription){
					var eventName = message.subscription.replace("/","");
					// console.log('subscription ' + eventName);
					// console.log('attachedData ' + self.attachedData[eventName]);
					message.ext.data = self.attachedData[eventName];
					delete self.attachedData[eventName];
				}
			}
			catch (err) {
				console.log(err);
			}
			
			// console.log('*************OUTGOING***************');
			// console.log(message);
			// console.log('*************OUTGOING***************');
			callback(message);
		}
	});

	// console.log("************auth*************");
	// this.cronbox.subscribe('/ping', function(message) {

	// });

	this.set = function(eventName, dtorcron, data) {
		if (!eventName && !eventName.match(/^[A-Za-z][A-Za-z0-9]*$/)) {
	    	throw new Error('Enter a valid event name.');
		}
		if (!dtorcron) {
	    	throw new Error('Enter a valid cron syntax or a date.');
		}
		data = data || {};
		this.attachedData[eventName] = {'dtorcron':dtorcron,'data':data};
		// var channel = this.client ? this.client + '/'+eventName : '/'+eventName;
		this.cronbox.subscribe('/'+eventName, function(message) {
			console.log('You should not see this.');
		}).then(function() {
				console.log('Connected!');
			}, function(error) {
				console.log('There was a problem: ' + error.message);
			});

		// console.log("************marco*************");
		// console.log('******************========> '+ this.client);
		// if(this.client){
		// 	this.cronbox.subscribe(client + '/'+eventName, function(message) {
		// 		this.events[eventName] = data;
		// 		console.log('Got a message');
		// 		self.emit(eventName,data);
		// 	}).then(function(obj){console.log(obj)}, function(err){throw err;});
		// } else {
		// 	this.pendingQueue.push({'eventName':eventName, 'dtorcron':dtorcron, 'data':data});
		// }
	}
	this.get = function(eventName){
		//return {err, job}
	}
	this.list = function() {
		//return [];
	};
	this.remove = function(eventName) {
		this.cronbox.unsubscribe('/'+eventName);
		//return {err};
	};
	this.pause = function(eventName) {
		this.cronbox.unsubscribe('/'+eventName);
		//return {err};
	};
	this.resume = function(eventName) {

		//return {err};
	};
	// setTimeout(function(){
	// 	self.remove('marco');
	// },15000);
}
util.inherits(CronBox, EventEmitter)

module.exports = CronBox
