let User = require('../model/User');


function updateUserCart(options){

	return User.update(...options,(err,doc)=>{

		if(err) throw err;

	})

}

module.exports = updateUserCart;