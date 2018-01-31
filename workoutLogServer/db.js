var Sequelize = require('sequelize');
var sequelize = new Sequelize('workoutlog', 'postgres', 'Rorylovespygar1', {
	host: 'localhost',
	dialect: 'postgres'
});


sequelize.authenticate().then(
	function() {
		console.log('connected to workoutlog postgres db');
	},
	function(err){
		console.log(err);
	}
);

//imports user 'Object factory' into db
var User = sequelize.import('./models/user');
var Log = sequelize.import('./models/log');
var Definition = sequelize.import('./models/definition');

module.exports = sequelize;