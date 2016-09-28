var later = require('later')
var Heap = require('heap')

var faye = require('faye');
var client = new faye.Client('http://localhost:8000/cronbox');
var deflate = require('permessage-deflate');

const MAX_TIME_OUT = 0x7FFFFFFF
const DEFAULT_MIN_TICK = 1000

later.date.UTC();

client.addWebsocketExtension(deflate);
client.addExtension({
  outgoing: function(message, callback) {
      message.ext = message.ext || {};
      message.ext.apiKey = "adminprivateapikey";
      message.ext.apiSecret = "adminprivatesecretkey";
      callback(message)
  }
});

// cron expr starts with seconds
function Task(userNamespace, eventName, cron, minTick, jsondata, repeate) {
  this.id = userNamespace
  this.eventName = eventName
  this.cron = repeate ? cron : null
  this.nextTick = repeate ? later.schedule(later.parse.cron(cron, false)).next(1, Date.now() + minTick).getTime() : cron
  this.jsondata = jsondata
  this.repeate = repeate //true or false for one time.
  this.dead = false
  return this;
}


function compTask(t1, t2) {
  if (t1.dead && !t2.dead) return -1
  if (!t1.dead && t2.dead) return 1
  return t1.nextTick - t2.nextTick
}

function CronTicker() {
  let self = this
  let tasks = {}
  let heap = new Heap(compTask)
  let curTimeout
  let minTick = DEFAULT_MIN_TICK
  let isInitialized = true;

  function tick() {
    if (curTimeout) {
      clearTimeout(curTimeout)
      //curTimeout = null
    }
    
    while(!heap.empty()) {
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
        let newT = new Task(t.id, t.eventName, t.cron, minTick, t.jsondata, t.repeate);
        add(t.id, newT)
      }
      //self.emit('task', t.id, t.nextTick, newT.nextTick, newT.jsondata );
      client.publish('/'+t.id+'/'+ t.eventName, t.jsondata);
    }
    return
  }

this.set = function(_id, eventName, tcron, jsondata) {
    _id = String(_id)

    var repeate = (new Date(parseInt(tcron))).getTime() > 0 ? false : true;
    //create new instance of Task.
    var newT = new Task(_id, eventName, tcron, minTick, jsondata, repeate);

    //check nextTick a.k.a next run date is not not infinite.
    if (!isFinite(newT.nextTick)) throw new Error('finite number only, trying something too far out?')
    if (tasks[_id]) { // check if it is existing key, if so update
      var oldT = tasks[_id]
      // when nextTick is same simply update task's cron
      if (0 === compTask(oldT, newT)) {
        if (newT.cron !== oldT.cron) oldT.cron = newT.cron;
        return
      }
      // otherwise, kill the current task and add the new one
      kill(_id)
      add(_id, newT)
      tick()
      return
    }
    // new key, add
    add(_id, newT)
    tick()
}

  function kill(_id) {
    if (!tasks[_id]) return
    tasks[_id].dead = true
    heap.updateItem(tasks[_id])
    delete tasks[_id]
  }

  function add(_id, task) {
    tasks[_id] = task
    heap.push(task)
  }

  this.del = function(_id) {
    kill(String(_id));
    tick()
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
  }
}

module.exports = CronTicker
