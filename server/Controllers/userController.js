const db = require('./../DB/db');

const userController = {};

userController.createUser = (profile, done) => {
	db.query(`SELECT username from u where username = '${profile.username}';`, (err, result) => {
		if (err) throw err;
		if (!result.rows[0]) {
			db.query(`INSERT into u (username, avatar, votecount, submissioncount) 
			VALUES ('${profile.username}', '${profile.photos[0].value}',${3}, ${1});`, (err, user) => {
					if (err) console.log('Im the error from insert ' + err);
					db.query(`SELECT * from u where username = '${profile.username}';`, (err, user) => {
						done(null, user.rows[0].userName);
					});
				});
		} else {
			db.query(`SELECT * from u where username = '${profile.username}';`, (err, user) => {
				done(null, JSON.stringify(user.rows[0]));
			});
		}
	});
}

module.exports = userController;