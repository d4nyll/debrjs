Accounts.ui.config({
	passwordSignupFields: 'USERNAME_AND_EMAIL'
});

Accounts.onEmailVerificationLink(function (token, done) {
	Accounts.verifyEmail(token, function (err) {
		if (typeof err === 'undefined') {
			alert('email verified successfully!');
		};
	});
});