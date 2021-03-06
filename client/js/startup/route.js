Router.configure({
  layoutTemplate: 'app',
  notFoundTemplate: '404'
});

Router.route('/', function () {
	this.render('questionlist');
	this.render('aside', {to: 'aside'});
});

Router.route('/ask', function () {
	this.render('ask');
	this.render('related', {to: 'aside'});
});

Router.route('/error/:_id', function () {
	this.render('error', {
  		data: function() {
  			return Errors.findOne({_id: parseInt(this.params._id, 10)});
  		}
	});
});

Router.route('/qa/', function () {
	Router.go('/error/1/');
});

Router.route('/qa/:_qid', function () {
	this.render('qa', {
		data: function () {
			return {qid: this.params._qid};
		}
	});
	this.render('related', {to: 'aside'});
	Session.set('editMode', false);
});

Router.route('/qa/:_qid/edit/', function () {
	this.render('qa', {
		data: function () {
			return {qid: this.params._qid};
		}
	});
	this.render('related', {to: 'aside'});
	Session.set('editMode', true);
});

Router.route('/user/', function () {
	this.render('user');
});