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

Accounts.onCreateUser(function (options, user) {
	if (options.profile) {
		user.profile = options.profile;
	}
	Roles.setRolesOnUserObj(user, ['user'], Roles.GLOBAL_GROUP);
	// user.roles = {__global_roles__: []};
	return user;
});