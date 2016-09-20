'use strict';

import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var GroupSchema = new mongoose.Schema({
	name: String,
	info: String,
	active: Boolean,
	createdAt: {type: Date, default: Date.now },
	user : {type:Schema.Types.ObjectId, ref: 'User', required:true}
});

export default mongoose.model('Group', GroupSchema);
