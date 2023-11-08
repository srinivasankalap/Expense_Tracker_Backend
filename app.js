const express = require('express');
const cors = require('cors');
const path = require("path");
const bodyParser=require('body-parser');


const app = express();
const sequelize = require('./Models/expense');

app.use(cors());
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));
// app.get('/', (req, res) => {
// 	res.sendFile(path.join(__dirname, 'views', 'index'));
//   });
const Router = require('./Routes/routes');
app.use('/', Router);
sequelize.sync()
	.then(res => {
		console.log(res);
		app.listen(4000);
	})
	.catch(err => console.log(err));

