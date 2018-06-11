let model = require("../model/fruit.js");

 function getFruits(options){
	return model.find(...options,function(err,doc){
		if(err)throw err;
	})
}

module.exports = getFruits;