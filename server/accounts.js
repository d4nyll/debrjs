// General settings for Accounts
Accounts.config({
	sendVerificationEmail: true,
	restrictCreationByEmailDomain: function (email) {
		// Check that the email is not from those temporary email like guerillamail
		return true;
	},
	loginExpirationInDays: 30
});

// Controls whether the new user can be created
Accounts.validateNewUser(function (user) {
	// The accounts-password package already checks for duplicate usernames and emails
	console.log(user);
	// Check whether email address is valid user.emails[0].address
	return true;
});

// Validate the login
Accounts.validateLoginAttempt(function (attempt) {
	console.log(attempt);
	console.log(attempt.user.emails[0].verified);
	if(!attempt.user.emails[0].verified) {
		return false;
	} else {
		return true;
	}
});