Template.user.created = function () {
	var self = this;
	self.createdAt = new ReactiveVar('...loading...');
		Meteor.call('userCreatedAt', function (err, data) {
		if(typeof err === 'undefined') {
			self.createdAt.set(data);
		} else {
			self.createdAt.set('Unable to retrieve.');
		}
	});
};

Template.user.helpers({
	email: function () {
		return Meteor.user().emails[0].address;
	},
	verified: function () {
		return Meteor.user().emails[0].verified;
	},
	createdAt: function () {
		return Template.instance().createdAt.get();
	}
});

Template.user.events({
	'click .verifyEmail': function () {
		Meteor.call('verifyUserEmail', function () {
			if(typeof err === 'undefined') {
				console.log('Something went wrong');
			} else {
				console.log('An email has been sent. Please click on the link to verify your email.');
			}
		});
	}
});