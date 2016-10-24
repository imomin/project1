'use strict';

var later = require('later')
var Heap = require('heap')
var util         = require('util');
var EventEmitter = require('events').EventEmitter;
var ticker;
var net = require('net'),
    JsonSocket = require('json-socket');

const MAX_TIME_OUT = 0x7FFFFFFF
const DEFAULT_MIN_TICK = 100

later.date.UTC();

// cron expr starts with seconds
function Task(id, userNamespace, eventName, cron, minTick, jsondata, repeate) {
  this.id = id;
  this.namespace = userNamespace
  this.eventName = eventName
  this.cron = repeate ? cron : null
  this.nextTick = repeate ? later.schedule(later.parse.cron(cron, false)).next(1, Date.now() + minTick).getTime() : cron
  this.jsondata = jsondata
  this.repeate = repeate //true or false for one time.
  this.dead = false
  return this;
}

function compTask(t1, t2) {
  if (t1.dead && !t2.dead) return -1;
  if (!t1.dead && t2.dead) return 1;
  return t1.nextTick - t2.nextTick;
}



function CronTicker() {
  let self = this
  let tasks = {}
  let heap = new Heap(compTask)
  let curTimeout
  let minTick = DEFAULT_MIN_TICK
  
  function tick() {
    if (curTimeout) {
      clearTimeout(curTimeout)
      //curTimeout = null
    }
    
    while(!heap.empty()) { // &&  isInitialized
      let t = heap.peek()
      if (t.dead) {
        heap.pop()
        delete tasks[t.id]
        continue
      }

      let sleep = t.nextTick - Date.now()
      if (sleep > MAX_TIME_OUT) sleep = MAX_TIME_OUT
      if (sleep > 0) {
        curTimeout = setTimeout(tick, sleep)
        return
      }

      t = heap.pop()
      if(t.repeate) {//THIS IS FOR ONETIME JOB.
        // set the next event with offset set to minTick
        let newT = new Task(t.id, t.namespace, t.eventName, t.cron, minTick, t.jsondata, t.repeate);
        add(t.id, newT)
      }
      self.emit('task', t);
      //console.log('/'+t.namespace+'/'+ t.eventName +' : '+ JSON.stringify(t.jsondata));
    }
    return;
  }

this.set = function(_id, namespace, eventName, tcron, jsondata) {
    _id = String(_id)
    // console.log(eventName);
    var repeate = (new Date(parseInt(tcron))).getTime() > 0 ? false : true;
    //create new instance of Task.
    var newT = new Task(_id, namespace, eventName, tcron, minTick, jsondata, repeate);

    //check nextTick a.k.a next run date is not not infinite.
    if (!isFinite(newT.nextTick)) throw new Error('finite number only, trying something too far out?')
    if (tasks[_id]) { // check if it is existing key, if so update
      var oldT = tasks[_id]
      // when nextTick is same simply update task's cron
      if (0 === compTask(oldT, newT)) {
        if (newT.cron !== oldT.cron) oldT.cron = newT.cron;
        return;
      }
      // otherwise, kill the current task and add the new one
      kill(_id)
      add(_id, newT)
      tick()
      return;
    }
    // new key, add
    add(_id, newT)
    tick()
    return;
}

  function kill(_id) {
    if (!tasks[_id]) return;
    tasks[_id].dead = true;
    heap.updateItem(tasks[_id]);
    delete tasks[_id];
    return;
  }

  function add(_id, task) {
    tasks[_id] = task
    heap.push(task);
    return;
  }

  this.del = function(_id) {
    kill(String(_id));
    tick()
    return;
  }

  this.reset = function(removeListener) {
    tasks = {}
    heap = new Heap(compTask)
    if (curTimeout) {
      clearTimeout(curTimeout)
      curTimeout = null
    }
    if (removeListener) {
      this.removeAllListeners()
    }
    return;
  }
}

util.inherits(CronTicker, EventEmitter);
ticker =  new CronTicker();

var incomingPort = 9838;
var server = net.createServer();
server.listen(incomingPort);
server.on('connection', function(sock) {
    let socket = new JsonSocket(sock);
    setTimeout(function(){
      console.log('socket initialized');
      socket.on('message', function(message) {
        if (message.command === 'set') {
            ticker.set(message.data.id, message.data.namespace, message.data.eventName, message.data.tcron, message.data.jsondata);
            //socket.sendMessage({'response':message.data.id});
        } else if (message.command === 'remove' || message.command == 'pause') {
            ticker.del({'response':message.data.id});
            socket.sendMessage({'response':message.data.id});
        } else if (message.command === 'clearAll') {
            ticker.reset();
            socket.sendMessage({'response':'cleared all!'});
        } else if (message.command === 'terminate') {
          process.exit(-1);
        }
    });
    },10);
    ticker.on('task', function(t){
      if(outgoingServerConnected)
        outgoingSocket.sendMessage(t);
    });
});

var outgoingPort = 9839;
var outgoingSocket = new JsonSocket(new net.Socket());
var outgoingServerConnected = false;
outgoingSocket.on('connect', function() {
  outgoingServerConnected = true;
  outgoingSocket.on('message', function(message) {
    console.log(message);
  });
});
// while(!outgoingServerConnected) {
//   outgoingSocket.connect(outgoingPort, '127.0.0.1');
// }


module.exports = ticker;

/*
SUDO

var cronbox = new Cronbox({consumerKey : 'xyz'});

//usage 1
cronbox.schedule('dosomething','* * * * *', {'data':'stuff'});
cronbox.on('dosomething', function(data){
  
})
cronbox.on('dosomething').then(function(data){
  
});
cronbox.list();
cronbox.remove(_id);
cronbox.pause(_id);
cronbox.resume(_id);
//usage 2
cronbox.schedule('* * * * *', {'data':'stuff'}, function(data){
  
});
//usage 3
cronbox.schedule('* * * * *', {'data':'stuff'}).then(function(data){
  
});



*/