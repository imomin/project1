var request = require('request');
var events = require('events');
var later = require('later');
var async = require('async');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var db;
var bulk;
var dburl = 'mongodb://localhost:27017/cronbox-dev';
var inProgress = false;
var cp = require('child_process');
var worker = cp.fork(__dirname +'/worker');
var _startDate;

process.on('exit', function(code) {
  console.log('About to exit with code: ${code}');
});

process.on('uncaughtException', function(e){
    process.send(e);
});

process.on('message', function(message) {
    console.log(message);
    MongoClient.connect(dburl, function(err, database) {
		db = database;
		//bulk = db.collection('tasks').initializeUnorderedBulkOp();
		console.log('Mongodb Connected!');
	    try{
	    	start();
	    } catch (err) {
	    	console.log(err);
	    }
	});
});

function start(){
	var intervalId = setInterval(function(){poll();}, (30*100));
}

function poll(){
	if(inProgress) return;
	_startDate = new Date();
	let thisScope = this;
    let now = new Date();
    let tickDate = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
	let query = {'isActive': true, 'isLocked':false, 'isPaused':false, 'runAt': {$lte:tickDate}};
	var q2 = async.queue(function(task, callback){
		let parseCron = later.parse.cron(task.cron);
	    let nextRunDate = later.schedule(parseCron).next();
	    let utcDatetime = new Date(nextRunDate.getUTCFullYear(), nextRunDate.getUTCMonth(), nextRunDate.getUTCDate(),  nextRunDate.getUTCHours(), nextRunDate.getUTCMinutes(), nextRunDate.getUTCSeconds());
	    
		db.collection('tasks').update({
			_id: new ObjectId(task._id)
		}, {
			$set: {'isLocked': false,'lastError':null, 'lastProcessedAt':tickDate, 'runAt':utcDatetime}
		}, {
			w: 1
		}, callback);
	}, Infinity);
	var q = async.queue(function (task, callback) {
 		db.collection('tasks').update({
			_id: new ObjectId(task._id)
		}, {
			$set: {'isLocked': true, 'startedAt': tickDate}
		}, {
			w: 1
		}, callback);
		q2.push(task, function (err) {
			if(err)
				console.log('Error processing task' + err);
		});
		//worker.send(task);
		 // async.series([
		 // 	// function(callback) {//LOCK THE TASK 

		 // 	// },
		 // 	function(callback) {//MAKE THE WEB REQUEST
			// 	var payload = {
			// 		    har: {
			// 				url:'http://www.example.com',
			// 				timeout: 1500,//milliseconds
			// 				method:'GET',
			// 				headers:{'content-type':'application/x-www-form-urlencoded'},
			// 				postData:{
			// 					mimeType: 'application/x-www-form-urlencoded',
			// 					params: [
			// 					   {}
			// 					]
			// 				}
			// 			}
			//     	}
			//     if(task.cookie && task.cookie.length > 0) {
			//         var j = request.jar();
			//         var cookie = request.cookie('key1=value1');
			//         j.setCookie(cookie, self._task.url);
			//         payload.jar = j;
			//     }
			// 	request(payload, function (error, response, body) {
			// 		//console.log(response.statusCode);
			// 		// content: String,
			// 		// type: {type: String, enum: ['error', 'info']},
			// 		// screenshotPath: String,
			// 		// createdAt: {type: Date, default: Date.now },
			// 		// task : {type:Schema.Types.ObjectId, ref: 'Task', required:true}
			// 		callback();
			// 	});
		 // 	}
		 // 	,function(callback) {//UNLOCK THE TASK
			// 	let parseCron = later.parse.cron(task.cron);
			//     let nextRunDate = later.schedule(parseCron).next();
			//     let utcDatetime = new Date(nextRunDate.getUTCFullYear(), nextRunDate.getUTCMonth(), nextRunDate.getUTCDate(),  nextRunDate.getUTCHours(), nextRunDate.getUTCMinutes(), nextRunDate.getUTCSeconds());

			// 	db.collection('tasks').update({
			// 		_id: new ObjectId(task._id)
			// 	}, {
			// 		$set: {'isLocked': false,'lastError':null, 'lastProcessedAt':tickDate, 'runAt':utcDatetime}
			// 	}, {
			// 		w: 1
			// 	}, callback);
		 // 	}
		 // 	],
		 // 	function(err) { //This function gets called after the two tasks have called their "task callbacks"
		 //        if (err) return next(err);
		        
		 //    });
		//Lock the task while is been processed
		// db.collection('tasks').update({
		// 	_id: new ObjectId(task._id)
		// }, {
		// 	$set: {'isLocked': true, 'startedAt': tickDate}
		// }, {
		// 	w: 1
		// }, callback);
		//processed task and unlock it.
		//processTask(task, callback);

	}, Infinity);//Infinity

	console.log('Started the query.' + new Date());
	let cursor = db.collection('tasks').find(query);
	// cursor.each(function(err, task) {
	// 	if (err) throw err;
	// 	if (task)
	// 		q.push(task, function (err) {
	// 			if(err)
	// 		    	console.log('Error processing task' + err);
	// 		    //console.log('finished processing tasks.');
	// 		}); // dispatching doc to async.queue
	// });

	cursor.on("data", function(task) {
		if (task){
			inProgress = true;
			q.push(task, function (err) {
				if(err)
					console.log('Error processing task' + err);
			});
		}
	});

	// When the stream is done
	cursor.on("end", function() {

	});

	q.drain = function() {
		// if (cursor.isClosed()) {
  //           var end = new Date().getTime();
  //           var time = ((end - _startDate)/1000);
		// 	console.log('all items have been processed!!!' + time.toString());
		// 	inProgress = false;
		// }
	}
	q2.drain = function() {
		if (cursor.isClosed()) {
            var end = new Date().getTime();
            var time = ((end - _startDate)/1000);
			console.log('all items have been processed!!!' + time.toString());
			inProgress = false;
		}
	}
}

function processTask(task, callback){
	db.collection('tasks').update({
		_id: new ObjectId(task._id)
	}, {
		$set: {'isLocked': true, 'startedAt': tickDate}
	}, {
		w: 1
	});


	var payload = {
		    har: {
				url:'http://www.example.com',
				timeout: 1500,//milliseconds
				method:'GET',
				headers:{'content-type':'application/x-www-form-urlencoded'},
				postData:{
					mimeType: 'application/x-www-form-urlencoded',
					params: [
					   {}
					]
				}
			}
    	}

	    if(task.cookie && task.cookie.length > 0) {
	        var j = request.jar();
	        var cookie = request.cookie('key1=value1');
	        j.setCookie(cookie, self._task.url);
	        payload.jar = j;
	    }


		//request(payload, function (error, response, body) {
			//console.log(response.statusCode);
			// content: String,
			// type: {type: String, enum: ['error', 'info']},
			// screenshotPath: String,
			// createdAt: {type: Date, default: Date.now },
			// task : {type:Schema.Types.ObjectId, ref: 'Task', required:true}
		//});

	let parseCron = later.parse.cron(task.cron);
    let nextRunDate = later.schedule(parseCron).next();
    let utcDatetime = new Date(nextRunDate.getUTCFullYear(), nextRunDate.getUTCMonth(), nextRunDate.getUTCDate(),  nextRunDate.getUTCHours(), nextRunDate.getUTCMinutes(), nextRunDate.getUTCSeconds());

	db.collection('tasks').update({
		_id: new ObjectId(task._id)
	}, {
		$set: {'isLocked': false,'lastError':null, 'lastProcessedAt':tickDate, 'runAt':utcDatetime}
	}, {
		w: 1
	}, callback);
}