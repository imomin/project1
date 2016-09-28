/**
 * Main application file
 */

'use strict';

import express from 'express';
import mongoose from 'mongoose';
mongoose.Promise = require('bluebird');
import config from './config/environment';
import http from 'http';
const cp = require('child_process');


// Connect to MongoDB
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});

// Populate databases with sample data
if (config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
var server = http.createServer(app);
var socketio = require('socket.io')(server, {
  serveClient: config.env !== 'production',
  path: '/socket.io-client'
});
require('./config/socketio').default(socketio);
require('./config/express').default(app);
require('./routes').default(app);


// var childProcess = cp.fork('./server/components/taskrunner/workermain');
// childProcess.send('start');
// childProcess.on('error',function(err){
// 	console.log('Child Process ' + err);
// });
// import taskrunner from './components/taskrunner/';
// var task = new taskrunner();
// task.start();


var Cronbox = require('./components/messaging/client');
var cronbox = new Cronbox("009e0bccee06bfc7c8e0472b0898d03c","blahblah==");
cronbox.set('marco', '* * * * *', {'data':'mydata'});
cronbox.on('marco', function(data){
  console.log('*********** data ***********', new Date().toString());
  console.log(data);
  console.log('*********** data ***********', new Date().toString());
});


var cronbox = new Cronbox("6ee6dc86dc990324f52e40cbc62a16ca","foobar==");
cronbox.set('ping', '* * * * *', {'ding':'dong'});
cronbox.on('ping', function(data){
  console.log('*********** data ***********');
  console.log(data);
  console.log('*********** data ***********');
});

try {
  for (var i = 0; i < 10000; i++) {
    cronbox.set('task'+i, '* * * * *', {'index':i});
    cronbox.on('task'+i, function(data) {
      console.log(JSON.stringify(data) + ' ' + new Date());
    });
  };
} catch(exx) {
  console.log(exx)
}



// Start server
function startServer() {
  app.angularFullstack = server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

setImmediate(startServer);

// Expose app
exports = module.exports = app;
