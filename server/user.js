// Retrieves when the current user's account was created
Meteor.methods({
	verifyUserEmail: function () {
		Accounts.sendVerificationEmail(this.userId);
	},
	userCreatedAt: function () {
		if(Meteor.user() !== null && typeof Meteor.user() != 'undefined') {
			return Meteor.user().createdAt;
		}
	}
});