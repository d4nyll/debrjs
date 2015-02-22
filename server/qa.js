Meteor.methods({
	likesCount: function (qid) {

	},
	askQuestion: function (question) {
		if(this.userId !== null) {
			return Questions.insert({
				_id: getNextSequence("qid"),
				user: this.userId,
				current: true,
				rev: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
				question: question,
				likes: []
			}, function (err, id) {
			});
		}
	},
	writeAnswer: function (answer, qid) {
		if(Questions.find({_id: qid}).count() === 1 && this.userId !== null) {
			return Answers.insert({
				_id: qid,
				user: this.userId,
				current: true,
				rev: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
				answer: answer,
				likes: []
			}, function (err, id) {
			});
		}
	},
	editQuestion: function (qid, newQuestion) {

	},
	editAnswer: function (aid, newAnswer) {
		
	},
	toggleBookmarkQuestion: function (qid) {

	},
	toggleBookmarkAnswer: function (aid) {

	},
	toggleLikeQuestion: function (qid) {

	},
	toggleLikeAnswer: function (aid) {

	}
});