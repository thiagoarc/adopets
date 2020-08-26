const mysql = require('mysql');
var mysqlConnection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'adopets',
	multipleStatements: true
});
mysqlConnection.connect((err) => {
	if(!err){
		console.log("Mysql Connected");
	}else{
		console.log('Mysql Connection Failed');
	}
});

module.exports = mysqlConnection;