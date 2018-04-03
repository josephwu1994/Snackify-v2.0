const db = require('./../DB/db');

const snackController = {};

snackController.submitSnack = (req, res) => {
	db.query(`SELECT submissioncount from u where username = '${req.body.userName}';`, (err, count) => {
		console.log(JSON.stringify(count)+"<==== this is count");
		if (count.rows[0].submissioncount === 0) {
			res.send('You Eat Too Much');
		} else {
			db.query(`UPDATE u SET submissioncount = submissioncount -1 WHERE username = '${req.body.userName}';
				  INSERT INTO post (snacklink, description, username, votes) VALUES ('${req.body.snackLink}', '${req.body.comments}', '${req.body.userName}', 0);`,
				(err, result) => {
					if (err) throw new Error(err);
					res.send('successfully posted');
				});
		}
	});
}


snackController.grabSnack = (req, res, next) => {
	db.query(`SELECT username FROM post;
						SELECT snacklink FROM post;
						SELECT votes FROM post;
						SELECT description FROM post;
						SELECT id FROM post`, (err, result) => {
			let resultArr = [];
			const rows = result.map((col) => {
				return col.rows;
			})
			for (let i = 0; i < rows[0].length; i++) {
				const userObj = {};
				userObj.userName = rows[0][i].username;
				userObj.snackPhoto = rows[1][i].snacklink;
				userObj.votes = rows[2][i].votes;
				userObj.description = rows[3][i].description;
				userObj.id = rows[4][i].id;
				resultArr.push(userObj);
			}
			resultArr.forEach((post, i) => {
				db.query(`SELECT createdby, content FROM comments where postid = '${post.id}';`, (err , body) => {
					if(body.rows[0] !== undefined){
						post.comments = body.rows;
					}
					if( i === resultArr.length-1){
						res.locals.result = resultArr;
						next();
					}
				});
			})
		});
}

snackController.grabComments = (req, res) => {
	db.query(`SELECT `)
}

module.exports = snackController;