// To be able to use .env
require('dotenv').config();
// Initialization of Frameworks
const express = require('express');
const app = express();
const path = require('path');

// Session framework
const session = require('express-session');

// Middleware
app.use(express.json()); // Setup server to accept JSON
app.use(express.urlencoded({ extended: false })); // Setup server to accept form data

// Session Middleware
app.use(session({
    secret: 'secret',
    // cookie: {maxAge: 30000},
    saveUninitialized: false,
    resave: false
}))

app.get('*', function (req, res, next) {
    res.locals.user = req.session.user || null,
    // console.log(res.locals.user)
    // console.log(req.user)
    next();
});

// Routes
const indexRouter = require('./routes/index');
// const listsRouter = require('./routes/lists');

// Use route
app.use('/', indexRouter);
// app.use('/lists', listsRouter);
app.use(express.static(path.join((__dirname, 'public')))); // To expose public folder

// Setup View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Page Not Found');
	err.status = 404;

	// Pass error to the next matching route.
	next(err);
});

// Error Handler
app.use(function (err, req, res, next) {
	res.status(err.status || 500);

	res.render('error', {
		unhandled: err.message,
		error: err
	});
});

// Listen to Server
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on http://localhost:${process.env.PORT || 3000}`);
});