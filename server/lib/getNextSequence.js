getNextSequence = function (name) {
	var MongoClientConnect = Meteor.wrapAsync(MongoInternals.NpmModule.MongoClient.connect);
	var db = MongoClientConnect('mongodb://127.0.0.1:27017/meteor').collection('counters');
	var syncFindAndModify = Meteor.wrapAsync(db.findAndModify, db);
	var sequenceObj = syncFindAndModify(
		{ _id: name },
		[['_id','asc']],
		{ $inc: { seq: 1 } },
		{new: true}
	);
	return sequenceObj.seq.toString();
};