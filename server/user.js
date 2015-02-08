// Retrieves when the current user's account was created
Meteor.methods({
	verifyUserEmail: function () {
		Accounts.sendVerificationEmail(this.userId);
	},
	userCreatedAt: function () {
		console.log(Meteor.user());
		return Meteor.user().createdAt;
	}
});