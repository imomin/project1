var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var CronTicker = require('./CronEventQueue');
var ct = new CronTicker();
var db;
var isInitialized = true;

function init(){
     if(!isInitialized) {
        if(db) db.close();
          let dburl = 'mongodb://localhost:27017/cronbox-dev';
          MongoClient.connect(dburl, function(err, database) {
            if(err) console.log(err);
            db = database;
            let query = {'isActive': true, 'isLocked':false, 'isPaused':false};
            let cursor = db.collection('tasks').find(query);
            isInitialized = true;
              cursor.on("data", function(task) {
                if (task){
                  ct.set(task._id, task.taskId, task.cron, task.data);
                  ct.on(task._id+':'+task.taskId, function(id, data) {
                    console.log('Task ' + id +' with data '+ JSON.stringify(data) + '' + new Date());
                  });
                }
              });
              // When the stream is done
              cursor.on("end", function() {
                console.log("done populating");
              });
          });
      }
  }
function test(){
    try {
      for (var i = 0; i <= 1000000; i++) {
        ct.set(i, 'Task #'+i, '* * * * *', {'data':'foo'+i});
        ct.on(i+':Task #'+i, function(id, data) {
          //console.log('Task ' + id +' with data '+ JSON.stringify(data) + ' ' + new Date());
          db.collection('tasks').findOneAndUpdate()
        });
      };
    } catch(exx) {
      console.log(exx)
    }
}
