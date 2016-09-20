'use strict';

import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var LogSchema = new mongoose.Schema({
	content: String,
	type: {type: String, enum: ['error', 'info']},
	screenshotPath: String,
	createdAt: {type: Date, default: Date.now },
	task : {type:Schema.Types.ObjectId, ref: 'Task', required:true}
});

export default mongoose.model('Log', LogSchema);
