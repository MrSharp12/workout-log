var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sequelize = require('./db');

var User = sequelize.import('./models/user.js');

//creates a table in postgres, matches the defined model
//doesn't drop db
User.sync();

//DANGER: DROPS THE TABLE
//User.sync({ force: true });

//tells app to use bodyParser
//parse data off incoming requests, turn it into JSON
app.use(bodyParser.json());
app.use(require('./middleware/headers'));
app.use('/api/user', require('./routes/user'));
app.use('/api/test', function(req, res){
	res.send("Hello World");
});

app.listen(3000, function(){
	console.log('App is listening on 3000.')
});

