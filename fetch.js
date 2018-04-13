var mysql = require('mysql');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require("path");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "123@Kamal@123",
		database: "gardencenter"
	});
	
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://192.168.1.18:4040');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.post('/homePage', function(req, res) {
	con.query("SELECT Name, Price, Image from product_table GROUP BY Name ORDER BY Price", function(err, homeResult){
		if (err) throw err;
		res.end(JSON.stringify(homeResult));
	});
});

app.post('/categoryPage', function(req, res) {
	var categoryName = req.body.category;
	con.query("SELECT * FROM category_table WHERE CategoryName='"+categoryName+"'", function(err, catResult){
		if (err) throw err;
		var catId = JSON.parse(JSON.stringify(catResult))[0].CategoryId;
			con.query("SELECT Name, Price, Image from product_table WHERE Category="+catId+" GROUP BY Name", function(err, catProdResult){
			if (err) throw err;
			var listRes = {
				title:JSON.parse(JSON.stringify(catResult))[0].CategoryTitle,
				description:JSON.parse(JSON.stringify(catResult))[0].CategoryDesc,
				header:JSON.parse(JSON.stringify(catResult))[0].ListHeader,
				productResult:JSON.parse(JSON.stringify(catProdResult))
			};
			res.end(JSON.stringify(listRes));
		});
	});
	
});

app.post('/descPage', function(req, res) {
	var productName = req.body.product;
	con.query("SELECT * from product_table WHERE Name='"+productName+"'", function(err, prodResult){
		if (err) throw err;
		res.end(JSON.stringify(prodResult));
	});
});

app.post('/crossSell', function(req, res) {
	con.query("SELECT Name, Price, Image from product_table GROUP BY Name ORDER BY Price LIMIT 6", function(err, crossResult){
		if (err) throw err;
		res.end(JSON.stringify(crossResult));
	});
	
});

app.listen(4041, function(err) {
	if (err) throw err; 
  console.log('Server running at http://192.168.1.18:4041/');
});