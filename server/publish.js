Meteor.publish("getQuestion", function (qid) {
	check(qid, String);
	return Questions.find({_id: qid}, {limit: 1});
});

Meteor.publish("getAnswer", function (qid, rev) {
	check(qid, String);
	if(rev === undefined) {
		return Answers.find({qid: qid, current: true}, {limit: 1});
	} else if(Match.test(rev, Number)) {
		return Answers.find({qid: qid, rev: rev}, {limit: 1});
	}
});