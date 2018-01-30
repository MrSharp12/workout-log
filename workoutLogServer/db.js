let Sequelize = require('sequelize');
let sequelize = new Sequelize('workoutlog', 'postgres', 'Rorylovespygar1', {
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
// let User = sequelize.import('./models/user');
// let Definition = sequelize.import('./models/definition');

module.exports = sequelize;