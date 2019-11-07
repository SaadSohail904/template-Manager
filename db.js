var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    port: "3308",
    password : "",
    database : 'templatemanager'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;
