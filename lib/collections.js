SimpleSchema.debug = true;

Versions = new Mongo.Collection("versions");
Counters = new Mongo.Collection("counters");
Questions = new Mongo.Collection("questions");
Answers = new Mongo.Collection("answers");
Mail = new Mongo.Collection("mail");
Channels = new Mongo.Collection("channels");
Messages = new Mongo.Collection("messages");
Errors = new Mongo.Collection('errors');

var Schemas = {};

Schemas.Versions = new SimpleSchema({
	major: {
		type: Number
	},
	minor: {
		type: Number
	},
	patch: {
		type: Number
	}
});

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
	_id: {
		type: String
	},
	question: {
		type: String
	}
}]);

Schemas.Answers = new SimpleSchema([Schemas.Versionable, Schemas.Likeable, {
	_id: {
		type: String
	},
	answer: {
		type: [String] // Each line is stored in a separate string
	},
	qid: {
		type: String
	},
	versionStartRange: {
		type: String
	},
	versionEndRange: {
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

Schemas.Mail = new SimpleSchema({
    sender: {
        type: String
    },
    recipient: {
        type: String
    },
    body: {
        type: String
    },
    time: {
    	type: Date
    }
});

Schemas.Channels = new SimpleSchema({
    name: {
        type: String
    }
});

Schemas.Messages = new SimpleSchema({
    user: {
        type: String
    },
    channel: {
        type: String
    },
    body: {
        type: String
    },
    time: {
    	type: Date
    }
});

Meteor.users.attachSchema(Schemas.User);
Versions.attachSchema(Schemas.Versions);
Questions.attachSchema(Schemas.Questions);
Answers.attachSchema(Schemas.Answers);
Mail.attachSchema(Schemas.Mail);
Channels.attachSchema(Schemas.Channels);
Messages.attachSchema(Schemas.Messages);