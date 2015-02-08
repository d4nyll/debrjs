var editor;

var qid = function() {
	var regExp = /^.+\/qa\/(.+?)\/.*$/;
	return regExp.exec(window.location.href)[1];
}

var answertext = function() {
	var answer = Answers.findOne({question: parseInt(qid(), 10)});
	if(answer) {
		var markdown = '';
		var lines = answer.text;
		for (var i = 0; i < lines.length; i++) {
			markdown += lines[i] + "\n\n";
		};
		if(editor) {
			editor.importFile('edittext', markdown);
		}
		return markdown;
	} else {
		if(editor) {
			editor.importFile('edittext', 'No answers here yet. You can help others by adding one. Just hit that green pencil icon on the top right!');
		}
		return 'No answers here yet. You can help others by adding one. Just hit that green pencil icon on the top right!';
	}
}

Template.qa.helpers({
	qid: function() {
		return qid();
	},
	questiontext: function() {
		var questionObj = Questions.findOne({_id: parseInt(qid(), 10)});
		if(questionObj) {
			return questionObj.text;
		}
	},
	answeredit: function () {
		return Session.get('editMode') ? 'edit' : 'answer';
	}
});

Template.answer.helpers({
	answertext: function() {
		return answertext();
	}
});

Template.edit.helpers({
	answertext: function() {
		return answertext();
	}
});

Template.edit.rendered = function () {
	var opts = {
		  basePath: '/'
		, textarea: 'epictext'
		, theme: { base: 'epic/themes/base/epiceditor.css'
	    , preview: 'epic/themes/preview/github.css'
	    , editor: 'epic/themes/editor/epic-dark.css'
	      }
	    , focusOnLoad: true
	    , autogrow: true
	};
	editor = new EpicEditor(opts).load();
};

Template.registerHelper('username', function () {
	console.log(Meteor.user());
});

Accounts.ui.config({
	passwordSignupFields: 'USERNAME_AND_EMAIL'
});