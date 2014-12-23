Router.configure({
  layoutTemplate: 'app',
  notFoundTemplate: '404'
});

Router.route('/', function () {
	this.render('questionlist');
	this.render('aside', {to: 'aside'});
});

Router.route('*', function () {
	this.render('404');
});