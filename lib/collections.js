SimpleSchema.debug = true;

Questions = new Mongo.Collection("questions");
Answers = new Mongo.Collection("answers");
Errors = new Mongo.Collection('errors');

var Schemas = {};

Schemas.Versionable = new SimpleSchema({
	user: {
		type: String,
		label: "User"
	},
	current: {
		type: Boolean,
		label: "Latest revision"
	},
	rev: {
		type: Number,
		label: "Version No."
	},
	createdAt: {
		type: Date,
		label: "Created at"
	},
	updatedAt: {
		type: Date,
		label: "Last Updated"
	}
});
Schemas.Likeable = new SimpleSchema({
	likes: {
		type: [String]
	}
});

Schemas.Questions = new SimpleSchema([Schemas.Versionable, Schemas.Likeable, {
	qid: {
		type: Number,
		label: "Question ID"
	},
	question: {
		type: String
	}
}]);

Schemas.Answers = new SimpleSchema([Schemas.Versionable, Schemas.Likeable, {
	aid: {
		type: Number,
		label: "Answer ID"
	},
	answer: {
		type: String
	}
}]);

Schemas.UserProfile = new SimpleSchema({
    firstName: {
        type: String,
        regEx: /^[a-zA-Z-]{3,25}$/,
        optional: true
    },
    lastName: {
        type: String,
        regEx: /^[a-zA-Z]{3,25}$/,
        optional: true
    },
    bio: {
        type: String,
        optional: true
    }
});

Schemas.User = new SimpleSchema({
    username: {
        type: String,
        regEx: /^[a-z0-9A-Z_]{3,15}$/
    },
    emails: {
        type: [Object],
        // this must be optional if you also use other login services like facebook,
        // but if you use only accounts-password, then it can be required
        optional: true
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    createdAt: {
        type: Date,
        denyUpdate: true
    },
    profile: {
        type: Schemas.UserProfile,
        optional: true
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    bookmarks: {
    	type: Object
    },
    "bookmarks.questions": {
    	type: [String]
    },
    "bookmarks.answers": {
    	type: [String]
    },
    // Add `roles` to your schema if you use the meteor-roles package.
    // Note that when using this package, you must also specify the
    // `Roles.GLOBAL_GROUP` group whenever you add a user to a role.
    // Roles.addUsersToRoles(userId, ["admin"], Roles.GLOBAL_GROUP);
    // You can't mix and match adding with and without a group since
    // you will fail validation in some cases.
    roles: {
        type: Object,
        blackbox: true
    }
});

Meteor.users.attachSchema(Schemas.User);
Questions.attachSchema(Schemas.Questions);
Answers.attachSchema(Schemas.Answers);