module.exports = function(req, res, next){
	res.header('access-control-allow-origin', '*');
next();//this is an express function call, read more on using middleware express.js
};


