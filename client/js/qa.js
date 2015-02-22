Template.qa.created = function () {
	Meteor.subscribe('getQuestion', this.data.qid);
};

Template.answer.created = function () {
	Meteor.subscribe('getAnswer', this.data.qid);
};

Template.edit.created = function () {
	Meteor.subscribe('getAnswer', this.data.qid);
};

Template.edit.rendered = function () {
	this.autorun(function () {
		Epic.update(getAnswerText(this._templateInstance.data.qid));
	})
}

Template.qa.helpers({
	question: function () {
		if(Questions.findOne({_id: this.qid})) {
			return Questions.findOne({_id: this.qid}).question;
		}
	},
	answerEdit: function () {
		return Session.get('editMode') ? 'edit' : 'answer';
	}
});

Template.answer.helpers({
	answerText : function () {
		return getAnswerText(this.qid);
	}
});

Template.edit.helpers({
	answerText : function () {
		return getAnswerText(this.qid);
	}
});

Template.edit.events({
	'click .editButton': function () {
		// Create a new answer
		Meteor.call('editAnswer', Epic.getInstances()[0].editor.innerText);
	}
});

var getAnswerText = function (qid) {
	var answer = Answers.findOne({qid: qid, current: true});
	if(answer) {
		var markdown = '';
		var lines = answer.answer;
		for (var i = 0; i < lines.length; i++) {
			markdown += lines[i] + "\n\n";
		};
		return markdown;
	} else {
		return 'No answers here yet. You can help others by adding one. Just hit that green pencil icon on the top right!';
	}
}