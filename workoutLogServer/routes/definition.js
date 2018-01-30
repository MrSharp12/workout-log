import { read } from 'fs';

let router = require('express').Router();
let sequelize = require('../db');
let User = sequelize.import('../models/user');
let Definition = sequelize.import('../models/definition');

router.post('/', function(req, res) {
    //variables
    let description = req.body.definition.desc;
    let logType = req.body.definition.type;
    let owner = req.user.id;

        //methods
        Definition
            .create({
                description: description,
                logType: logType,
                owner: owner
            })

            .then(
                //createSuccess function

                //createError function
                function createSuccess(definition) {
                    //send a response as json
                    res.json({
                        definition: definition
                    });
                },
                function createError(err) {
                    res.send(500, err.message);
                }
            );
});

router.get('/', function(req, res) {
    //user variable
    let userid = req.user.id;

Definition
//findAll by owner method
.findAll({
    where: { owner: userid }
})
    .then(
        //success
        function findAllSuccess(data) {
            //console.log(data);
            res.json(data);
        },
        //failure
        function findAllError(err) {
            res.send(500, err.message);
        }
    );
});

module.expots = router;