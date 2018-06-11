let User = require('../model/User.js');

function getUser(options){
	return User.find(...options,(err,doc)=>{
		if(err)throw err;
	})
}

module.exports = getUser;