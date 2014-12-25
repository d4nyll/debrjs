Router.configure({
  layoutTemplate: 'app',
  notFoundTemplate: '404'
});

Router.route('/', function () {
	this.render('questionlist');
	this.render('aside', {to: 'aside'});
});

Router.route('qa', function () {
	this.render('qa');
	this.render('related', {to: 'aside'});
});