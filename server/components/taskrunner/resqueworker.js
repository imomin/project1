/////////////////////////
// REQUIRE THE PACKAGE //
/////////////////////////
var util         = require('util');
// var EventEmitter = require('events').EventEmitter;
var NR = require("node-resque");



///////////////////////////
// SET UP THE CONNECTION //
///////////////////////////

var connectionDetails = {
  pkg:       'ioredis',
  host:      '127.0.0.1',
  password:  null,
  port:      6379,
  database:  0,
  namespace: 'resque',
  looping: true
};

//////////////////////////////
// DEFINE YOUR WORKER TASKS //
//////////////////////////////

var jobs = {
	email: {
	    perform: function(data,callback){
	      console.log('************Email****************');
	      console.log(data);
	      console.log('****************************');
	      callback(null, true);
	    }
	},
	webRequest: {
	    perform: function(data,callback){
	      // console.log('************webRequest****************');
	      console.log(data.id);
	      // console.log('****************************');
	      callback(null, true);
	    }
	},
	screenshot: {
	    perform: function(data,callback){
	      console.log('*************screenshot***************');
	      console.log(data);
	      console.log('****************************');
	      callback(null, true);
	    }
	}
}

var scheduler = new NR.scheduler({connection: connectionDetails});
scheduler.connect(function(){
  scheduler.start();
});

var multiWorker = new NR.multiWorker({
  connection: connectionDetails,
  queues: ['emailQ','webRequestQ','screenshotQ'],
  minTaskProcessors:   1,
  maxTaskProcessors:   100,
  checkTimeout:        1000,
  maxEventLoopDelay:   10,  
  toDisconnectProcessors: true,
}, jobs);

// normal worker emitters
// multiWorker.on('start',             function(workerId){                      console.log("worker["+workerId+"] started"); })
// multiWorker.on('end',               function(workerId){                      console.log("worker["+workerId+"] ended"); })
// multiWorker.on('cleaning_worker',   function(workerId, worker, pid){         console.log("cleaning old worker " + worker); })
// multiWorker.on('poll',              function(workerId, queue){               console.log("worker["+workerId+"] polling " + queue); })
// multiWorker.on('job',               function(workerId, queue, job){          console.log("worker["+workerId+"] working job " + queue + " " + JSON.stringify(job)); })
// multiWorker.on('reEnqueue',         function(workerId, queue, job, plugin){  console.log("worker["+workerId+"] reEnqueue job (" + plugin + ") " + queue + " " + JSON.stringify(job)); })
// multiWorker.on('success',           function(workerId, queue, job, result){  console.log("worker["+workerId+"] job success " + queue + " " + JSON.stringify(job) + " >> " + result); })
// multiWorker.on('failure',           function(workerId, queue, job, failure){ console.log("worker["+workerId+"] job failure " + queue + " " + JSON.stringify(job) + " >> " + failure); })
// multiWorker.on('error',             function(workerId, queue, job, error){   console.log("worker["+workerId+"] error " + queue + " " + JSON.stringify(job) + " >> " + error); })
// multiWorker.on('pause',             function(workerId){                      console.log("worker["+workerId+"] paused"); })

// // multiWorker emitters
multiWorker.on('internalError',     function(error){                         console.log(error); })
// multiWorker.on('multiWorkerAction', function(verb, delay){                   console.log("*** checked for worker status: " + verb + " (event loop delay: " + delay + "ms)"); });

multiWorker.start();


var queue = new NR.queue({connection: connectionDetails}, jobs);
queue.on('error', function(error){ console.log(error); });
queue.connect(function(){
	console.log('queue is live!');
});

// cronQueue.on('task', function(task){
// 	//queue.enqueue('emailQ', "email", task.jsondata);
// });

function addToQueue(timestamp, queueName, taskName, data, callback){
	queue.enqueue('emailQ', "email", {'data':'emaildata1'});
	queue.enqueue('webRequestQ', "webRequest", {'data':'webRequest1'});
	queue.enqueue('screenshotQ', "screenshot", {'data':'screenshot1'});
}


	// var date = new Date();
 //  	date.setSeconds(date.getSeconds()+5);
	// addToQueue(date.getTime(), 'emailQ', "email", {'data':'emaildata2'});
	// addToQueue(date.getTime(), 'webRequestQ', "webRequest", {'data':'webRequest2'});
	// addToQueue(date.getTime(), 'screenshotQ', "screenshot", {'data':'screenshot2'});



// var worker = function(){

// };

// //util.inherits(worker, EventEmitter);

// worker.prototype.addToQueue = function(callback){
//   queue.enqueueAt(timestamp,queueName,taskName,data,callback);
// };
// var	net = require('net');
// var JsonSocket = require('json-socket');
// var port = 9839;
// var server = net.createServer();
// server.listen(port);
// server.on('connection', function(socket) {
//     socket = new JsonSocket(socket);
// 	socket.on('message', function(task) {
// 		queue.enqueue('webRequestQ', "webRequest", task);
// 	});
// });

// var redis = require("redis")
//   , subscriber = redis.createClient();
// subscriber.subscribe("task");
// subscriber.on("message", function(channel, message) {
// 	queue.enqueue('webRequestQ', "webRequest", JSON.parse(message));
// 	//console.log(JSON.parse(message));
// });

var Redis = require('ioredis');
var subscriber = new Redis();
subscriber.subscribe('task', function (err, count) {

});
subscriber.on('message', function (channel, message) {
	queue.enqueue('webRequestQ', "webRequest", JSON.parse(message));
  //console.log('Receive message %s from channel %s', message, channel);
});


// var shutdown = function(){
//   scheduler.end(function(){
//     queue.end(function(){
//     	multiWorker.stop(function(){
// 			console.log('bye.');
// 			process.exit();
//     	});
//     });
//   });
// };
// process.on('SIGTERM', shutdown);
// process.on('SIGINT', shutdown);