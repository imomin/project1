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
	this.setMaxListeners(0);
	if (!this.apiKey) {
    	throw new Error('No apiKey found');
	}
	if (!this.apiSecret) {
    	throw new Error('No apiSecret found');
	}
	this.cronbox.addExtension({
		incoming: function(message, callback) {
			if (!message.channel.match(/^\/meta\//) && message.data !== 'undefined') {
				self.emit(message.channel.substr(message.channel.lastIndexOf("/")+1,message.channel.length),message.data);
			}
			callback(message);
		},
		outgoing: function(message, callback) {
			message.ext = message.ext || {};
			message.ext.apiKey = self.apiKey;
			message.ext.apiSecret = self.apiSecret;
			try	{
				if(message.subscription) {
					var eventName = message.subscription.replace("/","");
					message.ext.data = self.attachedData[eventName];
					delete self.attachedData[eventName];
				}
			}
			catch (err) {
				console.log(err);
			}
			callback(message);
		}
	});

	this.set = function(eventName, dtorcron, data) {
		if (!eventName && !eventName.match(/^[A-Za-z][A-Za-z0-9]*$/)) {
	    	throw new Error('Enter a valid event name.');
		}
		if (!dtorcron) {
	    	throw new Error('Enter a valid cron syntax or a date.');
		}
		data = data || {};
		this.attachedData[eventName] = {'dtorcron':dtorcron,'data':data};
		this.cronbox.subscribe('/'+eventName, function(message) {
			console.log('You should not see this.');
		}).then(function() {
				console.log('Connected!');
			}, function(error) {
				console.log('There was a problem: ' + error.message);
			});
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
}
util.inherits(CronBox, EventEmitter)

module.exports = CronBox
