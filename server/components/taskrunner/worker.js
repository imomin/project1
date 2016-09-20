var request = require('request');
var webshot = require('webshot');
var events = require('events');
var fs = require('fs');
var later = require('later');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var start;
var db;
var bulk;
var timeoutId = null;
var documentCounter = 0;
// if(process.env.NODE_ENV === 'production') {
// 	var dburl = 'mongodb://localhost/cronbox';
// } else {
	var dburl = 'mongodb://localhost:27017/cronbox-dev';
// }


MongoClient.connect(dburl, function(err, database) {
	db = database;
	bulk = db.collection('tasks').initializeUnorderedBulkOp();
	console.log('Mongodb Connected!');
});

process.on('exit', function(code) {
  db.close();
  console.log('About to exit with code: ${code}');
});

process.on('uncaughtException', function(e){
    process.send(e);
});

process.on('message', function(task) {
	if(!start) {
		start = new Date().getTime();
	}
	// Do work  (in this case just up-case the string
	// if(typeof task === 'string' && task === 'exit') {
	// 	process.exit();
	// }

  	//executeProcess(task);
  	rescheduled(task);

	// if(timeoutId) clearTimeout(timeoutId);
	// timeoutId = setTimeout(function(){
	// 	try{
	// 		if(documentCounter > 0){
	// 		var end = new Date().getTime();
	// 		var time = ((end - start)/1000);
	// 			bulk.execute();
	// 			console.log(process.pid + ' took ' + ((new Date().getTime() - start)/1000) + ' seconds to finish the task.');
	// 			console.log(process.pid + ' Bulk Updated!');
	// 			start = null;
	// 		}
	// 	} catch(e){
	// 		console.log(e);
	// 	}
	// },1000);
});


function executeProcess(task, cb){
	// let parseCron = later.parse.cron(task.cron);
 //    let nextRunDate = later.schedule(parseCron).next();
 //    let now = new Date();
 //    let tickDate = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
 //    let utcDatetime = new Date(nextRunDate.getUTCFullYear(), nextRunDate.getUTCMonth(), nextRunDate.getUTCDate(),  nextRunDate.getUTCHours(), nextRunDate.getUTCMinutes(), nextRunDate.getUTCSeconds());
	// db.collection('tasks').updateOne({_id: new ObjectId(task._id)}, {$set:{'isLocked': false,'lastError':null, 'lastProcessedAt':tickDate, 'runAt':utcDatetime}}, function (err, tsk) {
	//   if(err) {console.log(err);}
	// });
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

	// request(payload, function (error, response, body) {
 //  		console.log(response.statusCode);
	// 	// content: String,
	// 	// type: {type: String, enum: ['error', 'info']},
	// 	// screenshotPath: String,
	// 	// createdAt: {type: Date, default: Date.now },
	// 	// task : {type:Schema.Types.ObjectId, ref: 'Task', required:true}
    	// rescheduled(task);
 //    	cb(task);
 //    });
 //    webshot('http://www.google.com', './server/screenshots/'+ tsk._id +'.png', {shotSize:{width:'window',height:'all'}}, function(err) {
	//   if (err) return console.log(err);
	//   //console.log('OK');
	// });
	
}

function rescheduled(task){
    let parseCron = later.parse.cron(task.cron);
    let nextRunDate = later.schedule(parseCron).next();
    let now = new Date();
    let tickDate = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
    let utcDatetime = new Date(nextRunDate.getUTCFullYear(), nextRunDate.getUTCMonth(), nextRunDate.getUTCDate(),  nextRunDate.getUTCHours(), nextRunDate.getUTCMinutes(), nextRunDate.getUTCSeconds());
	db.collection('tasks').updateOne({_id: new ObjectId(task._id)}, { $set: {'isLocked': false,'lastError':null, 'lastProcessedAt':tickDate, 'runAt':utcDatetime}},{w: 1}, function(err, doc){
		if(err) console.log(err);
	});
	// bulk.find({_id: new ObjectId(task._id)}).updateOne({ $set: {'isLocked': false,'lastError':null, 'lastProcessedAt':tickDate, 'runAt':utcDatetime}});

	// documentCounter++;
 //  	if(documentCounter % 10000 == 0 ){
 //        bulk.execute();
 //        documentCounter = 0;
 //        console.log('Execute batch of 10K records');
 //        //bulk = db.collection.initializeUnorderedBulkOp();
 //    }
}


// module.exports = class Worker extends events.EventEmitter {
// 	constructor(task) {
// 	    super();
// 	    this._taskobj = {
// 					"_id":"57b5ff448b2e8ec3f11f3a70",
// 					"runAt": new Date("2016-08-28T23:22:00-0500"),
// 					"timezone": "America/Chicago",
// 					"taskId": "reminder_email",
// 					"name": "test",
// 					"group": "57ad5d5546576687cfa30d0b",
// 					"data": "{}",
// 					"cron": "* * * * *",
// 					"user": "57a7c0edbd0418f7b299df2f",
// 					"isPaused": false,
// 					"lockedAt": null,
// 					"isLocked": false,
// 					"isActive": true,
// 					"lastfailedAt": null,
// 					"lastProcessedAt": new Date("2016-08-28T23:21:20-0500"),
// 					"startedAt": new Date("2016-08-28T23:19:12-0500"),
// 					"stopAt": null,
// 					"startAt": new Date(1471545156447),
// 					"createdAt": new Date(1471545156447),
// 					"retries": 0,
// 					"isRecurring": true,
// 					"method":'get',
// 					"url":'http://www.imomin.com',
// 					"formname":'form',
// 					"formdata":[{'key':'value','key1':'value1'}],
// 					"headers":[{'User-Agent':'request'}],
// 					"cookie":'key=value&key1=value1',
// 					"__v": 0
// 				};
// 		this._task = task ? task : this._taskobj;


// 	    //this.process();
// 	}
// 	onmessage(ev) {
// 		console.log(ev.data);
// 		postMessage(ev.data);
// 	}
	// process() {
	// 	var self = this;
	//         self.lockTask(self._task);
	//         var payload = {
	//             har: {
	//               url:self._task.url,
	//               timeout: 1500,//milliseconds
	//               method:self._task.method.toUpperCase(),
	//               headers:self._task.headers,
	//               postData:{
	//                 mimeType: 'application/x-www-form-urlencoded',
	//                 params: [
	//                     self._task.formdata
	//                 ]
	//               },
	//             }
	//         }

	//         if(self._task.cookie.length > 0) {
	//             var j = request.jar();
	//             var cookie = request.cookie('key1=value1');
	//             j.setCookie(cookie, self._task.url);
	//             payload.jar = j;
	//         }

	//         request(payload, 
	//             function (error, response, body) {
	//               //console.log(response);
	//               if(response.statusCode == 201){
	//                 /*
	// 					content: String,
	// 					type: {type: String, enum: ['error', 'info']},
	// 					screenshotPath: String,
	// 					createdAt: {type: Date, default: Date.now },
	// 					task : {type:Schema.Types.ObjectId, ref: 'Task', required:true}
	//                 */
	//               } else {
	                
	//               }
	//             });

	//         webshot(self._task.url, './server/screenshots/'+ self._task._id +'.png', {shotSize:{width:'window',height:'all'}}, function(err) {
	// 		  if (err) return console.log(err);
	// 		  console.log('OK');
	// 		});

	//         self.rescheduled(self._task);
	//         return self._task._id;
	//         // console.log("***********//process*************");
	//     //});
	// }
// 	lockTask(){
// 		let now = new Date();
// 		let tickDate = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
// 		return Task.findByIdAndUpdate(this._task._id, { $set: {'isLocked': true, 'startedAt': tickDate}}).exec();
// 	}
// 	rescheduled(){
// 	    let parseCron = later.parse.cron(this._task.cron);
// 	    let nextRunDate = later.schedule(parseCron).next();
// 	    let now = new Date();
// 	    let tickDate = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
// 	    let utcDatetime = new Date(nextRunDate.getUTCFullYear(), nextRunDate.getUTCMonth(), nextRunDate.getUTCDate(),  nextRunDate.getUTCHours(), nextRunDate.getUTCMinutes(), nextRunDate.getUTCSeconds());
// 	    Task.findByIdAndUpdate(this._task._id, { $set: {'isLocked': false,'lastError':null, 'lastProcessedAt':tickDate, 'runAt':utcDatetime}}, function (err, tsk) {
// 	      if(err) self.handleError(err,tsk);
// 	      //self.emitTaskEvent('rescheduled',tsk._id,{'status':'rescheduled'});
// 	    });
// 	  }
// 	}