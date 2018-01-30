let router = require('express').Router();
let sequelize = require('../db.js');
let User = sequelize.import('../models/user');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');

//need to create a user object and use sequelize to put that user
//into our database
router.post('/', function(req, res) {
    let username = req.body.user.username;
    let pass = req.body.user.password;

    User.create ({//this creates the User object, persisted throught the .create method
        username: username,
        passwordhash: bcrypt.hashSync(pass, 10)
    }).then (
        //Sequelize is going to return the object it created from the db
        function createSuccess(user) {
            //successful get this:
            let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});
            res.json({
                user: user,
                message: 'created',
                sessionToken: token
            });
        },
        function createError(err) {
            // res.status(500).send(err.message)
            res.send(500, err.message);
        }
    );
});
//POST request will be coming in from the client
//would be a new user signing up with a username and password
module.exports = router;