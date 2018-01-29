var express = require('express');
var app = express();
var bodyParser = require('body-parser');//helps the server parse out incoming requests
var sequelize = require('./db.js');
var User = sequelize.import('./models/user');

//creates a table in postgres, matches the defined model
//doesn't drop db
User.sync();

//DANGER: DROPS THE TABLE
//User.sync({ force: true });

//tells app to use bodyParser
//parse data off incoming requests, turn it into JSON
app.use(bodyParser.json());

app.use(require('./middleware/headers'));//places middleware header to prevent CORS

app.use('/api/test', function(req, res){
	res.send("Hello World");
});

app.listen(3000, function(){
    console.log("app is listening on 3000");
    });

//need to create a user object and use sequelize to put that user
//into our database
app.post('/api/user', function(req, res) {
    var username = req.body.user.username;
    var pass = req.body.user.password;

    User.create ({//this creates the User object, persisted throught the .create method
        username: username,
        passwordhash: ""
    }).then (
        //Sequelize is going to return the object it created from the db
        function createSuccess(user) {
            //successful get this:
            res.json({
                user: user,
                message: 'create'
            });
        },
        function createError(err) {
            res.send(500, err.message);
        }
    );
});
//POST request will be coming in from the client
//would be a new user signing up with a username and password
