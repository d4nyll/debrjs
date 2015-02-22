Template.ask.helpers({
	foo: function () {
		return '';
	}
});

Template.ask.events({
	'click button': function () {
		Meteor.call('askQuestion', document.getElementById('questionText').value, function (error, result) {
			Router.go('/qa/' + result);
		});
	}
});