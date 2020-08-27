const mysql = require('mysql');
var mysqlConnection = mysql.createConnection({
	host: 'tarc.us',
	user: 'tarc_adopets',
	password: 'adopets@teste',
	database: 'tarc_adopets',
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