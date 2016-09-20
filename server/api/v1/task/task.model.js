'use strict';

import mongoose from 'mongoose';
var Schema = mongoose.Schema;
import cronParser from  'cron-parser';
import _ from 'lodash';
import later from 'later';

/**
 * ALL DATES MUST BE SAVED AS UTC
 */
var TaskSchema = new mongoose.Schema({//
	taskId: {
				type:String,
				required:true
		    },
	name: String,
	data: {
				type:String,
				required:true,
				validate: {
					validator: function(v) {
						try{
						    JSON.parse(v);
						    return true;
						}
						catch(ex){
						    return false;
						}
					},
		          	message: '{VALUE} is not a valid JSON!'
	        	}
		    },
	timezone: String,
	isRecurring: {type: Boolean, default:true, required:true},
	cron: String,
	retries: {type: Number, default:0, required:false},
	createdAt: {type: Date, default:Date.now },
	startAt: {type: Date, default:Date.now, required:true},
	stopAt: {type: Date, default:null},
	runAt: Date,
	startedAt:{type: Date, default:null},
	lastProcessedAt:{type: Date, default:null},
	lastfailedAt:{type: Date, default:null},
	isActive: {type:Boolean, default:true},
	isLocked: {type:Boolean, default:false},
	lockedAt:{type: Date, default:null},
	isPaused: {type:Boolean, default:false},
	group: {type:Schema.Types.ObjectId, ref: 'Group', required:false},
	user: {type:Schema.Types.ObjectId, ref: 'User', required:true}
});

// Validate taskId is unqiue per user.
TaskSchema
  .path('taskId')
  .validate(function(value, respond) {
    return this.constructor.findOne({taskId:value, user:user}).exec()
      .then(task => {
        if(task) {
        	respond(false);
        }
        return respond(true);
      })
      .catch(function(err) {
        throw err;
      });
  }, 'The specified taskId already exists.');

/**
 * Methods
 */
TaskSchema.methods = {
	/**
	* Convert Cron synatx to datetime
	*
	* @param {String} cron syntax
	* @param {String} timezone
	* @return {Date}
	* @api public
	*/
  	getNextRunDate(cronSyntax,options) {
		//https://github.com/harrisiirak/cron-parser
		var interval = cronParser.parseExpression(cronSyntax, options);
		return interval.next();
	},
	/**
	* Check if Cron synatx is valid
	*
	* @param {String} cron syntax
	* @return {Boolean}
	* @api public
	*/
	isCronSyntaxValid(cron){
		try{
		    var isValid = cronParser.parseString(cron);
		    if (_.isEmpty(isValid.errors)){
		        return true;
		    }
		    return false;
		}
		catch(ex){
		    return false;
		}
	},
	/**
	* Convert any timezone date to UTC date.
	*
	* @return {Date}
	* @api public
	*/
	toUTC(date) {
	    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
	}
}

/**
 * Pre-save hook
 */
TaskSchema
  .pre('save', function(next) {
  	if(this.isRecurring){
  		if(this.isCronSyntaxValid(this.cron)){
			this.startAt = this.startAt && this.startAt > new Date() ? this.startAt : new Date();
			var parseCron = later.parse.cron(this.cron);
      		var nextRunDate = later.schedule(parseCron).next();
      		console.log('New run date: ' + nextRunDate);
			this.runAt = nextRunDate;
  		}
  	// 	else {
  	// 		return next(new Error('Invalid cron syntax.'));
  	// 	}
  	}
  	// else {
  	// 	this.runAt = this.startAt;
  	// }


  	//save all date as timestamp.
  	return next();
  });
export default mongoose.model('Task', TaskSchema);
