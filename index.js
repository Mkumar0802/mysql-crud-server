var express = require('express')
var app = express()
var mysql = require('mysql')
const bodyParser = require('body-parser');
var logger = require('morgan');
const cors = require('cors');


app.use(cors());
app.use(express.json());

const port =  process.env.PORT || 3001;

app.use(bodyParser.json())
app.use(logger('dev'));


//Create Database Connection
var conn = mysql.createConnection({
    host:"bmrrzuuas1qtarn74jhh-mysql.services.clever-cloud.com",
    user:"umtotl5ua1udagu7",
	
    password:"6riZu47KftIKYLsaoD6V",
    database: "bmrrzuuas1qtarn74jhh"
});






// connect to database
conn.connect((err) => {
	if (err) throw err;
	console.log("MySQL connected");
});

// creat a new Record
app.post("/create", (req, res) => {
	let data = { name: req.body.name, age: req.body.age, country: req.body.country, email: req.body.email, mobile: req.body.mobile };
	let sql = "INSERT INTO employee SET ?";
	let query = conn.query(sql, data, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "New Record is Added successfully" }));
	});
});

// show all records
app.get("/employee", (req, res) => {
	let sql = "SELECT * FROM employee";
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: result }));
	});
});

// show a single record
app.get("/employee/:id", (req, res) => {
	let sql = "SELECT * FROM employee WHERE id=" + req.params.id;
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: result }));
	});
});

// delete the record
app.delete("/delete/:id", (req, res) => {
	let sql = "DELETE FROM employee WHERE id=" + req.params.id + "";
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "Record deleted successfully" }));
	});
});

// update the Record
app.put("/update/", (req, res) => {
	let sql = "UPDATE employee SET name='" + req.body.name + "',age='" + req.body.age + "',country='" + req.body.country + "',email='" + req.body.email + "', mobile='" + req.body.mobile + "' WHERE id=" + req.body.id;
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "Record updated SuccessFully" }));
	});
});

app.listen(port, () => console.log(`Listening on port ${port}..`));



