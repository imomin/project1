var cp = require('child_process');
var child = cp.fork(__dirname +'/worker');

var json = {
			"_id":"57b5ff448b2e8ec3f11f3a70",
			"runAt": new Date("2016-08-28T23:22:00-0500"),
			"timezone": "America/Chicago",
			"taskId": "reminder_email",
			"name": "test",
			"group": "57ad5d5546576687cfa30d0b",
			"data": "{}",
			"cron": "* * * * *",
			"user": "57a7c0edbd0418f7b299df2f",
			"isPaused": false,
			"lockedAt": null,
			"isLocked": false,
			"isActive": true,
			"lastfailedAt": null,
			"lastProcessedAt": new Date("2016-08-28T23:21:20-0500"),
			"startedAt": new Date("2016-08-28T23:19:12-0500"),
			"stopAt": null,
			"startAt": new Date(1471545156447),
			"createdAt": new Date(1471545156447),
			"retries": 0,
			"isRecurring": true,
			"method":'get',
			"url":'http://www.imomin.com',
			"formname":'form',
			"formdata":[{'key':'value','key1':'value1'}],
			"headers":[{'User-Agent':'request'}],
			"cookie":'key=value&key1=value1',
			"__v": 0
		}

// Send child process some work
child.send(json);
child.on('message', function(m) {
  console.log('received: ' + m);
});

