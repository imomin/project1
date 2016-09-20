var MongoClient = require('mongodb').MongoClient,
	ObjectId = require('mongodb').ObjectID,
	db;

var dburl = 'mongodb://localhost:27017/cronbox-dev';
MongoClient.connect(dburl, function(err, database) {
	db = database;
	console.log('Mongodb Connected!');
});

function close(){
	if(db) db.close();
}

function authenticate(apiKey, apiSecret){
	db.collection('users').findOne({'isActive': true, 'apikey':apiKey, 'secretkey':apiSecret}, {'_id'}, function(err, document) {
	  
	})
}
