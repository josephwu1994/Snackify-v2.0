const express = require('express');
const authRoutes = require('./routes/auth-routes');
const path = require('path');
const passport = require('passport');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const db = require('./server/DB/db');
const snackController = require('./server/Controllers/snackController');

const app = express();

app.use('/build', express.static(path.join(__dirname, 'build')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieSession({
	maxAge: 24 * 60 * 60 * 1000,
	keys: [keys.session.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());


app.use('/auth', authRoutes);

//////home/////

app.get('/', (req, res) => {
	if (req.user) res.sendFile(path.join(__dirname, 'index.html'));
	else res.redirect('/auth/login');
});

app.post('/submission', snackController.submitSnack);
//=================================================================

app.get('/test', snackController.grabSnack);


app.listen(3000, () => {
	console.log('listening on port 3000...');
});




