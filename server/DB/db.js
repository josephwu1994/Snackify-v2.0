const { Client } = require('pg');
const oldUri = 'postgres://ulurpczi:TVQxxaVGcvh2ZFlNZHXaHReKN_3DfZbm@nutty-custard-apple.db.elephantsql.com:5432/ulurpczi';
const newUri = 'postgres://dwxfnmyo:JDQvwAvOEGgu2swyCNYFId_Jr0sGWSGz@baasu.db.elephantsql.com:5432/dwxfnmyo';

const db = new Client({
	connectionString: newUri,
})
db.connect();

module.exports = db;