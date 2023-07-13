var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var taskRouter = require('./routes/Reservation');
var ProgrammeRoute = require('./routes/ProgrammeEtude');
const moduleRoutes = require('./routes/Module');
const matiereRoutes = require('./routes/Matiere');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/module', moduleRoutes);
app.use('/matiere', matiereRoutes);
app.use('/reservation', taskRouter);
app.use('/programme', ProgrammeRoute);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});



app.use(function (req, res, next) {
	res.locals.connection = mysql.createConnection({
	
		user: 'root',
		password: '',
		database: 'esprit'
	});
	res.locals.connect();
	next();
});

module.exports = app;
