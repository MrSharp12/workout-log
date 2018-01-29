var router = require('express').Router();
var sequelize = require('../db.js');
var User = sequelize.import('../models/user');

//need to create a user object and use sequelize to put that user
//into our database
router.post('/', function(req, res) {
    var username = req.body.user.username;
    var pass = req.body.user.password;

    User.create ({//this creates the User object, persisted throught the .create method
        username: username,
        passwordhash: ''
    }).then (
        //Sequelize is going to return the object it created from the db
        function createSuccess(user) {
            //successful get this:
            res.json({
                user: user,
                message: 'created'
            });
        },
        function createError(err) {
            res.send(500, err.message);
        }
    );
});
//POST request will be coming in from the client
//would be a new user signing up with a username and password
module.exports = router;