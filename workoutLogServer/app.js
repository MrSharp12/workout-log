require('dotenv').config();

let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let sequelize = require('./db');

let User = sequelize.import('./models/user.js');
let Definition = sequelize.import('./models/definition');
let Log = sequelize.import('./models/log');

//creates a table in postgres, matches the defined model
//doesn't drop db
// sequelize.sync();
// Definition.sync();

//DANGER: DROPS THE TABLE
// User.sync({ force: true });

//tells app to use bodyParser
//parse data off incoming requests, turn it into JSON
app.use(bodyParser.json());

app.use(require('./middleware/headers'));
app.use(require('./middleware/validate-session'));//creating a user

app.use('/api/user', require('./routes/user'));
app.use('/api/login', require('./routes/session'));//login route
app.use('/api/definition', require('./routes/definition'));
app.use('/api/log', require('./routes/log'));

app.listen(3000, function(){
	console.log('App is listening on 3000.')
});

