
const cp = require('child_process');
var zmq = require('zmq'),
	port = 'tcp://127.0.0.1:12345';

var socket = zmq.socket('push');
    socket.identity = 'client' + process.pid;
	socket.connect(port);
	console.log('client connected!');

var MongoClient = require('mongodb').MongoClient,
	ObjectId = require('mongodb').ObjectID;

// setInterval(function() {
//     var value = Math.floor(Math.random()*100);
//     console.log(socket.identity + ': pushing ' + value);
//     socket.send(value);
// }, 5000);


var startTime = new Date()
var i = 0;
MongoClient.connect('mongodb://localhost:27017/cronbox-dev', function(err, db) {
  	if(err) console.log(err);
	  let cursor = db.collection('tasks').find({name:/task/});//<<<<<<<<<<<<<<<<<<<<<<<<< change this.
	  cursor.on("data", function(task) {
	  if (task){
	  	i +=1;
	    var data = JSON.stringify(task);
			console.log(socket.identity + ': pushing ' + i);
			socket.send(data);
	  }
	});
	// When the stream is done
	cursor.on("end", function() {
	  isInitialized = true;
	  db.close();
	  console.log((new Date() - startTime)/1000);
	});

});


    
// var childProcess = cp.fork('./server/components/taskrunner/workermain');
// childProcess.send('start');
// childProcess.on('error',function(err){
// 	console.log('Child Process ' + err);
// });

// import taskrunner from './components/taskrunner/';
// var task = new taskrunner();
// task.start();


// var Cronbox = require('../../messaging/client');
// var cronbox = new Cronbox("009e0bccee06bfc7c8e0472b0898d03c","blahblah==");
// cronbox.set('marco', '* * * * *', {'data':'mydata'});
// cronbox.on('marco', function(data){
//   console.log('*********** data ***********', new Date().toString());
//   console.log(data);
//   console.log('*********** data ***********', new Date().toString());
// });


// var cronbox = new Cronbox("6ee6dc86dc990324f52e40cbc62a16ca","foobar==");

// try {
//   for (var i = 0; i < 500000; i++) {
//     cronbox.set('task'+i, '* * * * *', {'index':i});
//     cronbox.on('task'+i, function(data) {
//       console.log(JSON.stringify(data) + ' ' + new Date());
//     });
//   };
// } catch(exx) {
//   console.log(exx)
// }

