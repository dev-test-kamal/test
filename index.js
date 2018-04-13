var mysql = require('mysql');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require("path");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var con = mysql.createConnection({
	host: "sql12.freemysqlhosting.net",
	user: "sql12231955",
	password: "z95Z144bLa",
	database: "sql12231955",
	port:3306
});
var port = process.env.PORT || 1337;
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://192.168.1.31:1000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.post('/homePage', function(req, res) {
	con.query("SELECT * from product ORDER BY productId LIMIT 1", function(err, homeResult){
		if (err) throw err;
		res.end(JSON.stringify(homeResult));
	});
});


app.listen(port);

console.log("Server running at http://localhost:%d", port);