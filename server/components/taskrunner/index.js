'use strict';
const later = require('later');
const events = require('events');
const request = require('request');
const cp = require('child_process');
const async = require('async');

//const errors = require('./errors');
import Task from '../../api/v1/task/task.model';
var threadCount = 1;
var threads = [];
for (var i = 0; i < threadCount; i++) {
    threads[i] = cp.fork(__dirname +'/worker');
};

module.exports = class Runner extends events.EventEmitter {
    constructor() {
        super();
        this._running = true;
        this._intervalId = null;
        this._counter = 0;
        this._startTime = null;
        this._roundRobbin = 0;
        this._loopInterval = 60;
        this.onMessage = function(message) {
            //console.log(this.pid+': '+JSON.stringify(message));
        },
        this.onError = function(e) {
            console.log(this.pid+' error :'+e);
        },
        this.onDisconnect = function(e) {
            console.log(this.pid+':'+'killing...');
            this.kill();
            delete this._threads[this.pid];
        };

        for (var i = 0; i < threadCount; i++) {
            threads[i].on('message',this.onMessage);
            threads[i].on('error',this.onError);
            threads[i].on('disconnect',this.onDisconnect);
        };
    }

  start() {
    var thisScope = this;
    if (!thisScope._running) return;
    if(!thisScope._startTime) 
    {
        thisScope._startTime = new Date();
        //this._startTime.setMinutes(this._startTime.getMinutes()+1)
    }
    this.findAllAsync();
    // thisScope.getTask(function(err, data){
    //     console.log(((new Date().getTime() - thisScope._startTime)/1000));
    //     thisScope._startTime = null;
    //     //thisScope.start();
    //     process.nextTick(function() {
    //       thisScope.start();
    //     });
    // })
  }
  
  stop() {
    this._running = false;
    return this;
  }


  // loop(){
  //   //console.log('tick tock');
  //   //var self = this;
  //   this.getTask(function (err, task) {
  //       this._counter = this._counter +1;
  //       console.log(this._counter);
  //       if(this._startTime <= new Date().getTime())
  //           return;
  //       if(err) this.handleError(err,task);
  //       if(!task) {
  //           setTimeout(this.loop, 1000);
  //           return;
  //       }
  //       this.emitTaskEvent('started',task._id,{'status':'started'});
  //       this.rescheduled(task);
  //       this.process(task);
  //       process.nextTick(function() {
  //           this.loop();//58463//61297
  //       });
  //     return;
  //   });
    
  //   return;
  // }


    getTask(fn) {
        let now = new Date();
        let tickDate = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
        Task.findOneAndUpdate(
            //{$and:[
            {'isActive': true, 'isLocked':false, 'isPaused':false, 'runAt': {$lt:tickDate}},
            //{$or: [{'stopAt':{$exists:true}}, {'stopAt':{$gte: new Date(tickDate)}}]}
            //]},
            {
            'isLocked': true,
            'startedAt': tickDate
            },
            {new:true}
        ).lean().exec(fn);
    }

    findCursor(){
        var thisScope = this;
        let now = new Date();
        let tickDate = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
        var opts = {'runAt':{$lte:tickDate}};
        var stream = Task.find(opts).tailable(true, {awaitdata:true, numberOfRetries:-1}).lean().cursor();

        stream.on('data', function(task){
            console.log(task);
            let parseCron = later.parse.cron(task.cron);
            let nextRunDate = later.schedule(parseCron).next();
            let now = new Date();
            let tickDate = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
            let utcDatetime = new Date(nextRunDate.getUTCFullYear(), nextRunDate.getUTCMonth(), nextRunDate.getUTCDate(),  nextRunDate.getUTCHours(), nextRunDate.getUTCMinutes(), nextRunDate.getUTCSeconds());
            Task.findByIdAndUpdate(task._id, { $set: {'isLocked': false,'lastError':null, 'lastProcessedAt':tickDate, 'runAt':utcDatetime}}, function (err, tsk) {
                if(err) self.handleError(err,tsk);
            //self.emitTaskEvent('rescheduled',tsk._id,{'status':'rescheduled'});
            });
        });
        stream.on('end', function(val) {
            console.log(val);
            //thisScope.findCursor();
        });
        stream.on('error', function(val) {
            console.error(val);
            stream.destroy();
            thisScope.findCursor();
        });
    }

    findAll2(){
        var thisScope = this;
        var start = new Date().getTime();
        let now = new Date();
        let tickDate = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
        const stream = Task.find({'isActive': true, 'isLocked':false, 'isPaused':false, 'runAt': {$lte:tickDate}}).lean().limit(5000).cursor();
        // Print every document that matches the query, one at a time
        stream.on('data', task => {
            thisScope._roundRobbin += 1;
            let now = new Date();
            let tickDate = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
            Task.findByIdAndUpdate(task._id, { $set: {'isLocked': true, 'startedAt': tickDate}},{w:1}).lean().exec().then(function(data){
                console.log(new Date() + ' ' + thisScope._roundRobbin);
            });
            // thisScope.lockTask(task._id).then(function(data){
            //     console.log(new Date() + ' ' + thisScope._roundRobbin);
            // });
            // threads[thisScope._roundRobbin % threadCount].send(task);
            // thisScope._roundRobbin += 1;
        });
        stream.on('end', () => {
            console.log('Done!');
            var end = new Date().getTime();
            var time = ((end - start)/1000);
            console.log(time.toString() + '!');
            //child.send('exit');
            for (var i = 0; i < threadCount; i++) {
               // threads[i].send('exit');
            };
      //thisScope.start();
        });
    }

    findAllAsync(){
        var thisScope = this;
        var start = new Date().getTime();
        let now = new Date();
        let tickDate = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
        
        Task.update({'isActive': true, 'isLocked':false, 'isPaused':false, 'runAt': {$lte:tickDate}}, {$set: {'isLocked': true, 'startedAt': tickDate}}, {multi:true}, function (err, res) {
            if(err) self.handleError(err,null);
                const stream = Task.find({'isActive': true, 'isLocked':true, 'isPaused':false, 'startedAt': {$eq:tickDate}}).lean().cursor();
                // Print every document that matches the query, one at a time
                
                var q = async.queue(function (task, callback) {
                    let parseCron = later.parse.cron(task.cron);
                    let nextRunDate = later.schedule(parseCron).next();
                    let utcDatetime = new Date(nextRunDate.getUTCFullYear(), nextRunDate.getUTCMonth(), nextRunDate.getUTCDate(),  nextRunDate.getUTCHours(), nextRunDate.getUTCMinutes(), nextRunDate.getUTCSeconds());
                    Task.findByIdAndUpdate(task._id, {$set:{'isLocked': false,'lastError':null,'lastProcessedAt':tickDate, 'runAt':utcDatetime}},{w:1}).lean().exec().then(function(data){
                        callback;
                    });
                }, Infinity);

                stream.on('data', task => {
                   if (task){
                        q.push(task, function (err) {
                            if(err)
                                console.log('Error processing task' + err);
                        });
                    }
                });
                stream.on('end', () => {
                    console.log('Done!');
                    var end = new Date().getTime();
                    var time = ((end - start)/1000);
                    console.log(time.toString() + '!');
                    //child.send('exit');
                    // for (var i = 0; i < threadCount; i++) {
                    //    // threads[i].send('exit');
                    // };
                    //thisScope.start();
                });
        });
    }

    findAll(){
        var thisScope = this;
        var start = new Date().getTime();
        let now = new Date();
        let tickDate = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
        
        Task.update({'isActive': true, 'isLocked':false, 'isPaused':false, 'runAt': {$lte:tickDate}}, {$set: {'isLocked': true, 'startedAt': tickDate}}, {multi:true}, function (err, res) {
            if(err) self.handleError(err,null);
                console.log(res);
                // const stream = Task.find({'isActive': true, 'isLocked':true, 'isPaused':false, 'startedAt': {$eq:tickDate}}).lean().cursor();
                // // Print every document that matches the query, one at a time
                // stream.on('data', task => {
                //     // threads[thisScope._roundRobbin % threadCount].send(task);
                //     // thisScope._roundRobbin += 1;
                // });
                // stream.on('end', () => {
                //     console.log('Done!');
                //     var end = new Date().getTime();
                //     var time = ((end - start)/1000);
                //     console.log(time.toString() + '!');
                //     //child.send('exit');
                //     for (var i = 0; i < threadCount; i++) {
                //        // threads[i].send('exit');
                //     };
                    thisScope.start();
                // });
        });
    }

    handleError(err, task) {
        console.log('err >>> ' + err);
        this.emit('error', err, task);
        return;
    }

    emitTaskEvent(eventName, taskId, message) {
        console.log(taskId+':'+eventName);
        this.emit(taskId+':'+eventName, message);
    }

  // process(task) {
  //   //var self = this;
  //   //return Promise.resolve(task).then(function(){
  //       // console.log("***********process*************");
  //       //console.log(task);
  //       // self.lockTask(task).then(function (task) {
  //       //     //self.emitTaskEvent('locked',task._id,{'status':'locked'});
  //       //     //self.emitTaskEvent('inprogress',task._id,{'status':'inprogress'});
  //       //     //self.emitTaskEvent('completed',task._id,{'status':'completed'});
  //       // }, function(err){
  //       //     handleError(err, task);
  //       // });
  //       // self.rescheduled(task);
  //       return task._id;
  //       // console.log("***********//process*************");
  //   //});
  // }

  lockTask(Id){
    let now = new Date();
    let tickDate = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
    return Task.findByIdAndUpdate(Id, { $set: {'isLocked': true, 'startedAt': tickDate}}).exec();
  }


    // handleError(err, task){
    //     console.log('err >>> ' + err);
    //     this.emit('error', err, task);
    //     return this;
    // }



}
