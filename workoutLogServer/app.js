var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(require('./middleware/headers'));

app.listen(3000, function(){
    console.log("app is listening on 3000");
    });

app.use('/api/test', function(req, res){
	res.send("Hello World");
});



    